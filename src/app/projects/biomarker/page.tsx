export default function BiomarkerPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Non-invasive biomarker ML system (Thesis)</h1>
        <p className="text-slate-600">
          Signal-to-prediction pipeline under noisy, low-data constraints using synthetic dataset generation and regression models.
        </p>
      </header>

      <Section title="Problem">
        In low-data biomedical settings, predictive models often fail due to noise, confounds, and limited ground truth. The goal was to estimate haemoglobin and glucose from optical/spectral signals.
      </Section>

      <Section title="What I built">
        <ul className="list-disc space-y-2 pl-5 text-slate-600">
          <li>Generated synthetic optical datasets via Monte Carlo photon-transport simulation.</li>
          <li>Implemented preprocessing + feature extraction for noisy spectral inputs.</li>
          <li>Trained and compared RF / MLP / SVR regressors; validated on a small experimental dataset.</li>
        </ul>
      </Section>

      <Section title="Stack">
        <p className="text-slate-600">
          Monte Carlo simulation · Signal processing · ML regression (RF/MLP/SVR)
        </p>
      </Section>

      <Section title="Outcome">
        <p className="text-slate-600">
          Built an end-to-end pipeline with synthetic-to-real validation and documented constraints and failure modes for future iteration.
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
