import Link from "next/link";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-[#262626] bg-[#161616] p-6">
      <h2 className="text-lg font-medium text-[#E0DDD5]">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default function Human3DPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <Link href="/projects" className="text-sm text-[#4A4A4A] hover:text-[#FF4D00] transition-colors">
        ← Back
      </Link>

      <div className="mt-8">
        <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-display)] text-[#E0DDD5]">
          Human3D — 3D Gaussian Splatting Engine
        </h1>
        <p className="text-[#8A8A8A] mt-4 text-lg leading-relaxed">
          End-to-end 3D reconstruction converting a single 2D RGB image into a view-consistent 3D representation.
        </p>
        <p className="text-sm font-[family-name:var(--font-mono)] text-[#4A4A4A] mt-2">
          London, UK · 2025 – Present
        </p>
      </div>

      <div className="space-y-8 mt-12">
        <Section title="Challenge">
          <p className="text-[#8A8A8A]">
            Deterministic 2.5D point-cloud projection produces hollow, view-inconsistent reconstructions. Need generative approach with 3D Gaussian Splatting.
          </p>
        </Section>

        <Section title="Implementation">
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-[#8A8A8A]">Upgraded legacy 2.5D system to generative 3DGS pipeline.</li>
            <li className="text-[#8A8A8A]">Leveraged <span className="text-[#E0DDD5]">YOLOv8/SAM/MiDaS</span> for RGB-D priors (cold-start fix).</li>
            <li className="text-[#8A8A8A]">Built PyTorch training loop with adaptive densification.</li>
            <li className="text-[#8A8A8A]">Integrated differentiable GPU rasterization via <span className="text-[#E0DDD5]">gsplat</span> with Mixed Precision.</li>
          </ul>
        </Section>

        <Section title="Stack">
          <p className="text-[#8A8A8A]">
            PyTorch 2.x · CUDA · gsplat · MiDaS · SAM · YOLOv8 · AMP
          </p>
        </Section>

        <Section title="Results">
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-[#8A8A8A]"><span className="text-[#E0DDD5]">10K+ Gaussians</span> optimized in under 20s (RTX 3050, ~26dB PSNR).</li>
            <li className="text-[#8A8A8A]">Real-time rendering at <span className="text-[#E0DDD5]">~200 FPS</span> (5ms).</li>
            <li className="text-[#8A8A8A]">Exports binary PLY for browser-based viewers.</li>
          </ul>
        </Section>
      </div>
    </div>
  );
}
