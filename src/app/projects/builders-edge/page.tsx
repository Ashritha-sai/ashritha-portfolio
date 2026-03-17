import Link from "next/link";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-[#262626] bg-[#161616] p-6">
      <h2 className="text-lg font-medium text-[#E0DDD5]">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default function BuildersEdgePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <Link href="/projects" className="text-sm text-[#4A4A4A] hover:text-[#FF4D00] transition-colors">
        ← Back
      </Link>

      <div className="mt-8">
        <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-display)] text-[#E0DDD5]">
          Builders at Edge — YouTube-to-Robot Training
        </h1>
        <p className="text-[#8A8A8A] mt-4 text-lg leading-relaxed">
          A pipeline for using YouTube videos to train robots. Built and won at the Builders at Edge hackathon.
        </p>
        <p className="text-sm font-[family-name:var(--font-mono)] text-[#4A4A4A] mt-2">
          2026
        </p>
      </div>

      <div className="space-y-8 mt-12">
        <Section title="Challenge">
          <p className="text-[#8A8A8A]">
            Training robots typically requires expensive simulation environments or physical demonstrations. What if we could leverage the vast library of human task demonstrations already on YouTube?
          </p>
        </Section>

        <Section title="Approach">
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-[#8A8A8A]">Built an end-to-end pipeline extracting manipulation demonstrations from YouTube videos.</li>
            <li className="text-[#8A8A8A]">Processed video data into structured training signals for robotic learning.</li>
            <li className="text-[#8A8A8A]">Demonstrated pipeline viability at the Builders at Edge hackathon.</li>
          </ul>
        </Section>

        <Section title="Stack">
          <p className="text-[#8A8A8A]">
            Python · Computer Vision · Video Processing · Robotics
          </p>
        </Section>

        <Section title="Results">
          <p className="text-[#8A8A8A]">
            Won the Builders at Edge hackathon.
          </p>
        </Section>
      </div>
    </div>
  );
}
