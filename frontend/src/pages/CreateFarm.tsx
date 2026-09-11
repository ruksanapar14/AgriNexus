import { useState } from "react";

interface CreateFarmProps {
  onCreated: () => void;
}

export default function CreateFarm({
  onCreated,
}: CreateFarmProps) {
  const [farmName, setFarmName] = useState("");
  const [area, setArea] = useState("10");
  const [soil, setSoil] = useState("Loamy");
  const [crop, setCrop] = useState("Rice");

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <p className="text-sm text-emerald-400">NEW DIGITAL FARM</p>

        <h1 className="mt-2 text-3xl font-bold">
          Create your digital twin
        </h1>

        <p className="mt-2 text-gray-500">
          Enter the current conditions of the real farm.
        </p>
      </div>

      <div className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <div>
          <label className="mb-2 block text-sm text-gray-400">
            Farm Name
          </label>

          <input
            value={farmName}
            onChange={(e) => setFarmName(e.target.value)}
            placeholder="Green Valley Farm"
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-emerald-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Area (hectares)
            </label>

            <input
              type="number"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Soil Type
            </label>

            <select
              value={soil}
              onChange={(e) => setSoil(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#0a1711] px-4 py-3 outline-none"
            >
              <option>Loamy</option>
              <option>Sandy</option>
              <option>Clay</option>
              <option>Black Soil</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-400">
            Crop
          </label>

          <select
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0a1711] px-4 py-3 outline-none"
          >
            <option>Rice</option>
            <option>Wheat</option>
            <option>Maize</option>
            <option>Tomato</option>
            <option>Cotton</option>
          </select>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {[
            ["Soil Moisture", "55%"],
            ["Soil pH", "6.8"],
            ["Nitrogen", "60%"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-xl border border-white/10 bg-black/20 p-4"
            >
              <p className="text-xs text-gray-500">{label}</p>
              <p className="mt-2 text-xl font-semibold">{value}</p>
            </div>
          ))}
        </div>

        <button
          onClick={onCreated}
          className="w-full rounded-xl bg-emerald-500 px-6 py-4 font-semibold text-black transition hover:bg-emerald-400"
        >
          CREATE DIGITAL TWIN →
        </button>
      </div>
    </div>
  );
}