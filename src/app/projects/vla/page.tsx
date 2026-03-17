import Link from "next/link";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-[#262626] bg-[#161616] p-6">
      <h2 className="text-lg font-medium text-[#E0DDD5]">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default function VLAPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <Link href="/projects" className="text-sm text-[#4A4A4A] hover:text-[#FF4D00] transition-colors">
        ← Back
      </Link>

      <div className="mt-8">
        <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-display)] text-[#E0DDD5]">
          VLA-Agent: Language-Conditioned Manipulation
        </h1>
        <p className="text-[#8A8A8A] mt-4 text-lg leading-relaxed">
          Embodied AI translating natural language into multi-step physical robotic actions.
        </p>
        <p className="text-sm font-[family-name:var(--font-mono)] text-[#4A4A4A] mt-2">
          London, UK · Oct 2025 – Present
        </p>
      </div>

      <div className="space-y-8 mt-12">
        <Section title="Challenge">
          <p className="text-[#8A8A8A]">
            Bridging natural language and physical manipulation requires reliable grounding of abstract instructions into precise, verifiable robotic actions with error recovery.
          </p>
        </Section>

        <Section title="Implementation">
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-[#8A8A8A]">Closed-loop PyBullet sim with <span className="text-[#E0DDD5]">7-DOF Franka Panda</span>.</li>
            <li className="text-[#8A8A8A]">Skills layer (pick/place/push) with IK and constraint-based grasping.</li>
            <li className="text-[#8A8A8A]">Orchestration agent bridging physics with LLMs (<span className="text-[#E0DDD5]">GPT-4/Claude</span>).</li>
            <li className="text-[#8A8A8A]">Feedback loop for physical success verification and error re-prompting.</li>
            <li className="text-[#8A8A8A]">Production-grade CLI REPL + <span className="text-[#E0DDD5]">176 headless tests</span>.</li>
          </ul>
        </Section>

        <Section title="Stack">
          <p className="text-[#8A8A8A]">
            Python · PyBullet · OpenAI API · Anthropic API · NumPy · SciPy · Pytest
          </p>
        </Section>

        <Section title="Results">
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-[#8A8A8A]"><span className="text-[#E0DDD5]">V1.0 deployed:</span> multi-turn spatial reasoning with reliable pick-and-place.</li>
            <li className="text-[#8A8A8A]"><span className="text-[#E0DDD5]">Next:</span> headless synthetic data generator for local SLM fine-tuning via LoRA + DPO.</li>
          </ul>
        </Section>
      </div>
    </div>
  );
}
