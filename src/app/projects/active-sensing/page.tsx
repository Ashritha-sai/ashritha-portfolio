import Link from "next/link";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-[#262626] bg-[#161616] p-6">
      <h2 className="text-lg font-medium text-[#E0DDD5]">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default function ActiveSensingPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <Link href="/projects" className="text-sm text-[#4A4A4A] hover:text-[#FF4D00] transition-colors">
        ← Back
      </Link>

      <div className="mt-8">
        <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-display)] text-[#E0DDD5]">
          Active Sensing under Uncertainty
        </h1>
        <p className="text-[#8A8A8A] mt-4 text-lg leading-relaxed">
          Reinforcement learning in uncertain biomedical settings.
        </p>
        <p className="text-sm font-[family-name:var(--font-mono)] text-[#4A4A4A] mt-2">
          London, UK · Nov 2025 – Present
        </p>
      </div>

      <div className="space-y-8 mt-12">
        <Section title="Challenge">
          <p className="text-[#8A8A8A]">
            Biomedical sensing under uncertainty requires intelligent sequential decisions about where and when to measure.
          </p>
        </Section>

        <Section title="Approach">
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-[#8A8A8A]">RL-based active sensing policy for optimal measurement selection.</li>
            <li className="text-[#8A8A8A]">Monte Carlo simulation for training under partial observability.</li>
            <li className="text-[#8A8A8A]">Balancing information gain vs measurement cost.</li>
          </ul>
        </Section>

        <Section title="Stack">
          <p className="text-[#8A8A8A]">
            Python · RL · Monte Carlo · Biomedical Modeling
          </p>
        </Section>

        <Section title="Status">
          <p className="text-[#8A8A8A]">
            Active research project exploring optimal sensing strategies under uncertainty.
          </p>
        </Section>
      </div>
    </div>
  );
}
