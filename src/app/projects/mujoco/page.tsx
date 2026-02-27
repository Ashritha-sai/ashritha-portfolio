export default function MujocoPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          Dynamic Pole Balancing with Nonlinear MPC
        </h1>
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
