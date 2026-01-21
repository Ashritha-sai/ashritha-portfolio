export default function Human3DPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Human3D</h1>
        <p className="text-slate-600">
          Context-aware 3D reconstruction pipeline that integrates multiple perception modules and enforces plausibility constraints.
        </p>
      </header>

      <Section title="Challenge">
        Reconstructing usable 3D human representations from a single image requires combining depth, keypoints, segmentation, and a body model—while handling model disagreement, occlusion, and failure modes gracefully.
      </Section>

      <Section title="Approach">
        <ul className="list-disc space-y-2 pl-5 text-slate-600">
          <li>Integrated MiDaS depth, keypoint detection, and SAM/CLIP segmentation into a unified pipeline with explicit failure handling.</li>
          <li>Built SMPL/SMPL-X fitting and rendering workflow using PyTorch3D; Blender for ground-truth evaluation.</li>
          <li>Work-in-progress: differentiable biomechanical constraints (joint limits, bone length, COM stability) to enforce physical plausibility.</li>
        </ul>
      </Section>

      <Section title="Key Decisions">
        <ul className="list-disc space-y-2 pl-5 text-slate-600">
          <li><strong>Why constraints over end-to-end learning?</strong> Pure learning approaches fail silently on out-of-distribution poses; explicit constraints surface failures and enable debugging.</li>
          <li><strong>Why multiple perception modules?</strong> Each module fails differently—combining them with explicit disagreement detection improves robustness.</li>
        </ul>
      </Section>

      <Section title="Stack">
        <p className="text-slate-600">
          MiDaS · YOLO · SAM/CLIP · SMPL/SMPL-X · PyTorch3D · Blender
        </p>
      </Section>

      <Section title="Results">
        <ul className="list-disc space-y-2 pl-5 text-slate-600">
          <li>Reproducible end-to-end pipeline with documented failure modes.</li>
          <li>Framework for testing biomechanical constraints that improve physical plausibility under noisy perception.</li>
          <li>Manuscript under submission to CVWW 2026; extended version in preparation for CRV 2026.</li>
        </ul>
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
