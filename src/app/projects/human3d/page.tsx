function GitHubIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function Human3DPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="text-3xl font-semibold tracking-tight">
            Human3D: Single-Shot 3D Gaussian Splatting Engine
          </h1>
          <a
            href="https://github.com/Ashritha-sai/Human3D---Reconstruction"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            <GitHubIcon />
            View on GitHub
          </a>
        </div>
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
