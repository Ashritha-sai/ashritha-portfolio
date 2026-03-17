import Link from "next/link";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-[#262626] bg-[#161616] p-6">
      <h2 className="text-lg font-medium text-[#E0DDD5]">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default function BiomarkerPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <Link href="/projects" className="text-sm text-[#4A4A4A] hover:text-[#FF4D00] transition-colors">
        ← Back
      </Link>

      <div className="mt-8">
        <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-display)] text-[#E0DDD5]">
          Non-Invasive Biomarker ML System
        </h1>
        <p className="text-[#8A8A8A] mt-4 text-lg leading-relaxed">
          Monte Carlo photon-transport simulation + regression models for biomarker estimation.
        </p>
        <p className="text-sm font-[family-name:var(--font-mono)] text-[#4A4A4A] mt-2">
          Visakhapatnam, India · Aug 2024 – May 2025
        </p>
      </div>

      <div className="space-y-8 mt-12">
        <Section title="Challenge">
          <p className="text-[#8A8A8A]">
            Non-invasive physiological estimation suffers from noisy signals and limited labeled data. Uses physics-based simulation + ML.
          </p>
        </Section>

        <Section title="Implementation">
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-[#8A8A8A]">Generated synthetic optical dataset via <span className="text-[#E0DDD5]">Monte Carlo photon-transport</span>.</li>
            <li className="text-[#8A8A8A]">Built regression models (<span className="text-[#E0DDD5]">RF, MLP, SVR</span>).</li>
            <li className="text-[#8A8A8A]">Signal-processing + feature extraction for noisy spectral data.</li>
          </ul>
        </Section>

        <Section title="Stack">
          <p className="text-[#8A8A8A]">
            Python · Monte Carlo Simulation · RF · MLP · SVR
          </p>
        </Section>

        <Section title="Results">
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-[#8A8A8A]">End-to-end pipeline from simulated spectra to biomarker estimates.</li>
            <li className="text-[#8A8A8A]">Documented validation behavior and robustness limits.</li>
          </ul>
        </Section>
      </div>
    </div>
  );
}
