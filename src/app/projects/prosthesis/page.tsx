export default function ProsthesisPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Adaptive Prosthesis Control</h1>
        <p className="text-slate-600">
          Real-time EEG-to-gesture control pipeline designed to work under sensor noise and hardware constraints. Smart India Hackathon winner.
        </p>
      </header>

      <Section title="Challenge">
        EEG signals are noisy and non-stationary. The system needed to classify user gestures reliably and convert them into stable motor commands in real time, under competition hardware constraints.
      </Section>

      <Section title="Approach">
        <ul className="list-disc space-y-2 pl-5 text-slate-600">
          <li>Built EEG preprocessing pipeline with artefact removal and band-pass filtering for gesture-relevant frequencies.</li>
          <li>Implemented real-time gesture classification with low-latency inference.</li>
          <li>Added stabilisation layer to suppress noisy command transitions and ensure smooth servo control.</li>
        </ul>
      </Section>

      <Section title="Key Decisions">
        <ul className="list-disc space-y-2 pl-5 text-slate-600">
          <li><strong>Why a stabilisation layer?</strong> Raw classifier outputs caused jittery movements; the stabilisation layer enforced temporal consistency without adding latency.</li>
          <li><strong>Why simple classification over continuous decoding?</strong> Competition timeline and hardware limits favoured reliable discrete gestures over ambitious continuous control.</li>
        </ul>
      </Section>

      <Section title="Stack">
        <p className="text-slate-600">EEG preprocessing · Band-pass filtering · Real-time classification · Servo control</p>
      </Section>

      <Section title="Results">
        <ul className="list-disc space-y-2 pl-5 text-slate-600">
          <li>Working real-time prototype delivered under 48-hour competition constraints.</li>
          <li>Won 1st place at Smart India Hackathon (hardware edition).</li>
          <li>Validated that stabilisation layer reduced command jitter by observable margin in demo.</li>
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
