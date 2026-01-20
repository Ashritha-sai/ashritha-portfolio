export default function MScProjectPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Neuromorphic Control for Robotic Augmentation</h1>
        <p className="text-neutral-300">
        EMG–IMU Fusion
        </p>
      </header>

      <Section title="Problem">
       Biological signals such as EMG are noisy and non-stationary, while inertial signals provide only indirect information about intent. 
       The system needed to reliably infer user intent and generate stable robotic control under real-time constraints.
      </Section>

      <Section title="What I built">
        <ul className="list-disc space-y-2 pl-5 text-neutral-300">
          <li>Developing a continuous control framework using EMG-IMU sensor fusion to map biological intent to robotic actuation.</li>
          <li>Implementing feature-level fusion to reduce latency in human-robot interaction (HRI), directly applicable to neuro-rehabilitation contexts.</li>
          <li>•	Evaluating robustness, user adaptation, and dual-task performance to quantify embodiment, attentional cost, and long-term usability in human–robot interaction.</li>
        </ul>
      </Section>

      <Section title="Stack">
        <p className="text-neutral-300">
        Bio-signal processing · sensor fusion · continuous control · human–robot interaction · neuromorphic principles.
        </p>
      </Section>

      <Section title="Outcome">
        <p className="text-neutral-300">
         Establishing an end-to-end experimental framework for studying embodiment, attentional cost, and long-term usability in robotic augmentation systems.
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
