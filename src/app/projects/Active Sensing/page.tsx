export default function ActiveSensingPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Active Sensing under Uncertainty</h1>
        <p className="text-slate-600">
          Reinforcement learning for probe-efficient parameter inference in stochastic biomedical environments.
        </p>
      </header>

      <Section title="Challenge">
        Inferring physical parameters from biomedical signals is unreliable under noise and limited measurements. Traditional fixed sensing strategies waste samples on uninformative probes. The system needed to learn adaptive, probe-efficient sensing under uncertainty.
      </Section>

      <Section title="Approach">
        <ul className="list-disc space-y-2 pl-5 text-slate-600">
          <li>Designed a Monte Carlo-driven synthetic environment modelling stochastic skin optics with physiologically grounded variability.</li>
          <li>Trained RL policies for probe-efficient, robust inference under partial observability.</li>
          <li>Analysed policy behaviour to understand which sensing strategies emerge and when they fail.</li>
        </ul>
      </Section>

      <Section title="Key Decisions">
        <ul className="list-disc space-y-2 pl-5 text-slate-600">
          <li><strong>Why RL over Bayesian optimal design?</strong> RL scales to high-dimensional action spaces and can learn non-myopic strategies; Bayesian methods become intractable with complex simulators.</li>
          <li><strong>Why synthetic environment first?</strong> Real biomedical experiments are expensive and slow; synthetic environments enable rapid policy iteration before validation on real hardware.</li>
        </ul>
      </Section>

      <Section title="Stack">
        <p className="text-slate-600">
          Monte Carlo simulation · Reinforcement learning · Partially observable MDPs · Python
        </p>
      </Section>

      <Section title="Results">
        <ul className="list-disc space-y-2 pl-5 text-slate-600">
          <li>Simulation framework for analysing policy-dependent identifiability.</li>
          <li>Demonstrated that learned policies outperform fixed sensing strategies on sample efficiency.</li>
          <li>Ongoing work: extending to multi-parameter inference and real sensor validation.</li>
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
