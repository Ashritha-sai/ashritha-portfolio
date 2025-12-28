export default function ProsthesisPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Adaptive prosthesis control (Smart India Hackathon winner)</h1>
        <p className="text-neutral-300">
          Real-time EEG-to-gesture control pipeline designed to work under sensor noise and hardware constraints.
        </p>
      </header>

      <Section title="Problem">
        EEG signals are noisy and non-stationary. The system needed to classify gestures reliably and convert them into stable motor commands in real time.
      </Section>

      <Section title="What I built">
        <ul className="list-disc space-y-2 pl-5 text-neutral-300">
          <li>EEG preprocessing + artefact removal + gesture classification pipeline.</li>
          <li>Real-time servo control for multi-gesture arm movements.</li>
          <li>Stabilisation layer for noise-suppressed command execution.</li>
        </ul>
      </Section>

      <Section title="Stack">
        <p className="text-neutral-300">EEG preprocessing · Classification · Real-time servo control</p>
      </Section>

      <Section title="Outcome">
        <p className="text-neutral-300">
          Delivered a working real-time prototype under competition constraints and validated stability improvements through the stabilisation layer.
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
