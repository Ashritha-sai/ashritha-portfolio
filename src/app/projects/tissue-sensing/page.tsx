import Link from "next/link";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-[#262626] bg-[#161616] p-6">
      <h2 className="text-lg font-medium text-[#E0DDD5]">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default function TissueSensingPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <Link href="/projects" className="text-sm text-[#4A4A4A] hover:text-[#FF4D00] transition-colors">
        ← Back
      </Link>

      <div className="mt-8">
        <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-display)] text-[#E0DDD5]">
          Physics-Grounded Active Sensing for Tissue Characterization
        </h1>
        <p className="text-[#8A8A8A] mt-4 text-lg leading-relaxed">
          Spectroscopic sensing as a POMDP over a Kubelka-Munk model, choosing where to measure next.
        </p>
        <p className="text-sm font-[family-name:var(--font-mono)] text-[#4A4A4A] mt-2">
          Accepted at ACM BCB 2025
        </p>
      </div>

      <div className="space-y-8 mt-12">
        <Section title="Challenge">
          <p className="text-[#8A8A8A]">
            Optical spectroscopy can read tissue properties without cutting into anything, but it&apos;s measurement-hungry. Scan blindly and you waste most of your readings on points that tell you nothing, with no principled way to decide where to look next.
          </p>
        </Section>

        <Section title="Approach">
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-[#8A8A8A]">Frame &quot;where to measure next&quot; as a POMDP over a Kubelka-Munk optical model of the tissue.</li>
            <li className="text-[#8A8A8A]">Use the physics-grounded forward model instead of a black-box map from spectra to tissue state.</li>
            <li className="text-[#8A8A8A]">Drive an active-sensing policy that picks each next measurement to cut the most uncertainty.</li>
            <li className="text-[#8A8A8A]">Benchmark five decision agents head-to-head on sample efficiency.</li>
          </ul>
        </Section>

        <Section title="Stack">
          <p className="text-[#8A8A8A]">
            Python · Kubelka-Munk · POMDP · Active Sensing · Spectroscopy
          </p>
        </Section>

        <Section title="Status">
          <p className="text-[#8A8A8A]">
            Accepted at ACM BCB 2025. Extended version under review at TMLR.
          </p>
        </Section>
      </div>
    </div>
  );
}
