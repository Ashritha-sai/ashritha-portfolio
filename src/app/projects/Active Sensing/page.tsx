export default function ActiveSensingPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Active Sensing under Uncertanity</h1>
        <p className="text-neutral-300">
          Reinforcement Learning & Biomedical Simulation
        </p>
      </header>

      <Section title="Problem">
       Inferring physical parameters from biomedical signals is unreliable under noise and limited data. The system needed to learn probe-efficient sensing strategies under uncertainty.
      </Section>

      <Section title="What I built">
        <ul className="list-disc space-y-2 pl-5 text-neutral-300">
          <li>Designed a Monte Carlo–driven synthetic environment modelling stochastic skin optics with physiologically grounded variability.</li>
          <li>Trained and analysed reinforcement learning policies for probe-efficient, robust inference under partial observability.</li>
          <li>Ongoing work exploring policy-dependent identifiability and information-efficient sensing strategies for biomedical applications.</li>
        </ul>
      </Section>

      <Section title="Stack">
        <p className="text-neutral-300">
            Monte Carlo simulation · reinforcement learning · partially observable environments · stochastic biomedical modelling.
        </p>
      </Section>

      <Section title="Outcome">
        <p className="text-neutral-300">
        Established a simulation and evaluation framework for analysing policy-dependent identifiability and information-efficient sensing strategies.
        </p>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
