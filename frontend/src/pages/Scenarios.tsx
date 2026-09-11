import { useState } from "react";
import {
  Droplets,
  FlaskConical,
  CloudRain,
  Thermometer,
  Play,
  RotateCcw,
} from "lucide-react";

export default function Scenarios() {
  const [irrigation, setIrrigation] = useState(4200);
  const [fertilizer, setFertilizer] = useState(82);
  const [rainfall, setRainfall] = useState(400);
  const [weather, setWeather] = useState("Normal");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const runScenario = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/simulate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            crop: "Rice",
            soil: "Loamy",
            irrigation,
            fertilizer,
            rainfall,
            weather,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Simulation failed");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert("Backend connection failed");
    } finally {
      setLoading(false);
    }
  };

  const resetScenario = () => {
    setIrrigation(4200);
    setFertilizer(82);
    setRainfall(400);
    setWeather("Normal");
    setResult(null);
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <p className="text-sm font-medium text-emerald-400">
          WHAT-IF ENGINE
        </p>

        <h1 className="mt-1 text-3xl font-bold">
          Scenario Simulator
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Change farming conditions and compare possible outcomes.
        </p>
      </div>

      {/* CONTROLS */}
      <div className="grid grid-cols-2 gap-6">

        {/* IRRIGATION */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-center gap-3">
            <Droplets className="text-emerald-400" />

            <div>
              <h2 className="font-semibold">
                Irrigation
              </h2>

              <p className="text-xs text-gray-500">
                Water applied to the crop
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <span className="text-2xl font-bold">
              {irrigation} L
            </span>
          </div>

          <input
            type="range"
            min="1000"
            max="7000"
            step="100"
            value={irrigation}
            onChange={(e) =>
              setIrrigation(Number(e.target.value))
            }
            className="mt-5 w-full accent-emerald-400"
          />

          <div className="mt-2 flex justify-between text-xs text-gray-500">
            <span>1,000 L</span>
            <span>7,000 L</span>
          </div>
        </div>

        {/* FERTILIZER */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-center gap-3">
            <FlaskConical className="text-emerald-400" />

            <div>
              <h2 className="font-semibold">
                Fertilizer
              </h2>

              <p className="text-xs text-gray-500">
                Nutrient application
              </p>
            </div>
          </div>

          <div className="mt-6">
            <span className="text-2xl font-bold">
              {fertilizer} kg
            </span>
          </div>

          <input
            type="range"
            min="20"
            max="150"
            step="1"
            value={fertilizer}
            onChange={(e) =>
              setFertilizer(Number(e.target.value))
            }
            className="mt-5 w-full accent-emerald-400"
          />

          <div className="mt-2 flex justify-between text-xs text-gray-500">
            <span>20 kg</span>
            <span>150 kg</span>
          </div>
        </div>

        {/* RAINFALL */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-center gap-3">
            <CloudRain className="text-emerald-400" />

            <div>
              <h2 className="font-semibold">
                Rainfall
              </h2>

              <p className="text-xs text-gray-500">
                Expected rainfall
              </p>
            </div>
          </div>

          <div className="mt-6">
            <span className="text-2xl font-bold">
              {rainfall} mm
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={rainfall}
            onChange={(e) =>
              setRainfall(Number(e.target.value))
            }
            className="mt-5 w-full accent-emerald-400"
          />

          <div className="mt-2 flex justify-between text-xs text-gray-500">
            <span>0 mm</span>
            <span>1,000 mm</span>
          </div>
        </div>

        {/* WEATHER */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-center gap-3">
            <Thermometer className="text-emerald-400" />

            <div>
              <h2 className="font-semibold">
                Weather Scenario
              </h2>

              <p className="text-xs text-gray-500">
                Simulate different conditions
              </p>
            </div>
          </div>

          <select
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
            className="mt-6 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
          >
            <option value="Normal">Normal</option>
            <option value="Ideal">Ideal</option>
            <option value="Drought">Drought</option>
            <option value="Heavy Rain">Heavy Rain</option>
            <option value="Heat Wave">Heat Wave</option>
          </select>
        </div>

      </div>

      {/* ACTIONS */}
      <div className="flex gap-3">

        <button
          onClick={runScenario}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400 disabled:opacity-50"
        >
          <Play size={18} />

          {loading
            ? "SIMULATING..."
            : "RUN SCENARIO"}
        </button>

        <button
          onClick={resetScenario}
          className="flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-sm font-medium hover:bg-white/5"
        >
          <RotateCcw size={17} />

          RESET
        </button>

      </div>

      {/* RESULT */}
      {result && (
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">

          <p className="text-xs font-semibold tracking-wider text-emerald-400">
            SCENARIO RESULT
          </p>

          <h2 className="mt-1 text-2xl font-bold">
            Projected Farm Outcome
          </h2>

          <div className="mt-5 grid grid-cols-4 gap-4">

            <div className="rounded-xl bg-white/5 p-4">
              <p className="text-xs text-gray-500">
                Expected Yield
              </p>

              <p className="mt-2 text-2xl font-bold">
                {result.expected_yield} t/ha
              </p>
            </div>

            <div className="rounded-xl bg-white/5 p-4">
              <p className="text-xs text-gray-500">
                Water
              </p>

              <p className="mt-2 text-2xl font-bold">
                {result.water_used} L
              </p>
            </div>

            <div className="rounded-xl bg-white/5 p-4">
              <p className="text-xs text-gray-500">
                Cost
              </p>

              <p className="mt-2 text-2xl font-bold">
                ₹{result.estimated_cost}
              </p>
            </div>

            <div className="rounded-xl bg-white/5 p-4">
              <p className="text-xs text-gray-500">
                Risk
              </p>

              <p className="mt-2 text-2xl font-bold text-emerald-400">
                {result.risk}
              </p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}