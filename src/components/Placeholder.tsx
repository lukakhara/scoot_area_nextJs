import { cn } from '../lib/utils';

export function Placeholder({
  className,
  label,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label ?? "სურათი"}
      className={cn(
        "flex items-center justify-center bg-muted text-xs tracking-widest text-muted-foreground/70 uppercase",
        className,
      )}
    >
      {label ?? "image"}
    </div>
  );
}
