import Link from "next/link";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-[#262626] bg-[#161616] p-6">
      <h2 className="text-lg font-medium text-[#E0DDD5]">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default function VlaSiliconPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <Link href="/projects" className="text-sm text-[#4A4A4A] hover:text-[#FF4D00] transition-colors">
        ← Back
      </Link>

      <div className="mt-8">
        <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-display)] text-[#E0DDD5]">
          VLA Action Heads on Humanoid Silicon
        </h1>
        <p className="text-[#8A8A8A] mt-4 text-lg leading-relaxed">
          On-silicon study on the Jetson AGX Thor. Flow vs AR across latency, DoF, quantization, and energy.
        </p>
        <p className="text-sm font-[family-name:var(--font-mono)] text-[#4A4A4A] mt-2">
          London, UK · Targeting IEEE-RAS Humanoids 2026
        </p>
      </div>

      <div className="space-y-8 mt-12">
        <Section title="Challenge">
          <p className="text-[#8A8A8A]">
            VLA action-head inference is always benchmarked on data-center GPUs, yet no humanoid carries one, and onboard feasibility isn&apos;t captured by a single latency number.
          </p>
        </Section>

        <Section title="Approach">
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-[#8A8A8A]">On-silicon latency, power, and thermal harness on the Jetson AGX Thor.</li>
            <li className="text-[#8A8A8A]">Controlled flow-matching (π0) vs FAST-autoregressive (π0-FAST) heads, identical PaliGemma-3B backbone.</li>
            <li className="text-[#8A8A8A]">DoF scaling sweep and paradigm-dependent quantization (FP8/FP4) characterization.</li>
            <li className="text-[#8A8A8A]">Closed-loop chunk-budget stability test in MuJoCo, driven by real latency traces.</li>
          </ul>
        </Section>

        <Section title="Stack">
          <p className="text-[#8A8A8A]">
            Python · PyTorch · TensorRT · Jetson Thor · LeRobot · MuJoCo · CUDA
          </p>
        </Section>

        <Section title="Status">
          <p className="text-[#8A8A8A]">
            Ongoing research targeting IEEE-RAS Humanoids 2026. Measurement harness and quantization characterization complete; closed-loop stability experiment in progress.
          </p>
        </Section>
      </div>
    </div>
  );
}
