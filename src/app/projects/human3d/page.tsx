export default function Human3DPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Human3D</h1>
        <p className="text-slate-600">
          Context-aware 3D reconstruction pipeline that integrates multiple perception modules and enforces plausibility constraints.
        </p>
      </header>

      <Section title="Problem">
        Reconstructing usable 3D human representations from a single image requires combining depth, keypoints, segmentation, and a body model, while handling model disagreement and failure modes.
      </Section>

      <Section title="What I built">
        <ul className="list-disc space-y-2 pl-5 text-slate-600">
          <li>Integrated MiDaS depth, keypoints, and SAM/CLIP segmentation into a single pipeline.</li>
          <li>SMPL/SMPL-X fitting and rendering workflow using PyTorch3D; Blender for evaluation.</li>
          <li>Work-in-progress: differentiable biomechanical constraints (joint limits, bone length, COM stability).</li>
        </ul>
      </Section>

      <Section title="Stack">
        <p className="text-slate-600">
          MiDaS · YOLO · SAM/CLIP · SMPL/SMPL-X · PyTorch3D · Blender
        </p>
      </Section>

      <Section title="Outcome">
        <p className="text-slate-600">
          Built a reproducible end-to-end pipeline and a framework for testing constraints that improve physical plausibility under noisy perception outputs.
        </p>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white/80 p-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
