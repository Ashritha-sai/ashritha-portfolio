export function TagPill({ label }: { label: string }) {
  return (
    <span className="rounded-full border px-3 py-1 text-sm text-zinc-700 dark:text-zinc-200">
      {label}
    </span>
  );
}
