"use client";

import { useState, type FormEvent } from "react";

export const EMAIL = "abrarmahamud0@gmail.com";
export const WHATSAPP_URL = "https://wa.me/8801881067616";
export const WHATSAPP_DISPLAY = "+880 1881-067616";

export function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

export function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

export default function TalkSection() {
  const [copied, setCopied] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const v = (name: string) => String(data.get(name) || "").trim();
    const lines = [`Name: ${v("name")}`, `Email: ${v("email")}`];
    if (v("subject")) lines.push(`Subject: ${v("subject")}`);
    lines.push("", v("message"));
    const url = `${WHATSAPP_URL}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank");
  }

  function copyEmail() {
    const done = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(EMAIL).then(done).catch(done);
    } else {
      done();
    }
  }

  return (
    <section id="contact">
      <div className="wrap">
        <div className="social-cards">
          <a
            className="social-card"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener"
          >
            <span className="ic ic-green">
              <WhatsAppIcon />
            </span>
            <span className="lbl">WhatsApp</span>
            <span className="sub">{WHATSAPP_DISPLAY}</span>
          </a>
          <a className="social-card" href={`mailto:${EMAIL}`}>
            <span className="ic ic-amber">
              <EmailIcon />
            </span>
            <span className="lbl">Email</span>
            <span className="sub">{EMAIL}</span>
          </a>
        </div>

        <div className="talk">
          <span className="talk-badge">LET&apos;S TALK</span>
          <h2>
            Have a project in mind?
            <br />
            Let&apos;s connect!
          </h2>
          <p className="talk-sub">
            Send a quick message and I will get back to you within 24 hours.
          </p>
          <div className="talk-rows">
            <div className="talk-row">
              <span className="ic ic-amber">
                <EmailIcon />
              </span>
              <span style={{ minWidth: 0 }}>
                <small>Email Direct</small>
                <span className="val">{EMAIL}</span>
              </span>
              <button
                className={copied ? "copy-btn copied" : "copy-btn"}
                type="button"
                onClick={copyEmail}
              >
                {copied ? "Copied ✓" : "Copy"}
              </button>
            </div>
            <a
              className="talk-row"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener"
            >
              <span className="ic ic-green">
                <PhoneIcon />
              </span>
              <span>
                <small>Phone / WhatsApp</small>
                <span className="val">{WHATSAPP_DISPLAY}</span>
              </span>
            </a>
          </div>

          <form className="talk-form" onSubmit={onSubmit}>
            <div className="field">
              <label htmlFor="fName">Your Name</label>
              <input
                id="fName"
                name="name"
                type="text"
                placeholder="Full Name"
                autoComplete="name"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="fEmail">Your Email</label>
              <input
                id="fEmail"
                name="email"
                type="email"
                placeholder="yourmail@gmail.com"
                autoComplete="email"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="fSubject">Subject</label>
              <input
                id="fSubject"
                name="subject"
                type="text"
                placeholder="What is this about?"
              />
            </div>
            <div className="field">
              <label htmlFor="fMessage">Message</label>
              <textarea
                id="fMessage"
                name="message"
                placeholder="Tell me about your project…"
                required
              />
            </div>
            <button className="send-btn" type="submit">
              <WhatsAppIcon />
              Send via WhatsApp
            </button>
            <p className="send-note">
              This opens WhatsApp with your message filled in — just press send
              there.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
