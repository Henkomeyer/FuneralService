// ──────────────────────────────────────────────────────────────────────────────
// src/App.jsx  (your original single-file app moved here unchanged except minor tweaks)
// ──────────────────────────────────────────────────────────────────────────────
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, FileText, MessageSquareHeart, ArrowLeft, SendHorizonal, Trash2, ExternalLink, Sun, Moon, Sparkles } from "lucide-react";
import { createClient } from "@supabase/supabase-js";


const EVENT_ID = import.meta.env.VITE_EVENT_ID || "memorial-2025-demo"; // used for message scoping
const PERSON = {
  fullName: " Liewe Ruan",
  sunset: "2025-08-18",
  heroImage:
    "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1600&auto=format&fit=crop",
};

const BRAND = { accent: import.meta.env.VITE_BRAND_ACCENT || "#143427" };

const LINKS = {
  GOOGLE_PHOTOS_URL: import.meta.env.VITE_GOOGLE_PHOTOS_URL || "https://photos.app.goo.gl/your-shared-album-link",
  PAMPHLET_PDF_URL: import.meta.env.VITE_PAMPHLET_PDF_URL || "https://your-cdn-or-drive-link/program.pdf",
};

// Supabase (optional but recommended for shared messages)
const SUPABASE = {
  url: import.meta.env.VITE_SUPABASE_URL || "",
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || "",
  table: import.meta.env.VITE_SUPABASE_TABLE || "messages",
};
const supabase = SUPABASE.url && SUPABASE.anonKey ? createClient(SUPABASE.url, SUPABASE.anonKey) : null;

// Utilities
const fmtDate = (iso) => {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  } catch { return iso; }
};
const useHashRoute = () => {
  const [route, setRoute] = useState(() => window.location.hash.replace("#", "") || "/");
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace("#", "") || "/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const navigate = (path) => { window.location.hash = path; };
  return { route, navigate };
};
const storageKey = (suffix) => `${EVENT_ID}:${suffix}`;

// Sunrise/Sunset ribbon
const SunriseSunset = () => (
  <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-3">
    <div className="mb-2 flex items-center gap-3 text-xs font-medium text-gray-700">
      <span className="inline-flex items-center gap-1"><Sun className="h-4 w-4" style={{ color: BRAND.accent }} /> Sunrise:</span>
      <span>{fmtDate(PERSON.sunrise)}</span>
      <span className="mx-2 text-gray-300">•</span>
      <span className="inline-flex items-center gap-1"><Moon className="h-4 w-4" style={{ color: BRAND.accent }} /> Sunset:</span>
      <span>{fmtDate(PERSON.sunset)}</span>
    </div>
    <div className="relative h-2 w-full rounded-full" style={{ background: `linear-gradient(90deg, ${BRAND.accent}22, ${BRAND.accent}44, ${BRAND.accent}22)` }}>
      <motion.div className="absolute -top-1 h-4 w-4 rounded-full shadow" style={{ backgroundColor: BRAND.accent }} animate={{ x: [0, 'calc(100% - 16px)', 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
    </div>
    <motion.div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full" style={{ backgroundColor: `${BRAND.accent}0f` }} animate={{ rotate: [0, 10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
  </div>
);

// Shell
const Shell = ({ children, onBack }) => (
  <div className="min-h-screen bg-gray-50 text-gray-900">
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(1200px 600px at -10% -10%, ${BRAND.accent}10, transparent), radial-gradient(1200px 600px at 110% 110%, ${BRAND.accent}10, transparent)` }} />
      <div className="mx-auto max-w-5xl px-4 pt-8 pb-4">
        {onBack ? (
          <button onClick={onBack} className="mb-6 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm hover:bg-gray-50">
            <span className="i"><ArrowLeft className="h-4 w-4" /></span> Back
          </button>
        ) : null}
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              <span className="bg-clip-text text-transparent drop-shadow-sm" style={{ backgroundImage: `linear-gradient(90deg, ${BRAND.accent}, #0f172a)` }}>
                {PERSON.fullName}
              </span>
            </h1>
            <div className="mt-4"><SunriseSunset /></div>
          </div>
          {PERSON.heroImage ? (
            <img src={PERSON.heroImage} alt="Memorial hero" className="h-28 w-28 rounded-2xl object-cover shadow md:h-32 md:w-32" />
          ) : null}
        </div>
      </div>
    </header>
    <main className="mx-auto max-w-5xl px-4 pb-20">{children}</main>
    <footer className="border-t border-gray-200 bg-white/60 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 py-4 text-center text-xs text-gray-500">
        Built with love. © {new Date().getFullYear()}
      </div>
    </footer>
  </div>
);

// Home
const Home = ({ onOpenPhotos, onOpenPamphlet, onOpenMemories }) => {
  const Card = ({ icon: Icon, title, body, cta, onClick }) => (
    <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={onClick} className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm transition hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="rounded-xl p-2" style={{ backgroundColor: `${BRAND.accent}10` }}>
          <Icon className="h-6 w-6" style={{ color: BRAND.accent }} />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="mt-3 text-sm text-gray-600">{body}</p>
      <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium" style={{ color: BRAND.accent }}>
        {cta} <ExternalLink className="h-4 w-4 opacity-70 transition group-hover:translate-x-0.5" />
      </div>
    </motion.button>
  );

  return (
    <Shell>
      <section className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        <Card icon={UploadCloud} title="Upload Photos" body="Contribute your treasured photos to the shared family album." cta="Open Google Photos" onClick={onOpenPhotos} />
        <Card icon={FileText} title="View the Digital Pamphlet" body="Open the memorial pamphlet as a PDF to read or download." cta="Open pamphlet" onClick={onOpenPamphlet} />
        <Card icon={MessageSquareHeart} title="Share & Read Messages" body="Leave a message of love and remembrance, and read messages from others." cta="Open message wall" onClick={onOpenMemories} />
      </section>
      <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="text-base font-semibold text-gray-800">About this page</h2>
        <p className="mt-2 text-sm leading-6 text-gray-600">Thank you for being here. This memorial space is a simple way to share photos, view the digital pamphlet, and post your personal tributes. Your presence and words are deeply appreciated by the family.</p>
      </section>
    </Shell>
  );
};

// Pamphlet
const Pamphlet = ({ onBack }) => {
  const url = LINKS.PAMPHLET_PDF_URL;
  return (
    <Shell onBack={onBack}>
      <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-4">
        {!url || url.includes("your-cdn-or-drive-link") ? (
          <div className="p-6 text-sm text-yellow-700">
            <p className="font-medium">No PDF URL configured.</p>
            <p className="mt-1">Please set <code>LINKS.PAMPHLET_PDF_URL</code> to a valid public PDF link.</p>
          </div>
        ) : (
          <iframe title="Memorial Pamphlet" src={`${url}#view=FitH&scrollbar=1&toolbar=1`} className="h-[78vh] w-full rounded-xl border" />
        )}
      </section>
    </Shell>
  );
};

// Memories (Supabase realtime or localStorage fallback)
const Memories = ({ onBack }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [items, setItems] = useState([]);
  const usingSupabase = !!supabase;

  useEffect(() => {
    const load = async () => {
      if (usingSupabase) {
        const { data } = await supabase
          .from(SUPABASE.table)
          .select("id,name,text,created_at")
          .eq("event_id", EVENT_ID)
          .order("created_at", { ascending: false })
          .limit(500);
        if (data) setItems(data);
      } else {
        try { setItems(JSON.parse(localStorage.getItem(storageKey("messages"))) || []); } catch {}
      }
    };
    load();

    if (usingSupabase) {
      const channel = supabase
        .channel(`messages-${EVENT_ID}`)
        .on("postgres_changes", { event: "INSERT", schema: "public", table: SUPABASE.table, filter: `event_id=eq.${EVENT_ID}` }, (payload) => {
          const row = payload.new;
          setItems((prev) => [{ id: row.id, name: row.name, text: row.text, created_at: row.created_at }, ...prev]);
        })
        .subscribe();
      return () => supabase.removeChannel(channel);
    }
  }, [usingSupabase]);

  const saveLocal = (next) => { setItems(next); localStorage.setItem(storageKey("messages"), JSON.stringify(next)); };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const entry = { name: name.trim().slice(0, 60), text: message.trim().slice(0, 800) };

    if (usingSupabase) {
      const { error } = await supabase.from(SUPABASE.table).insert({ event_id: EVENT_ID, name: entry.name, text: entry.text });
      if (error) { alert("Sorry, we couldn't post your message right now. Please try again."); return; }
    } else {
      const optimistic = [{ id: crypto.randomUUID(), name: entry.name, text: entry.text, created_at: new Date().toISOString() }, ...items];
      saveLocal(optimistic);
    }

    setMessage("");
  };

  const onClearLocal = () => { if (!usingSupabase && confirm("This clears messages on this device only. Continue?")) saveLocal([]); };
  const sorted = useMemo(() => [...items].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)), [items]);

  return (
    <Shell onBack={onBack}>
      {usingSupabase ? null : (
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          Shared messages are not yet configured. Add your Supabase URL & anon key in the config to enable global messages.
        </div>
      )}
      <section className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-gray-800">Share a message</h2>
            <p className="mt-1 text-sm text-gray-600">Your words of comfort mean so much. Thank you.</p>
            <form onSubmit={onSubmit} className="mt-4 space-y-3">
              <div>
                <label className="text-sm text-gray-700">Your name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Aunt Lindiwe" className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:border-gray-400 focus:outline-none" maxLength={60} required />
              </div>
              <div>
                <label className="text-sm text-gray-700">Message</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write a memory, tribute, or message of support..." className="mt-1 h-32 w-full rounded-xl border border-gray-300 px-3 py-2 focus:border-gray-400 focus:outline-none" maxLength={800} required />
                <div className="mt-1 text-right text-xs text-gray-500">{message.length}/800</div>
              </div>
              <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-2 font-medium text-white hover:bg-black">
                <SendHorizonal className="h-4 w-4" /> Post message
              </button>
              {!usingSupabase && (
                <button type="button" onClick={onClearLocal} className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <Trash2 className="h-4 w-4" /> Clear (this device only)
                </button>
              )}
            </form>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="rounded-2xl border border-gray-200 bg-white">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h3 className="text-base font-semibold text-gray-800">Messages</h3>
              <span className="text-xs text-gray-500">{sorted.length} total</span>
            </div>
            <ul className="divide-y">
              {sorted.length === 0 ? (
                <li className="p-6 text-sm text-gray-500">No messages yet. Be the first to share.</li>
              ) : (
                sorted.map((m) => (
                  <li key={m.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <p className="font-medium text-gray-800">{m.name}</p>
                      <time className="text-xs text-gray-500">{new Date(m.created_at).toLocaleString()}</time>
                    </div>
                    <p className="mt-1 whitespace-pre-wrap text-[15px] leading-6 text-gray-700">{m.text}</p>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </section>
    </Shell>
  );
};

// App (Router)
export default function App() {
  const { route, navigate } = useHashRoute();
  const goHome = () => navigate("/");
  const openPhotos = () => {
    const url = LINKS.GOOGLE_PHOTOS_URL;
    if (!url || url.includes("your-shared-album-link")) { alert("No Google Photos link configured yet. Please set LINKS.GOOGLE_PHOTOS_URL."); return; }
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <div className="font-sans">
      {route === "/" && (<Home onOpenPhotos={openPhotos} onOpenPamphlet={() => navigate("/pamphlet")} onOpenMemories={() => navigate("/memories")} />)}
      {route === "/pamphlet" && <Pamphlet onBack={goHome} />}
      {route === "/memories" && <Memories onBack={goHome} />}
    </div>
  );
}
