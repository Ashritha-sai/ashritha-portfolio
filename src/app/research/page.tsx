export default function ResearchPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Research</h1>
        <p className="max-w-3xl text-neutral-300">
          Work across biomechanics, signal processing, and ML systems. I focus on building pipelines
          that expose assumptions and failure modes, and I like projects where the “messy middle”
          (data + constraints + implementation) matters.
        </p>
      </header>

      <Card
        title="IIT Jodhpur — Physics-informed ML (May 2025 – Aug 2025)"
        subtitle="Filtering, stability analysis, and feature extraction for trajectory consistency"
      >
        <ul className="list-disc space-y-2 pl-5 text-neutral-300">
          <li>
            Implemented Kalman + complementary filtering to suppress drift/noise in trajectory tracking, improving temporal consistency under variation.
          </li>
          <li>
            Analysed stability and failure modes across subjects and movement conditions; documented where inference breaks under noise and drift.
          </li>
          <li>
            Extracted spatiotemporal features (symmetry, curvature, jerk) for early-stage motor-pattern analysis and anomaly detection.
          </li>
        </ul>

        <Meta
          items={[
            ["Focus", "Signal stabilisation + interpretable features"],
            ["What I learned", "When adding complexity doesn’t improve inference; failure-mode driven iteration"],
          ]}
        />
      </Card>

      <Card
        title="IIT Kanpur — Human-in-the-loop Systems (Oct 2024 – Apr 2025)"
        subtitle="OpenSim inverse kinematics + dynamics pipeline and biomechanical feature engineering"
      >
        <ul className="list-disc space-y-2 pl-5 text-neutral-300">
          <li>
            Built inverse kinematics + inverse dynamics pipeline using OpenSim to estimate joint angles, torques, and COM trajectories.
          </li>
          <li>
            Engineered biomechanical features for downstream modelling (joint-angle evolution, torque envelopes, gait segmentation).
          </li>
          <li>
            Designed cross-subject comparisons to study robustness and variability in force distribution and inferred parameters.
          </li>
        </ul>

        <Meta
          items={[
            ["Focus", "Biomechanics pipelines + feature engineering"],
            ["What I learned", "Model assumptions matter as much as accuracy; robustness across subjects is the real test"],
          ]}
        />
      </Card>
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h3 className="text-lg font-semibold">
          Neuroscience Lab Work <span className="text-neutral-400">(Oct 2023 – Apr 2024)</span>
        </h3>

        <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-300">
          <li>
            Supporting ongoing neuroscience research with hands-on cell culture and experimental workflows.
          </li>
          <li>
            Developing a custom animal-tracking software pipeline as a parallel research project.
          </li>
        </ul>
      </section>

      <Card
        title="IASc–INSA–NASI SRFP — Skin scaffold fabrication study (May 2024 – Jul 2024)"
        subtitle="Comparative in vitro analysis of scaffold fabrication techniques for skin graft applications"
      >
        <ul className="list-disc space-y-2 pl-5 text-neutral-300">
          <li>
            Worked on: <span className="text-neutral-100 font-medium">
              “Comparative in vitro Analysis of Scaffold Fabrication Techniques for Skin Graft Applications using Chitosan and Polyvinyl Alcohol”
            </span>
          </li>
          <li>
            Fabricated scaffolds using three different techniques within a short timeframe and compared outcomes to identify the most suitable approach.
          </li>
          <li>
            Identified freeze drying as the optimal technique for scaffold production in this study context.
          </li>
          <li>
            Built confidence in scaffold characterisation and analysis; strengthened independent learning and problem-solving under time constraints.
          </li>
        </ul>

        <Meta
          items={[
            ["Contact", "Prof. Kantesh Balani (IIT Kanpur) · kbalani@iitk.ac.in"],
          ]}
        />
      </Card>

      <Card
        title="JNCASR SRFP — Drosophila microbiome + development study (Jun 2023 – Aug 2023)"
        subtitle="Developmental and morphological analysis under dietary variation; wet-lab standardisation"
      >
        <ul className="list-disc space-y-2 pl-5 text-neutral-300">
          <li>
            Studied the effect of feeding different rice varieties to <span className="italic">Drosophila melanogaster</span> and measured development rate from egg to adult.
          </li>
          <li>
            Assisted in standardising fly DNA extraction protocols for microbiome experiments.
          </li>
          <li>
            Learned to operate PCR and electrophoresis workflows as part of wet-lab execution.
          </li>
          <li>
            Analysed how microbiota of malnourished flies could affect fecundity when fed traditional rice varieties (morphological + developmental angle).
          </li>
        </ul>

        <Meta
          items={[
            ["Contact", "Dr. Megha (TDU, Bengaluru) · megha@tdu.edu.in"],
          ]}
        />
      </Card>
    </div>
  );
}

function Card({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      {subtitle ? <p className="mt-1 text-sm text-neutral-400">{subtitle}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Meta({ items }: { items: Array<[string, string]> }) {
  return (
    <div className="mt-5 grid gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm">
      {items.map(([k, v]) => (
        <div key={k} className="flex flex-col gap-1 md:flex-row md:gap-3">
          <div className="w-28 flex-shrink-0 text-neutral-400">{k}</div>
          <div className="text-neutral-300">{v}</div>
        </div>
      ))}
    </div>
  );
}
