import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type MediaKind = "video" | "audio" | "photo";

export interface SiteMedia {
  id: number;
  kind: MediaKind;
  file_path: string;
  public_url: string;
  created_at: string;
}

export interface LatestMedia {
  video: SiteMedia | null;
  audio: SiteMedia | null;
  photo: SiteMedia | null;
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** True when both Supabase env vars are present. */
export const supabaseConfigured = Boolean(url && anonKey);

let cached: SupabaseClient | null = null;

/**
 * Returns a Supabase client, or null when env vars are missing.
 * The public site must never crash because env vars are not set yet —
 * he deploys in stages, so a missing config just means "no intro yet".
 */
export function getSupabase(): SupabaseClient | null {
  if (!supabaseConfigured) return null;
  if (!cached) {
    cached = createClient(url as string, anonKey as string);
  }
  return cached;
}

/** Latest uploaded media per kind (public read). Never throws. */
export async function getLatestMedia(): Promise<LatestMedia> {
  const empty: LatestMedia = { video: null, audio: null, photo: null };
  const supabase = getSupabase();
  if (!supabase) return empty;
  try {
    const kinds: MediaKind[] = ["video", "audio", "photo"];
    const result: LatestMedia = { ...empty };
    for (const kind of kinds) {
      const { data, error } = await supabase
        .from("site_media")
        .select("id, kind, file_path, public_url, created_at")
        .eq("kind", kind)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (!error && data) {
        result[kind] = data as SiteMedia;
      }
    }
    return result;
  } catch {
    return empty;
  }
}

/** All media rows of one kind, newest first. Admin use. Never throws. */
export async function getMediaByKind(kind: MediaKind): Promise<SiteMedia[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from("site_media")
      .select("id, kind, file_path, public_url, created_at")
      .eq("kind", kind)
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    return data as SiteMedia[];
  } catch {
    return [];
  }
}
