function GitHubIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function VLAPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="text-3xl font-semibold tracking-tight">
            VLA-Agent: Language-Conditioned Robotic Manipulation
          </h1>
          <a
            href="https://github.com/Ashritha-sai/VLA-Robot-Agent"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            <GitHubIcon />
            View on GitHub
          </a>
        </div>
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
