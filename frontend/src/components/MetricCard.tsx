import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
}

export default function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
}: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-400">{title}</p>

        <div className="rounded-lg bg-emerald-500/10 p-2">
          <Icon size={18} className="text-emerald-400" />
        </div>
      </div>

      <h3 className="text-2xl font-bold">{value}</h3>

      {subtitle && (
        <p className="mt-1 text-xs text-gray-500">{subtitle}</p>
      )}
    </div>
  );
}