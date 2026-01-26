export default function RLAIFPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">RL-Driven Vision Optimization (RLAIF)</h1>
        <p className="text-slate-600">
          Automated feedback pipeline using Proximal Policy Optimization to fine-tune vision models with minimal human annotation.
        </p>
        <div className="text-sm text-slate-500">
          Imperial College London · Dec 2025 – Present
        </div>
      </header>

      <Section title="Challenge">
        Traditional vision model training requires extensive human annotation, creating bottlenecks when adapting to new domains or evolving threats. The goal: build infrastructure for autonomous model improvement that can scale without proportional human effort.
      </Section>

      <Section title="Approach">
        <ul className="list-disc space-y-2 pl-5 text-slate-600">
          <li>Built an automated feedback pipeline that reduced human annotation needs by 95%, enabling rapid model retraining on new datasets.</li>
          <li>Implemented PPO (Proximal Policy Optimization) to fine-tune vision models, creating a closed-loop system that improves autonomously.</li>
          <li>Designed the system architecture to support nightly retraining infrastructure—critical for adapting to evolving real-world conditions.</li>
        </ul>
      </Section>

      <Section title="Key Decisions">
        <ul className="list-disc space-y-2 pl-5 text-slate-600">
          <li><strong>Why RLAIF over supervised fine-tuning?</strong> Reinforcement learning from AI feedback enables continuous improvement without constant human labeling, making the system self-sustaining.</li>
          <li><strong>Why PPO?</strong> Stable policy updates with clipped objectives prevent catastrophic forgetting while allowing meaningful model improvements per iteration.</li>
          <li><strong>Why focus on annotation reduction?</strong> The bottleneck in production ML systems is often data labeling, not compute—solving this unlocks faster iteration cycles.</li>
        </ul>
      </Section>

      <Section title="Stack">
        <p className="text-slate-600">
          Python · PyTorch · PPO · Vision Models · RLAIF · MLOps
        </p>
      </Section>

      <Section title="Results">
        <ul className="list-disc space-y-2 pl-5 text-slate-600">
          <li>95% reduction in human annotation requirements for model retraining.</li>
          <li>Closed-loop autonomous improvement system with PPO-based fine-tuning.</li>
          <li>Infrastructure pattern applicable to rapid adaptation scenarios requiring continuous model updates.</li>
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
