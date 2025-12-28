export function Section({
  title,
  children,
  id
}: {
  title?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="py-12">
      <div className="mx-auto w-full max-w-5xl px-6">
        {title ? <h2 className="text-2xl font-semibold tracking-tight">{title}</h2> : null}
        <div className={title ? "mt-6" : ""}>{children}</div>
      </div>
    </section>
  );
}
