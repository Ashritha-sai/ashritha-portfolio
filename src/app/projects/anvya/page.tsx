export default function AnvyaPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">ANVYA</h1>
        <p className="text-slate-600">
          Natural-language driven scientific visualisation system with explicit control over molecular representations.
        </p>
      </header>

      <Section title="Challenge">
        Scientific visualisation tools are powerful but hard to use. Translating user intent into correct, repeatable molecular representations often requires domain expertise and manual work—leading to irreproducible figures.
      </Section>

      <Section title="Approach">
        <ul className="list-disc space-y-2 pl-5 text-slate-600">
          <li>Built prompt-to-structure pipeline: parse user intent → assemble molecular structure → apply representation rules → render.</li>
          <li>Defined explicit representation rules to eliminate ambiguity and ensure repeatability across renders.</li>
          <li>Implemented context-aware controller supporting cartoon, surface, and scientific representation modes.</li>
        </ul>
      </Section>

      <Section title="Key Decisions">
        <ul className="list-disc space-y-2 pl-5 text-slate-600">
          <li><strong>Why "hide all → show one" principle?</strong> Ambiguous overlapping representations are the main source of confusion in molecular viz; forcing exactly one representation per render eliminates this.</li>
          <li><strong>Why explicit rules over learned rendering?</strong> Scientific figures require reproducibility; learned systems can produce visually similar but semantically different outputs.</li>
        </ul>
      </Section>

      <Section title="Stack">
        <p className="text-slate-600">Python · PyMOL · AlphaFold/SMILES pipelines · LLM prompting/orchestration</p>
      </Section>

      <Section title="Results">
        <ul className="list-disc space-y-2 pl-5 text-slate-600">
          <li>End-to-end system generating publication-ready molecular figures from natural language.</li>
          <li>Reproducible outputs verified across multiple protein structures.</li>
          <li>Reduced manual PyMOL scripting time for common visualisation tasks.</li>
        </ul>
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
