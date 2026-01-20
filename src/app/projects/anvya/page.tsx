export default function AnvyaPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">ANVYA</h1>
        <p className="text-slate-600">
          Natural-language driven scientific visualisation system with explicit control over representations.
        </p>
      </header>

      <Section title="Problem">
        Scientific visualisation tools are powerful but hard to use. Translating intent into correct, repeatable
        representations often requires domain expertise and manual work.
      </Section>

      <Section title="What I built">
        <ul className="list-disc space-y-2 pl-5 text-slate-600">
          <li>Prompt-to-structure pipeline: parse → assemble → refine → render.</li>
          <li>Representation rules to reduce ambiguity and ensure repeatability.</li>
          <li>Context-aware visualisation controller (cartoon vs scientific modes).</li>
        </ul>
      </Section>

      <Section title="Stack">
        <p className="text-slate-600">Python · PyMOL · AlphaFold/SMILES pipelines · LLM prompting/orchestration</p>
      </Section>

      <Section title="Notes">
        <p className="text-slate-600">
          Key design principle: hide all → show exactly one representation per render. No ambiguity.
        </p>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white/80 p-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
