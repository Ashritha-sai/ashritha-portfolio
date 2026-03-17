import Link from "next/link";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-[#262626] bg-[#161616] p-6">
      <h2 className="text-lg font-medium text-[#E0DDD5]">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default function MujocoPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <Link href="/projects" className="text-sm text-[#4A4A4A] hover:text-[#FF4D00] transition-colors">
        ← Back
      </Link>

      <div className="mt-8">
        <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-display)] text-[#E0DDD5]">
          Dynamic Pole Balancing with NMPC
        </h1>
        <p className="text-[#8A8A8A] mt-4 text-lg leading-relaxed">
          Underactuated control using CasADi-based NMPC on a 7-DOF Franka Emika Panda.
        </p>
        <p className="text-sm font-[family-name:var(--font-mono)] text-[#4A4A4A] mt-2">
          London, UK · Feb 2026 – Present
        </p>
      </div>

      <div className="space-y-8 mt-12">
        <Section title="Challenge">
          <p className="text-[#8A8A8A]">
            Balancing an unactuated pole on a high-DOF manipulator requires real-time optimal control handling nonlinear dynamics, underactuation, and tight coupling.
          </p>
        </Section>

        <Section title="Implementation">
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-[#8A8A8A]">High-fidelity <span className="text-[#E0DDD5]">MuJoCo simulation</span> with free-hinged unactuated pole.</li>
            <li className="text-[#8A8A8A]">LIP approximation for real-time optimal control.</li>
            <li className="text-[#8A8A8A]">NMPC solver from scratch with <span className="text-[#E0DDD5]">CasADi</span>.</li>
            <li className="text-[#8A8A8A]">Operational Space Controller mapping Cartesian accelerations to joint torques at <span className="text-[#E0DDD5]">500Hz</span>.</li>
          </ul>
        </Section>

        <Section title="Stack">
          <p className="text-[#8A8A8A]">
            Python · C++ · MuJoCo · CasADi · IPOPT · NumPy · SciPy
          </p>
        </Section>

        <Section title="Status">
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-[#8A8A8A]">Base simulation complete.</li>
            <li className="text-[#8A8A8A]">Tuning MPC cost function weights.</li>
            <li className="text-[#8A8A8A]"><span className="text-[#E0DDD5]">Next:</span> domain randomization for sim-to-real transfer.</li>
          </ul>
        </Section>
      </div>
    </div>
  );
}
