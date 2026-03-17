import Link from "next/link";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-[#262626] bg-[#161616] p-6">
      <h2 className="text-lg font-medium text-[#E0DDD5]">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function GitHubIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function RLAIFPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <Link href="/projects" className="text-sm text-[#4A4A4A] hover:text-[#FF4D00] transition-colors">
        ← Back
      </Link>

      <div className="mt-8">
        <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-display)] text-[#E0DDD5]">
          RL-Driven Vision Optimization
        </h1>
        <a
          href="https://github.com/ashritha-sai/Constitutional-AI-Vision"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 rounded-lg border border-[#262626] bg-[#161616] px-4 py-2 text-sm text-[#8A8A8A] hover:text-[#FF4D00] hover:border-[#FF4D00] transition-all"
        >
          <GitHubIcon />
          View on GitHub
        </a>
        <p className="text-[#8A8A8A] mt-4 text-lg leading-relaxed">
          Automated feedback pipeline using PPO to fine-tune vision models with minimal human annotation.
        </p>
        <p className="text-sm font-[family-name:var(--font-mono)] text-[#4A4A4A] mt-2">
          Imperial College London · Dec 2025 – Present
        </p>
      </div>

      <div className="space-y-8 mt-12">
        <Section title="Challenge">
          <p className="text-[#8A8A8A]">
            Traditional vision model training requires extensive human annotation, creating bottlenecks when adapting to new domains. The goal: build infrastructure for autonomous model improvement that scales without proportional human effort.
          </p>
        </Section>

        <Section title="Approach">
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-[#8A8A8A]">Built an automated feedback pipeline reducing annotation by 95%, enabling rapid model retraining on new datasets.</li>
            <li className="text-[#8A8A8A]">Implemented PPO (Proximal Policy Optimization) for closed-loop retraining, creating a system that improves autonomously.</li>
            <li className="text-[#8A8A8A]">Designed nightly retraining infrastructure for adapting to evolving real-world conditions.</li>
          </ul>
        </Section>

        <Section title="Key Decisions">
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-[#8A8A8A]"><span className="text-[#E0DDD5]">RLAIF over supervised fine-tuning:</span> Reinforcement learning from AI feedback enables continuous improvement without constant human labeling, making the system self-sustaining.</li>
            <li className="text-[#8A8A8A]"><span className="text-[#E0DDD5]">PPO for stable updates:</span> Clipped objectives prevent catastrophic forgetting while allowing meaningful model improvements per iteration.</li>
            <li className="text-[#8A8A8A]"><span className="text-[#E0DDD5]">Focus on annotation reduction:</span> The bottleneck in production ML systems is often data labeling, not compute—solving this unlocks faster iteration cycles.</li>
          </ul>
        </Section>

        <Section title="Stack">
          <p className="text-[#8A8A8A]">
            Python · PyTorch · PPO · Vision Models · RLAIF · MLOps
          </p>
        </Section>

        <Section title="Results">
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-[#8A8A8A]"><span className="text-[#E0DDD5]">95% reduction</span> in annotation requirements for model retraining.</li>
            <li className="text-[#8A8A8A]"><span className="text-[#E0DDD5]">Closed-loop autonomous improvement</span> system with PPO-based fine-tuning.</li>
            <li className="text-[#8A8A8A]"><span className="text-[#E0DDD5]">Infrastructure pattern</span> applicable to continuous model updates.</li>
          </ul>
        </Section>
      </div>
    </div>
  );
}
