import { useState } from "react";

const zones = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  moisture: Math.floor(35 + Math.random() * 45),
  health: Math.floor(70 + Math.random() * 25),
}));

export default function FarmMap() {
  const [selected, setSelected] = useState(zones[6]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="font-semibold">Digital Farm</h2>
          <p className="text-xs text-gray-500">
            Green Valley • 10 hectares
          </p>
        </div>

        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
          LIVE TWIN
        </span>
      </div>

      <div className="grid grid-cols-6 gap-2">
        {zones.map((zone) => (
          <button
            key={zone.id}
            onClick={() => setSelected(zone)}
            className={`aspect-square rounded-lg border transition hover:scale-105 ${
              selected.id === zone.id
                ? "border-emerald-400 bg-emerald-400/20"
                : zone.moisture < 45
                ? "border-yellow-500/20 bg-yellow-500/10"
                : "border-emerald-500/10 bg-emerald-500/10"
            }`}
          >
            <span className="text-lg">🌱</span>
          </button>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 text-xs">
        <div className="rounded-lg bg-white/5 p-3">
          <p className="text-gray-500">Zone</p>
          <p className="mt-1 font-semibold">#{selected.id}</p>
        </div>

        <div className="rounded-lg bg-white/5 p-3">
          <p className="text-gray-500">Moisture</p>
          <p className="mt-1 font-semibold">{selected.moisture}%</p>
        </div>

        <div className="rounded-lg bg-white/5 p-3">
          <p className="text-gray-500">Crop Health</p>
          <p className="mt-1 font-semibold">{selected.health}%</p>
        </div>
      </div>
    </div>
  );
}
