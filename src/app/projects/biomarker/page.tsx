export default function BiomarkerPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Non-Invasive Biomarker Prediction</h1>
        <p className="text-slate-600">
          Signal-to-prediction pipeline for estimating blood parameters under noisy, low-data constraints. Undergraduate thesis.
        </p>
      </header>

      <Section title="Challenge">
        In low-data biomedical settings, predictive models often fail due to noise, confounds, and limited ground truth. The goal was to estimate haemoglobin and glucose concentrations from optical/spectral signals without invasive sampling.
      </Section>

      <Section title="Approach">
        <ul className="list-disc space-y-2 pl-5 text-slate-600">
          <li>Generated synthetic optical datasets via Monte Carlo photon-transport simulation with physiologically grounded parameters.</li>
          <li>Built preprocessing pipeline with feature extraction for noisy spectral inputs.</li>
          <li>Trained and compared RF / MLP / SVR regressors; validated on small experimental dataset to assess synthetic-to-real transfer.</li>
        </ul>
      </Section>

      <Section title="Key Decisions">
        <ul className="list-disc space-y-2 pl-5 text-slate-600">
          <li><strong>Why synthetic data?</strong> Real paired data (optical signal + blood test) is expensive and limited; Monte Carlo simulation provides unlimited training data with known ground truth.</li>
          <li><strong>Why compare multiple regressors?</strong> No single model dominates in low-data regimes; systematic comparison reveals which inductive biases help under specific noise conditions.</li>
        </ul>
      </Section>

      <Section title="Stack">
        <p className="text-slate-600">
          Monte Carlo simulation · Signal processing · ML regression (RF/MLP/SVR) · Python
        </p>
      </Section>

      <Section title="Results">
        <ul className="list-disc space-y-2 pl-5 text-slate-600">
          <li>End-to-end pipeline with synthetic-to-real validation framework.</li>
          <li>Documented domain shift between synthetic and real data; identified key failure modes.</li>
          <li>Presented at Scientific Undergraduate Research Conference (May 2025).</li>
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
