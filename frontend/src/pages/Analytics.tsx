import {
  TrendingUp,
  Droplets,
  Sprout,
  IndianRupee,
} from "lucide-react";

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-emerald-400">
          FARM INTELLIGENCE
        </p>

        <h1 className="mt-1 text-3xl font-bold">
          Analytics
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Performance insights from your digital farm twin.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <TrendingUp className="text-emerald-400" />
          <p className="mt-5 text-sm text-gray-500">
            Yield Efficiency
          </p>
          <p className="mt-1 text-3xl font-bold">94%</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <Droplets className="text-emerald-400" />
          <p className="mt-5 text-sm text-gray-500">
            Water Efficiency
          </p>
          <p className="mt-1 text-3xl font-bold">81%</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <Sprout className="text-emerald-400" />
          <p className="mt-5 text-sm text-gray-500">
            Crop Health
          </p>
          <p className="mt-1 text-3xl font-bold">92%</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <IndianRupee className="text-emerald-400" />
          <p className="mt-5 text-sm text-gray-500">
            Cost Efficiency
          </p>
          <p className="mt-1 text-3xl font-bold">87%</p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-lg font-bold">
          Farm Performance
        </h2>

        <div className="mt-8 space-y-6">
          {[
            ["Yield", 94],
            ["Water", 81],
            ["Fertilizer", 87],
            ["Crop Health", 92],
            ["Resource Efficiency", 89],
          ].map(([name, value]) => (
            <div key={name as string}>
              <div className="mb-2 flex justify-between text-sm">
                <span>{name as string}</span>
                <span className="text-emerald-400">
                  {value}%
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}