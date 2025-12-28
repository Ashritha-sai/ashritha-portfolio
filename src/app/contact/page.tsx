"use client";

import { useMemo, useState } from "react";

export default function ContactPage() {
  const email = "ashrithaafmc@gmail.com";
  const linkedin = "https://www.linkedin.com/in/ashritha-sai-mani-chundru"; // <-- replace

  const [copied, setCopied] = useState(false);

  const recruiterTemplate = useMemo(() => {
    return `Hi Ashritha,

I found your portfolio and would love to connect about a role/opportunity.

Context:
- Role:
- Company:
- Why you thought of me:
- Timeline:
- Anything I should read ahead:

Best,
[Name]`;
  }, []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  }

  async function copyTemplate() {
    try {
      await navigator.clipboard.writeText(recruiterTemplate);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  }

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
        <p className="max-w-2xl text-neutral-300">
          Email is best. LinkedIn is fine. If you send context, I reply faster.
        </p>
      </header>

      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <div className="text-sm text-neutral-400">Primary</div>
            <div className="text-lg font-semibold text-neutral-100">{email}</div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${email}`}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-neutral-100 transition hover:bg-white/[0.08]"
            >
              Email me →
            </a>

            <button
              onClick={copyEmail}
              className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-neutral-200 transition hover:bg-white/[0.06]"
              type="button"
            >
              {copied ? "Copied" : "Copy email"}
            </button>

            <a
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-neutral-200 transition hover:bg-white/[0.06]"
            >
              LinkedIn →
            </a>
          </div>
        </div>

        <div className="mt-6 h-px w-full bg-gradient-to-r from-white/0 via-white/10 to-white/0" />

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <div className="text-sm font-semibold text-neutral-200">Open to</div>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-300">
              <li>Early-stage engineering roles (full-stack + ML systems)</li>
              <li>Research engineering (robotics, perception, neuro/biomech)</li>
              <li>Building LLM products with strong evaluation + reliability</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <div className="text-sm font-semibold text-neutral-200">Helpful context</div>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-300">
              <li>Role + stack</li>
              <li>Timeline + location (remote/hybrid)</li>
              <li>What problem you want me to own</li>
              <li>Links (JD, repo, paper, product)</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm font-semibold text-neutral-200">
                Quick contact template
              </div>
              <p className="mt-1 text-sm text-neutral-400">
                Copy-paste this so we skip the awkward “hi” phase.
              </p>
            </div>

            <button
              onClick={copyTemplate}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-neutral-100 transition hover:bg-white/[0.08]"
              type="button"
            >
              Copy template
            </button>
          </div>

          <pre className="mt-4 whitespace-pre-wrap rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-neutral-300">
{recruiterTemplate}
          </pre>
        </div>
      </section>

      <footer className="text-sm text-neutral-400">
        London, UK · Open to early-stage roles from Jan 2026
      </footer>
    </div>
  );
}
