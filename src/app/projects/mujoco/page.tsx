function GitHubIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function MujocoPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="text-3xl font-semibold tracking-tight">
            Dynamic Pole Balancing with Nonlinear MPC
          </h1>
          <a
            href="https://github.com/Ashritha-sai/Model-Predictive-Control-"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            <GitHubIcon />
            View on GitHub
          </a>
        </div>
        <p className="text-slate-600">
          An underactuated dynamic control system using a CasADi-based Nonlinear
          Model Predictive Controller to balance a free-swinging pole on a 7-DOF
          Franka Emika Panda robot.
        </p>
      </header>

      <Section title="Challenge">
        Balancing an unactuated pole on a high-DOF manipulator requires
        real-time optimal control that can handle nonlinear dynamics,
        underactuation, and the tight coupling between end-effector motion and
        pole stability.
      </Section>

      <Section title="What I Built">
        <ul className="list-disc space-y-2 pl-5 text-slate-600">
          <li>
            Engineered a high-fidelity MuJoCo physics simulation featuring a
            Franka Panda manipulator with a free-hinged, unactuated pole
            attached to its end-effector.
          </li>
          <li>
            Formulated the system&apos;s equations of motion using a Linear
            Inverted Pendulum (LIP) approximation to allow for real-time optimal
            control calculations.
          </li>
          <li>
            Developed a receding-horizon Nonlinear Model Predictive Control
            (NMPC) solver from scratch using CasADi to compute optimal
            end-effector accelerations.
          </li>
          <li>
            Implemented an Operational Space Controller (Inverse Dynamics) to
            map the MPC&apos;s Cartesian acceleration commands into precise joint
            torques across the 7-DOF arm at a 500Hz control rate.
          </li>
        </ul>
      </Section>

      <Section title="Key Decisions">
        <ul className="list-disc space-y-2 pl-5 text-slate-600">
          <li>
            <strong>Why NMPC over PID or LQR?</strong> The nonlinear dynamics of
            an inverted pendulum on a moving base require predictive,
            constraint-aware control&mdash;reactive controllers can&apos;t
            anticipate the coupled arm-pole dynamics.
          </li>
          <li>
            <strong>Why Operational Space Control?</strong> Decouples the
            Cartesian-level MPC planning from the joint-level torque execution,
            making the system modular and easier to debug.
          </li>
          <li>
            <strong>Why LIP approximation?</strong> Keeps the optimization
            tractable at 500Hz while capturing the essential pendulum dynamics
            for real-time control.
          </li>
        </ul>
      </Section>

      <Section title="Stack">
        <p className="text-slate-600">
          Python &middot; C++ (MuJoCo backend) &middot; MuJoCo &middot; CasADi
          (IPOPT solver) &middot; NumPy &middot; SciPy &middot; NMPC &middot;
          Operational Space Control &middot; Inverse Dynamics
        </p>
      </Section>

      <Section title="Results &amp; Status">
        <ul className="list-disc space-y-2 pl-5 text-slate-600">
          <li>
            Base physics simulation and unactuated joint modeling are complete.
          </li>
          <li>
            Actively tuning the MPC cost function weights to balance control
            effort against pole angle deviation.
          </li>
          <li>
            <strong>Next milestone:</strong> Implementing Domain Randomization
            (varying pole mass and friction during simulation resets) to prove
            the controller&apos;s robustness for Sim-to-Real transfer.
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
