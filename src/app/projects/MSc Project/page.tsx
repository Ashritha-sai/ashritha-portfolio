export default function MScProjectPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Neuromorphic Control for Robotic Augmentation</h1>
        <p className="text-slate-600">
          EMG–IMU fusion for continuous robotic control with embodiment evaluation. MSc thesis, Imperial College London.
        </p>
      </header>

      <Section title="Challenge">
        Biological signals (EMG) are noisy and non-stationary; inertial signals (IMU) provide only indirect information about intent. The system must reliably infer user intent and generate stable robotic control in real time—while being usable enough that users can perform secondary tasks.
      </Section>

      <Section title="Approach">
        <ul className="list-disc space-y-2 pl-5 text-slate-600">
          <li>Developing continuous control framework using EMG-IMU sensor fusion to map biological intent to robotic actuation.</li>
          <li>Implementing feature-level fusion to reduce latency in human-robot interaction, targeting neuro-rehabilitation applications.</li>
          <li>Designing dual-task experiments to quantify embodiment, attentional cost, and long-term usability.</li>
        </ul>
      </Section>

      <Section title="Key Decisions">
        <ul className="list-disc space-y-2 pl-5 text-slate-600">
          <li><strong>Why EMG + IMU fusion?</strong> EMG captures intent but is noisy; IMU captures motion but not intent. Fusion provides complementary information for robust inference.</li>
          <li><strong>Why dual-task evaluation?</strong> Single-task performance hides attentional cost; dual-task reveals whether the system is truly embodied or cognitively demanding.</li>
          <li><strong>Why continuous over discrete control?</strong> Real augmentation tasks require proportional, smooth control—not gesture classification.</li>
        </ul>
      </Section>

      <Section title="Stack">
        <p className="text-slate-600">
          Bio-signal processing · Sensor fusion · Continuous control · Human-robot interaction evaluation
        </p>
      </Section>

      <Section title="Results">
        <p className="text-slate-600 italic">
          In progress — establishing experimental framework for studying embodiment and usability in robotic augmentation systems.
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
