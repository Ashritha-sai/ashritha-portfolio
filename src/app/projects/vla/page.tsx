export default function VLAPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          VLA-Agent: Language-Conditioned Robotic Manipulation
        </h1>
        <p className="text-slate-600">
          An embodied AI system that translates natural language instructions
          into multi-step physical robotic actions using Large Language Models
          and constraint-based manipulation.
        </p>
      </header>

      <Section title="Challenge">
        Bridging natural language understanding and physical manipulation
        requires reliable grounding of abstract instructions into precise,
        verifiable robotic actions&mdash;with error recovery when the physical
        world doesn&apos;t cooperate.
      </Section>

      <Section title="What I Built">
        <ul className="list-disc space-y-2 pl-5 text-slate-600">
          <li>
            Engineered a closed-loop tabletop physics simulation in PyBullet,
            featuring a 7-DOF Franka Emika Panda arm interacting with
            dynamically spawned objects.
          </li>
          <li>
            Developed a robust Skills Layer of manipulation primitives (pick,
            place, push) handling Inverse Kinematics, joint-space motion, and
            constraint-based grasping to ensure objects do not slip during
            transport.
          </li>
          <li>
            Designed an orchestration agent that bridges physical environments
            with LLMs (GPT-4 / Claude), building contextual scene prompts and
            parsing structured JSON action plans.
          </li>
          <li>
            Implemented a feedback loop where the system verifies the physical
            success of actions (e.g., checking gripper width for successful
            grasps) and re-prompts the LLM for error correction.
          </li>
          <li>
            Built a production-grade codebase featuring an interactive CLI REPL
            and a comprehensive suite of 176 headless tests validating
            everything from low-level physics to prompt construction.
          </li>
        </ul>
      </Section>

      <Section title="Key Decisions">
        <ul className="list-disc space-y-2 pl-5 text-slate-600">
          <li>
            <strong>Why a Skills Layer?</strong> Abstracting low-level IK and
            grasping into verified primitives lets the LLM reason at the task
            level without getting bogged down in motor commands.
          </li>
          <li>
            <strong>Why closed-loop verification?</strong> Physical actions fail
            silently&mdash;checking gripper state and object positions after each
            action enables autonomous error recovery without human intervention.
          </li>
          <li>
            <strong>Why 176 headless tests?</strong> Embodied AI systems are
            notoriously hard to debug; comprehensive testing from physics to
            prompt parsing catches regressions before they compound.
          </li>
        </ul>
      </Section>

      <Section title="Stack">
        <p className="text-slate-600">
          Python &middot; PyBullet &middot; OpenAI API (GPT-4) &middot;
          Anthropic API (Claude) &middot; NumPy &middot; SciPy &middot; Pytest
          &middot; CLI Architecture
        </p>
      </Section>

      <Section title="Results &amp; Status">
        <ul className="list-disc space-y-2 pl-5 text-slate-600">
          <li>
            <strong>v1.0 deployed:</strong> Agent successfully executes complex,
            multi-turn spatial reasoning tasks with reliable pick-and-place and
            robust simulated error recovery.
          </li>
          <li>
            <strong>Next (active development):</strong> Transitioning from
            API-based inference to an in-house Agentic Training
            Pipeline&mdash;building a headless synthetic data generator to
            fine-tune a local Small Language Model (SLM) via LoRA, followed by
            alignment using Direct Preference Optimization (DPO) to maximize
            instruction-following efficiency and reduce latency.
          </li>
        </ul>
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white/80 p-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
