import React from "react";
import {
  ShieldCheck,
  FileText,
  RefreshCcw,
  Lock,
  Link2,
} from "lucide-react";
import Navbar from "../components/Navbar"; // tweak path if needed

const About = () => {
  return (
    <div className="bg-[var(--surface-0)] text-[var(--text)] min-h-screen">
      <Navbar dsbLogout={true} />

      {/* ---------- Intro ---------- */}
      <section className="max-w-5xl mx-auto pt-[100px] px-4 sm:px-8 lg:px-12 py-10">
        <div className="text-center mb-12">
          <span className="text-4xl">🛡️</span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[var(--primary)]">
            What is HIVE?
          </h1>
          <p className="mt-3 max-w-xl mx-auto text-sm sm:text-base text-[var(--text-muted)]">
            <strong>H</strong>ash <strong>I</strong>ntegrity <strong>V</strong>erification <strong>E</strong>ngine —
            a blockchain‑inspired platform for tamper‑proof file tracking.
          </p>
        </div>

        {/* ---------- Feature grid ---------- */}
        <div className="grid gap-6 sm:gap-8 lg:gap-10 grid-cols-1 md:grid-cols-2">
          <Feature icon={FileText} title="File Hashing">
            Each upload is fingerprinted with SHA‑256, forming the atomic link in your personal chain.
          </Feature>

          <Feature icon={Link2} title="Chained Blocks">
            Blocks cryptographically reference the previous block to make retroactive tampering obvious.
          </Feature>

          <Feature icon={RefreshCcw} title="Instant Re‑Verification">
            One click verifies the integrity of the entire chain and flags breaks in seconds.
          </Feature>

          <Feature icon={ShieldCheck} title="Integrity Status">
            Visual indicators (✅/❌) highlight whether a block is intact or has been altered.
          </Feature>

          <Feature icon={Lock} title="Authenticated Access">
            JWT + refresh‑token flow ensures only verified users can upload or inspect blocks.
          </Feature>
        </div>

        {/* ---------- Tech footer ---------- */}
        <div className="mt-12 text-center text-xs sm:text-sm text-[var(--text-muted)]">
          Built with the MERN stack, sprinkled with Tailwind CSS, and powered by cryptographic
          hash‑chaining. Project &copy; 2025 Harsh Kaushal.
        </div>
      </section>
    </div>
  );
};

const Feature = ({ icon: Icon, title, children }) => (
  <div className="flex gap-4 items-start">
    <div className="shrink-0 bg-[var(--primary)] bg-opacity-20 p-3 rounded-xl">
      <Icon
        size={24}
        strokeWidth={2}
        className="text-white"
      />
    </div>
    <div className="flex-1">
      <h3 className="font-semibold text-base mb-1">{title}</h3>
      <p className="text-sm leading-snug text-[var(--text-muted)]">{children}</p>
    </div>
  </div>
);


export default About;
