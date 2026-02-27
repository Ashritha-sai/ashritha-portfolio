function GitHubIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function RLAIFPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="text-3xl font-semibold tracking-tight">RL-Driven Vision Optimization (RLAIF)</h1>
          <a
            href="https://github.com/Ashritha-sai/Constitutional-AI-Vision"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            <GitHubIcon />
            View on GitHub
          </a>
        </div>
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
