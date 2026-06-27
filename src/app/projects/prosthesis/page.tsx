import Link from "next/link";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-[#262626] bg-[#161616] p-6">
      <h2 className="text-lg font-medium text-[#E0DDD5]">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default function ProsthesisPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <Link href="/projects" className="text-sm text-[#4A4A4A] hover:text-[#FF4D00] transition-colors">
        ← Back
      </Link>

      <div className="mt-8">
        <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-display)] text-[#E0DDD5]">
          Adaptive Prosthesis Control: Hackathon Winner
        </h1>
        <p className="text-[#8A8A8A] mt-4 text-lg leading-relaxed">
          EEG-driven control with stabilised real-time servo execution.
        </p>
        <p className="text-sm font-[family-name:var(--font-mono)] text-[#4A4A4A] mt-2">
          Visakhapatnam, India · Oct 2023 – May 2024
        </p>
      </div>

      <div className="space-y-8 mt-12">
        <Section title="Challenge">
          <p className="text-[#8A8A8A]">
            BCI signals are noisy but prosthetic control needs reliable commands. System focuses on robust preprocessing and stabilised actuation.
          </p>
        </Section>

        <Section title="Implementation">
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-[#8A8A8A]">EEG preprocessing/artifact removal/gesture classification.</li>
            <li className="text-[#8A8A8A]">Real-time servo control for multi-gesture movements.</li>
            <li className="text-[#8A8A8A]">Stabilisation layer for noise-suppressed command execution.</li>
          </ul>
        </Section>

        <Section title="Stack">
          <p className="text-[#8A8A8A]">
            Python · Signal Processing · EEG · Embedded Control
          </p>
        </Section>

        <Section title="Results">
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-[#8A8A8A]"><span className="text-[#E0DDD5]">Winner:</span> Smart India Hackathon (Hardware Edition).</li>
            <li className="text-[#8A8A8A]">Reliable gesture-to-actuation mapping under noise.</li>
          </ul>
        </Section>
      </div>
    </div>
  );
}
