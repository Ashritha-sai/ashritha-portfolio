export default function Human3DPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          Human3D: Single-Shot 3D Gaussian Splatting Engine
        </h1>
        <p className="text-slate-600">
          An end-to-end 3D reconstruction pipeline that converts a single 2D RGB
          image into a view-consistent 3D representation using differentiable
          Gaussian rasterization.
        </p>
      </header>

      <Section title="Challenge">
        Deterministic 2.5D point-cloud projection produces hollow,
        view-inconsistent reconstructions. A generative approach using 3D
        Gaussian Splatting with smart initialization solves the cold-start
        problem and produces dense, renderable 3D assets.
      </Section>

      <Section title="The Pivot">
        <p className="text-slate-600">
          Upgraded a legacy deterministic 2.5D point-cloud projection system
          into a fully generative 3D Gaussian Splatting pipeline. The original
          perception stack (YOLOv8, SAM, MiDaS depth) was repurposed to create
          clean RGB-D priors that solve the cold-start initialization problem for
          the Gaussians.
        </p>
      </Section>

      <Section title="What I Built">
        <ul className="list-disc space-y-2 pl-5 text-slate-600">
          <li>
            <strong>Smart Initialization:</strong> Leveraged YOLOv8, SAM, and
            MiDaS depth estimation to create clean RGB-D priors, solving the
            cold-start initialization problem for the Gaussians.
          </li>
          <li>
            <strong>Custom Optimization Loop:</strong> Engineered a PyTorch
            training loop from scratch featuring adaptive densification (cloning
            and splitting Gaussians) to resolve fine geometric details.
          </li>
          <li>
            <strong>High-Performance Rendering:</strong> Integrated a
            differentiable GPU rasterization backend using the gsplat library,
            utilizing Mixed Precision (AMP) to significantly accelerate
            training.
          </li>
        </ul>
      </Section>

      <Section title="Key Decisions">
        <ul className="list-disc space-y-2 pl-5 text-slate-600">
          <li>
            <strong>Why Gaussian Splatting over NeRF?</strong> Explicit 3D
            Gaussians are faster to optimize, support real-time rendering, and
            produce exportable assets&mdash;unlike implicit neural
            representations.
          </li>
          <li>
            <strong>Why reuse the perception stack?</strong> YOLOv8 + SAM +
            MiDaS provide high-quality RGB-D priors for free, turning a
            cold-start problem into a warm-start advantage.
          </li>
          <li>
            <strong>Why adaptive densification?</strong> Uniform Gaussian
            distributions miss fine details; adaptive cloning and splitting
            focuses representational capacity where the geometry demands it.
          </li>
        </ul>
      </Section>

      <Section title="Stack">
        <p className="text-slate-600">
          PyTorch 2.x &middot; CUDA (v13.1) &middot; gsplat &middot; Spherical
          Harmonics &middot; Pinhole Camera Models &middot; MiDaS &middot; SAM
          &middot; YOLOv8 &middot; Mixed Precision (AMP) &middot; GradScaler
          &middot; L1 + SSIM loss
        </p>
      </Section>

      <Section title="Results &amp; Status">
        <ul className="list-disc space-y-2 pl-5 text-slate-600">
          <li>
            Optimized 10K+ Gaussians in under 20 seconds on consumer hardware
            (RTX 3050), achieving ~26dB PSNR.
          </li>
          <li>Real-time rendering at ~200 FPS (5 ms).</li>
          <li>
            Pipeline exports binary PLY assets fully compatible with standard
            browser-based 3D splat viewers.
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
