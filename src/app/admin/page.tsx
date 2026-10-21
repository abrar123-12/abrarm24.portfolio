"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import {
  getMediaByKind,
  getSupabase,
  supabaseConfigured,
  type MediaKind,
  type SiteMedia,
} from "@/lib/supabase";

interface KindConfig {
  kind: MediaKind;
  title: string;
  hint: string;
  accept: string;
  maxWarnBytes: number | null;
}

const KINDS: KindConfig[] = [
  {
    kind: "video",
    title: "Intro Video",
    hint: "MP4 or WebM. This shows in the “My Intro” section.",
    accept: "video/mp4,video/webm",
    maxWarnBytes: 50 * 1024 * 1024,
  },
  {
    kind: "audio",
    title: "Intro Voice Audio",
    hint: "MP3, M4A or WAV. Your short voice introduction.",
    accept: "audio/mpeg,audio/mp3,audio/mp4,audio/x-m4a,audio/wav,audio/x-wav",
    maxWarnBytes: null,
  },
  {
    kind: "photo",
    title: "Profile Photo",
    hint: "JPG, PNG or WebP. This replaces the photo in the hero.",
    accept: "image/jpeg,image/png,image/webp",
    maxWarnBytes: null,
  },
];

function formatTime(iso: string) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

function MediaSlot({ config }: { config: KindConfig }) {
  const [current, setCurrent] = useState<SiteMedia | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(
    null,
  );
  const [warn, setWarn] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    const rows = await getMediaByKind(config.kind);
    setCurrent(rows[0] ?? null);
  }, [config.kind]);

  useEffect(() => {
    load();
  }, [load]);

  function onPick(file: File | null) {
    setWarn("");
    if (file && config.maxWarnBytes && file.size > config.maxWarnBytes) {
      setWarn(
        `Warning: this file is ${(file.size / 1024 / 1024).toFixed(1)} MB — over 50 MB can be slow to upload and play. You can still continue.`,
      );
    }
  }

  async function onUpload() {
    const supabase = getSupabase();
    const file = fileRef.current?.files?.[0];
    if (!supabase) return;
    if (!file) {
      setMsg({ type: "err", text: "Choose a file first." });
      return;
    }
    setBusy(true);
    setMsg(null);
    try {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `${config.kind}/${Date.now()}-${safeName}`;
      const { error: upErr } = await supabase.storage
        .from("media")
        .upload(path, file, { upsert: false, contentType: file.type });
      if (upErr) throw upErr;

      const { data: pub } = supabase.storage.from("media").getPublicUrl(path);

      const previous = current;
      const { error: insErr } = await supabase.from("site_media").insert({
        kind: config.kind,
        file_path: path,
        public_url: pub.publicUrl,
      });
      if (insErr) throw insErr;

      // Best effort: remove the replaced file so storage stays clean.
      if (previous && previous.file_path !== path) {
        await supabase.storage.from("media").remove([previous.file_path]);
        await supabase.from("site_media").delete().eq("id", previous.id);
      }

      if (fileRef.current) fileRef.current.value = "";
      setWarn("");
      setMsg({ type: "ok", text: "Uploaded. The public site now shows this." });
      await load();
    } catch (e) {
      setMsg({
        type: "err",
        text: `Upload failed: ${e instanceof Error ? e.message : String(e)}`,
      });
    } finally {
      setBusy(false);
    }
  }

  async function onDelete() {
    const supabase = getSupabase();
    if (!supabase || !current) return;
    setBusy(true);
    setMsg(null);
    try {
      await supabase.storage.from("media").remove([current.file_path]);
      const { error } = await supabase
        .from("site_media")
        .delete()
        .eq("id", current.id);
      if (error) throw error;
      setMsg({ type: "ok", text: "Deleted." });
      await load();
    } catch (e) {
      setMsg({
        type: "err",
        text: `Delete failed: ${e instanceof Error ? e.message : String(e)}`,
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="admin-card">
      <h3>{config.title}</h3>
      <p>{config.hint}</p>

      {current ? (
        <div className="admin-preview">
          {config.kind === "video" && (
            <video controls preload="metadata" src={current.public_url} />
          )}
          {config.kind === "audio" && (
            <audio controls preload="metadata" src={current.public_url} />
          )}
          {config.kind === "photo" && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={current.public_url} alt="Current profile" />
          )}
          <p className="admin-meta">Uploaded: {formatTime(current.created_at)}</p>
          <button
            className="admin-btn danger"
            type="button"
            onClick={onDelete}
            disabled={busy}
          >
            Delete current {config.kind}
          </button>
        </div>
      ) : (
        <p className="admin-meta">Nothing uploaded yet.</p>
      )}

      <div className="admin-field">
        <label htmlFor={`file-${config.kind}`}>
          {current ? "Replace with a new file" : "Choose a file"}
        </label>
        <input
          id={`file-${config.kind}`}
          ref={fileRef}
          type="file"
          accept={config.accept}
          onChange={(e) => onPick(e.target.files?.[0] ?? null)}
        />
      </div>
      {warn && <p className="admin-warn">{warn}</p>}
      <button
        className="admin-btn"
        type="button"
        onClick={onUpload}
        disabled={busy}
      >
        {busy ? "Uploading…" : `Upload ${config.kind}`}
      </button>
      {msg && <p className={`admin-msg ${msg.type}`}>{msg.text}</p>}
    </div>
  );
}

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginBusy, setLoginBusy] = useState(false);
  const [loginMsg, setLoginMsg] = useState<string | null>(null);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) {
      setChecking(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    const supabase = getSupabase();
    if (!supabase) return;
    setLoginBusy(true);
    setLoginMsg(null);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (error) setLoginMsg(`Login failed: ${error.message}`);
    setLoginBusy(false);
  }

  async function onLogout() {
    const supabase = getSupabase();
    if (!supabase) return;
    await supabase.auth.signOut();
    setSession(null);
  }

  return (
    <main className="admin-wrap">
      <div className="sec-head">
        <span className="sec-tag">{"// Owner only"}</span>
        <h2 style={{ fontSize: 30, marginTop: 8 }}>Portfolio Admin</h2>
        <p style={{ color: "var(--muted)", marginTop: 8 }}>
          Upload or replace your intro video, intro voice and profile photo.
          The public site updates automatically.{" "}
          <a href="/" style={{ color: "var(--accent)" }}>
            ← View site
          </a>
        </p>
      </div>

      {!supabaseConfigured ? (
        <div className="admin-card">
          <h3>Setup not finished yet</h3>
          <p>
            Supabase keys are not set on this deployment yet
            (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY).
            Add them in Vercel → Project → Settings → Environment Variables,
            then redeploy. The public site works fine in the meantime.
          </p>
        </div>
      ) : checking ? (
        <div className="admin-card">
          <p>Checking login…</p>
        </div>
      ) : !session ? (
        <form className="admin-card" onSubmit={onLogin}>
          <h3>Owner login</h3>
          <p>Only the site owner can upload. Log in with your Supabase account.</p>
          <div className="admin-field">
            <label htmlFor="adminEmail">Email</label>
            <input
              id="adminEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
          <div className="admin-field">
            <label htmlFor="adminPass">Password</label>
            <input
              id="adminPass"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          <button className="admin-btn" type="submit" disabled={loginBusy}>
            {loginBusy ? "Logging in…" : "Log in"}
          </button>
          {loginMsg && <p className="admin-msg err">{loginMsg}</p>}
        </form>
      ) : (
        <>
          <div className="admin-card">
            <p>
              Logged in as <strong>{session.user.email}</strong>
            </p>
            <button className="admin-btn ghost" type="button" onClick={onLogout}>
              Log out
            </button>
          </div>
          {KINDS.map((config) => (
            <MediaSlot key={config.kind} config={config} />
          ))}
        </>
      )}
    </main>
  );
}
