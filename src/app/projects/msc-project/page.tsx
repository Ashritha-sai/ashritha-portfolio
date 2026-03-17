import Link from "next/link";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-[#262626] bg-[#161616] p-6">
      <h2 className="text-lg font-medium text-[#E0DDD5]">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default function MScProjectPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <Link href="/projects" className="text-sm text-[#4A4A4A] hover:text-[#FF4D00] transition-colors">
        ← Back
      </Link>

      <div className="mt-8">
        <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-display)] text-[#E0DDD5]">
          Neuromorphic Control for Robotic Augmentation
        </h1>
        <p className="text-[#8A8A8A] mt-4 text-lg leading-relaxed">
          EMG–IMU fusion for real-time neuromorphic control under dual-task conditions.
        </p>
        <p className="text-sm font-[family-name:var(--font-mono)] text-[#4A4A4A] mt-2">
          Imperial College London · Jan 2026 – Present
        </p>
      </div>

      <div className="space-y-8 mt-12">
        <Section title="Challenge">
          <p className="text-[#8A8A8A]">
            Robotic augmentation requires seamless integration of biological signals (EMG, IMU) with real-time control systems, especially under cognitive dual-task conditions.
          </p>
        </Section>

        <Section title="Approach">
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-[#8A8A8A]">EMG–IMU sensor fusion pipeline for continuous robotic control.</li>
            <li className="text-[#8A8A8A]">Neuromorphic processing principles for low-latency signal interpretation.</li>
            <li className="text-[#8A8A8A]">Single- vs dual-task performance characterization.</li>
            <li className="text-[#8A8A8A]">Real-time adaptive control loop.</li>
          </ul>
        </Section>

        <Section title="Stack">
          <p className="text-[#8A8A8A]">
            Python · EMG · IMU · Neuromorphic · Signal Processing · Real-time Control
          </p>
        </Section>

        <Section title="Status">
          <p className="text-[#8A8A8A]">
            Ongoing MSc research project at Imperial College London. Core sensor fusion and processing pipeline under development.
          </p>
        </Section>
      </div>
    </div>
  );
}
