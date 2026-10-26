import { getLatestMedia } from "@/lib/supabase";
import Rotator from "@/components/Rotator";
import TalkSection, { WhatsAppIcon } from "@/components/TalkSection";

// Always render fresh so a new intro upload shows up without a redeploy.
export const dynamic = "force-dynamic";
export const revalidate = 0;

function CodeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m16 18 6-6-6-6" />
      <path d="m8 6-6 6 6 6" />
    </svg>
  );
}

function TableIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="3" width="20" height="18" rx="2" />
      <path d="M2 9h20M2 15h20M9 3v18M15 3v18" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.6 10.6 6.8-4.2M8.6 13.4l6.8 4.2" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m3 11 18-7-4 14-6-3-3 5v-4L3 11z" />
      <path d="M11 15 21 4" />
    </svg>
  );
}

export default async function HomePage() {
  const media = await getLatestMedia();
  const photoSrc = media.photo?.public_url || "/profile.jpg";
  const hasIntro = Boolean(media.video || media.audio);

  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <a className="brand" href="#top">
            Abrar <span>Mahmud</span>
          </a>
          <nav className="nav-links">
            <a href="#offer">What I Offer</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#intro">My Intro</a>
            <a href="#work">How I Work</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="nav-cta" href="#contact">
            Hire Me
          </a>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <div className="hero">
          <div className="wrap">
            <div className="hero-grid">
              <div>
                <span className="status-pill">
                  <span className="status-dot"></span> Available for freelance
                  projects
                </span>
                <h1>
                  Hi, I&apos;m <span className="name">Abrar Mahmud</span>
                </h1>
                <p className="role-line">
                  I specialise in <Rotator />
                </p>
                <p className="lede">
                  I build and deploy{" "}
                  <strong>real, live websites and web apps</strong> — business
                  sites, online stores, and custom apps with admin dashboards,
                  logins, databases, chat and push notifications. I also help
                  businesses with data entry, social media management and
                  marketing.
                </p>
                <div className="cta-row">
                  <a
                    className="btn btn-wa"
                    href="https://wa.me/8801881067616"
                    target="_blank"
                    rel="noopener"
                  >
                    <WhatsAppIcon />
                    WhatsApp Me
                  </a>
                  <a className="btn btn-ghost" href="#portfolio">
                    View Portfolio
                  </a>
                  <a
                    className="btn btn-ghost"
                    href="mailto:abrarmahamud0@gmail.com"
                  >
                    Hire Me by Email
                  </a>
                </div>
                <div className="hero-meta">
                  <span>
                    <span className="mono">location</span> — Bangladesh · works
                    fully remote
                  </span>
                  <span>
                    <span className="mono">stack</span> — Next.js · Supabase ·
                    Vercel
                  </span>
                </div>
              </div>
              <div className="photo-col">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="photo-frame"
                  src={photoSrc}
                  alt="Abrar Mahmud"
                  width={320}
                  height={427}
                />
              </div>
            </div>
          </div>
        </div>

        {/* WHAT I OFFER */}
        <section id="offer">
          <div className="wrap">
            <div className="sec-head">
              <span className="sec-tag">{"// Services"}</span>
              <h2>What I Offer</h2>
              <p>
                Four things I can do for your business — led by web
                development, backed by real work you can check below.
              </p>
            </div>
            <div className="services">
              <div className="service featured">
                <span className="ic ic-amber">
                  <CodeIcon />
                </span>
                <h3>
                  Web Development <span className="main-badge">MAIN SERVICE</span>
                </h3>
                <p>
                  Business websites, online stores and custom web apps — built
                  with <strong>Next.js, Supabase and Vercel</strong>, deployed
                  live and handed over ready to use. Dashboards, logins,
                  databases, chat and notifications when you need them.
                </p>
              </div>
              <div className="service">
                <span className="ic ic-teal">
                  <TableIcon />
                </span>
                <h3>Data Entry</h3>
                <p>
                  Accurate data entry, web research and copy-paste work —
                  handled carefully, formatted cleanly and delivered on time.
                </p>
              </div>
              <div className="service">
                <span className="ic ic-sky">
                  <ShareIcon />
                </span>
                <h3>Social Media Management</h3>
                <p>
                  Facebook page management, content planning, scheduling and
                  engagement — from my experience managing pages for{" "}
                  <strong>Al-haya Wear</strong> and{" "}
                  <strong>Achieve Exam Center</strong>.
                </p>
              </div>
              <div className="service">
                <span className="ic ic-rose">
                  <SendIcon />
                </span>
                <h3>Marketing</h3>
                <p>
                  Promoting pages and businesses online — growing reach and
                  audience, backed by my own hands-on experience running and
                  growing Facebook pages.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED PORTFOLIO */}
        <section id="portfolio">
          <div className="wrap">
            <div className="sec-head">
              <span className="sec-tag">{"// Selected work"}</span>
              <h2>Featured Portfolio</h2>
              <p>
                Real projects that are deployed and usable today. Open them and
                click around — that is the portfolio.
              </p>
            </div>
            <div className="projects">
              <article className="project featured">
                <div className="mock" aria-hidden="true">
                  <div className="mock-bar">
                    <i></i>
                    <i></i>
                    <i></i>
                    <span className="mock-url">mess-kujo.vercel.app</span>
                  </div>
                  <div className="mock-body">
                    <div
                      className="blk a"
                      style={{ left: "4%", top: 10, width: "44%", height: 26 }}
                    ></div>
                    <div
                      className="blk"
                      style={{ left: "52%", top: 10, width: "20%", height: 26 }}
                    ></div>
                    <div
                      className="blk"
                      style={{ left: "76%", top: 10, width: "20%", height: 26 }}
                    ></div>
                    <div
                      className="blk"
                      style={{ left: "4%", top: 48, width: "29%", height: 58 }}
                    ></div>
                    <div
                      className="blk"
                      style={{ left: "36%", top: 48, width: "29%", height: 58 }}
                    ></div>
                    <div
                      className="blk"
                      style={{ left: "68%", top: 48, width: "28%", height: 58 }}
                    ></div>
                  </div>
                </div>
                <div className="project-body">
                  <div className="project-top">
                    <h3>
                      Mess Khojo{" "}
                      <span className="bn">— মেস/সাবলেট খোঁজো</span>
                    </h3>
                    <span className="live-badge">
                      <i></i>LIVE
                    </span>
                  </div>
                  <p className="desc">
                    A mess &amp; sublet finder web app for Chattogram,
                    Bangladesh. Students and bachelors find rooms; owners post
                    listings and talk to seekers directly inside the app.
                  </p>
                  <ul className="feat">
                    <li>
                      <strong>Listings with photo upload</strong>, search &amp;
                      filters by thana (16 metro thanas) and ward (41 wards)
                    </li>
                    <li>
                      <strong>Map picker</strong> (Leaflet / OpenStreetMap)
                      plus “near me” distance search
                    </li>
                    <li>
                      <strong>Real-time in-app chat</strong> between seekers and
                      owners, with photo sending
                    </li>
                    <li>
                      <strong>Real web push notifications</strong> and a full
                      super-admin dashboard — user management, ban/unban, chat
                      monitoring, ratings, notices
                    </li>
                    <li>
                      <strong>
                        Supabase Auth + database with Row Level Security
                      </strong>
                      , Cloudflare Turnstile CAPTCHA, strict role separation
                    </li>
                  </ul>
                  <div className="tags">
                    <span className="tag">Next.js</span>
                    <span className="tag">React</span>
                    <span className="tag">Supabase</span>
                    <span className="tag">Tailwind CSS</span>
                    <span className="tag">Vercel</span>
                    <span className="tag">Leaflet</span>
                    <span className="tag">Web Push</span>
                  </div>
                  <a
                    className="project-link"
                    href="https://mess-kujo.vercel.app/"
                    target="_blank"
                    rel="noopener"
                  >
                    Visit live site{" "}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7M8 7h9v9" />
                    </svg>
                  </a>
                </div>
              </article>
              <article className="project featured">
                <div className="mock" aria-hidden="true">
                  <div className="mock-bar">
                    <i></i>
                    <i></i>
                    <i></i>
                    <span className="mock-url">
                      clothing-store-mauve-pi.vercel.app
                    </span>
                  </div>
                  <div className="mock-body">
                    <div
                      className="blk a"
                      style={{ left: "4%", top: 10, width: "44%", height: 26 }}
                    ></div>
                    <div
                      className="blk"
                      style={{ left: "52%", top: 10, width: "20%", height: 26 }}
                    ></div>
                    <div
                      className="blk"
                      style={{ left: "76%", top: 10, width: "20%", height: 26 }}
                    ></div>
                    <div
                      className="blk"
                      style={{ left: "4%", top: 48, width: "29%", height: 58 }}
                    ></div>
                    <div
                      className="blk"
                      style={{ left: "36%", top: 48, width: "29%", height: 58 }}
                    ></div>
                    <div
                      className="blk"
                      style={{ left: "68%", top: 48, width: "28%", height: 58 }}
                    ></div>
                  </div>
                </div>
                <div className="project-body">
                  <div className="project-top">
                    <h3>Clothing Store</h3>
                    <span className="live-badge">
                      <i></i>LIVE
                    </span>
                  </div>
                  <p className="desc">
                    A complete online clothing store for Bangladesh — shop by
                    category, order with cash on delivery, and track orders,
                    with a separate admin app to run the whole shop.
                  </p>
                  <ul className="feat">
                    <li>
                      <strong>Shop, categories &amp; product pages</strong>{" "}
                      with photos, plus cart and checkout
                    </li>
                    <li>
                      <strong>Cash on delivery</strong> across Bangladesh, with
                      order tracking for customers
                    </li>
                    <li>
                      <strong>Customer accounts</strong> — signup, login and
                      your own orders in one place
                    </li>
                    <li>
                      <strong>Separate admin app</strong> — products and photo
                      uploads, order pipeline, categories and shop settings
                    </li>
                  </ul>
                  <div className="tags">
                    <span className="tag">Next.js</span>
                    <span className="tag">React</span>
                    <span className="tag">Supabase</span>
                    <span className="tag">Vercel</span>
                  </div>
                  <a
                    className="project-link"
                    href="https://clothing-store-mauve-pi.vercel.app/"
                    target="_blank"
                    rel="noopener"
                  >
                    Visit live site{" "}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7M8 7h9v9" />
                    </svg>
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* MY INTRO */}
        <section id="intro">
          <div className="wrap">
            <div className="sec-head">
              <span className="sec-tag">{"// Watch & listen"}</span>
              <h2>My Intro</h2>
              <p>A short introduction from me — in video and in my own voice.</p>
            </div>
            {hasIntro ? (
              <div className="intro-box">
                {media.video && (
                  <div>
                    <span className="intro-label">Intro Video</span>
                    <video
                      controls
                      preload="metadata"
                      src={media.video.public_url}
                      playsInline
                    />
                  </div>
                )}
                {media.audio && (
                  <div>
                    <span className="intro-label">Intro Voice</span>
                    <audio controls preload="metadata" src={media.audio.public_url} />
                  </div>
                )}
              </div>
            ) : (
              <div className="intro-empty">
                <strong>Intro coming soon</strong>
                I am preparing a short video and voice introduction.
                Check back shortly — or message me on WhatsApp any time.
              </div>
            )}
          </div>
        </section>

        {/* HOW I WORK & SKILLS */}
        <section id="work">
          <div className="wrap">
            <div className="sec-head">
              <span className="sec-tag">{"// Working style"}</span>
              <h2>How I Work</h2>
            </div>
            <div className="work-note">
              <p>
                I design every site to feel perfect on a phone screen first,
                because that is where your customers are. I ship{" "}
                <strong>fast and live</strong>: you get a working link early,
                watch it improve, and only pay for something real — not a
                promise in a PDF.
              </p>
            </div>

            <div className="skills-block">
              <h3>Skills &amp; tools</h3>
              <div className="skill-group">
                <h4>Web development</h4>
                <div className="chips">
                  <span className="chip hot">Next.js / React</span>
                  <span className="chip">HTML</span>
                  <span className="chip">CSS</span>
                  <span className="chip">JavaScript</span>
                  <span className="chip hot">Tailwind CSS</span>
                  <span className="chip">Responsive, mobile-first design</span>
                </div>
              </div>
              <div className="skill-group">
                <h4>Backend &amp; platform</h4>
                <div className="chips">
                  <span className="chip hot">
                    Supabase — database, auth &amp; storage
                  </span>
                  <span className="chip hot">Vercel deployment</span>
                  <span className="chip">Git / GitHub</span>
                  <span className="chip">Row Level Security</span>
                  <span className="chip">Web Push notifications</span>
                </div>
              </div>
              <div className="skill-group">
                <h4>Data entry &amp; office</h4>
                <div className="chips">
                  <span className="chip">Microsoft Excel</span>
                  <span className="chip">Google Sheets</span>
                  <span className="chip">Web research</span>
                  <span className="chip">Copy-paste &amp; data cleaning</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONNECT / LET'S TALK */}
        <TalkSection />
      </main>

      <footer>
        <div className="wrap">
          <span>© 2026 Abrar Mahmud — Bangladesh</span>
          <span className="mono">
            Web Development · Data Entry · Social Media · Marketing
          </span>
        </div>
      </footer>
    </>
  );
}
