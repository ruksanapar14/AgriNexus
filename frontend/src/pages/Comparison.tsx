import { useState } from "react";
import { Plus, Play, Trash2, Trophy } from "lucide-react";

interface Scenario {
  id: number;
  name: string;
  irrigation: number;
  fertilizer: number;
  rainfall: number;
  weather: string;
  yield?: number;
  cost?: number;
  risk?: string;
}

export default function Comparison() {
  const [scenarios, setScenarios] = useState<Scenario[]>([
    {
      id: 1,
      name: "Current Plan",
      irrigation: 4200,
      fertilizer: 82,
      rainfall: 400,
      weather: "Normal",
    },
    {
      id: 2,
      name: "Water Saving",
      irrigation: 3000,
      fertilizer: 82,
      rainfall: 400,
      weather: "Normal",
    },
    {
      id: 3,
      name: "Drought Plan",
      irrigation: 5000,
      fertilizer: 75,
      rainfall: 200,
      weather: "Drought",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const runComparison = async () => {
    setLoading(true);

    try {
      const updated = await Promise.all(
        scenarios.map(async (scenario) => {
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
                irrigation: scenario.irrigation,
                fertilizer: scenario.fertilizer,
                rainfall: scenario.rainfall,
                weather: scenario.weather,
              }),
            }
          );

          const data = await response.json();

          return {
            ...scenario,
            yield: data.expected_yield,
            cost: data.estimated_cost,
            risk: data.risk,
          };
        })
      );

      setScenarios(updated);
    } catch {
      alert("Backend connection failed");
    } finally {
      setLoading(false);
    }
  };

  const addScenario = () => {
    const id = scenarios.length + 1;

    setScenarios([
      ...scenarios,
      {
        id,
        name: `Strategy ${id}`,
        irrigation: 4000,
        fertilizer: 80,
        rainfall: 400,
        weather: "Normal",
      },
    ]);
  };

  const removeScenario = (id: number) => {
    setScenarios(scenarios.filter((s) => s.id !== id));
  };

  const updateScenario = (
    id: number,
    field: keyof Scenario,
    value: string | number
  ) => {
    setScenarios(
      scenarios.map((s) =>
        s.id === id ? { ...s, [field]: value } : s
      )
    );
  };

  const bestScenario =
    scenarios.filter((s) => s.yield !== undefined).length > 0
      ? scenarios.reduce((best, current) =>
          (current.yield ?? 0) > (best.yield ?? 0)
            ? current
            : best
        )
      : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-emerald-400">
            STRATEGY LAB
          </p>

          <h1 className="mt-1 text-3xl font-bold">
            Compare Strategies
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Compare multiple farming decisions before applying them.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={addScenario}
            className="flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm hover:bg-white/5"
          >
            <Plus size={18} />
            ADD STRATEGY
          </button>

          <button
            onClick={runComparison}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-black hover:bg-emerald-400 disabled:opacity-50"
          >
            <Play size={18} />
            {loading ? "RUNNING..." : "COMPARE"}
          </button>
        </div>
      </div>

      {bestScenario && (
        <div className="flex items-center gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
          <Trophy className="text-emerald-400" />

          <div>
            <p className="text-xs text-emerald-400">
              RECOMMENDED STRATEGY
            </p>

            <p className="font-bold">
              {bestScenario.name} — {bestScenario.yield} t/ha
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-5">
        {scenarios.map((scenario) => (
          <div
            key={scenario.id}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="flex items-center justify-between">
              <input
                value={scenario.name}
                onChange={(e) =>
                  updateScenario(
                    scenario.id,
                    "name",
                    e.target.value
                  )
                }
                className="w-full bg-transparent text-lg font-bold outline-none"
              />

              {scenarios.length > 1 && (
                <button
                  onClick={() => removeScenario(scenario.id)}
                  className="text-gray-500 hover:text-red-400"
                >
                  <Trash2 size={17} />
                </button>
              )}
            </div>

            <div className="mt-5 space-y-4">
              <label className="block text-sm">
                Irrigation (L)
                <input
                  type="number"
                  value={scenario.irrigation}
                  onChange={(e) =>
                    updateScenario(
                      scenario.id,
                      "irrigation",
                      Number(e.target.value)
                    )
                  }
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3 outline-none"
                />
              </label>

              <label className="block text-sm">
                Fertilizer (kg)
                <input
                  type="number"
                  value={scenario.fertilizer}
                  onChange={(e) =>
                    updateScenario(
                      scenario.id,
                      "fertilizer",
                      Number(e.target.value)
                    )
                  }
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3 outline-none"
                />
              </label>

              <label className="block text-sm">
                Rainfall (mm)
                <input
                  type="number"
                  value={scenario.rainfall}
                  onChange={(e) =>
                    updateScenario(
                      scenario.id,
                      "rainfall",
                      Number(e.target.value)
                    )
                  }
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3 outline-none"
                />
              </label>

              <label className="block text-sm">
                Weather

                <select
                  value={scenario.weather}
                  onChange={(e) =>
                    updateScenario(
                      scenario.id,
                      "weather",
                      e.target.value
                    )
                  }
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3 outline-none"
                >
                  <option>Normal</option>
                  <option>Ideal</option>
                  <option>Drought</option>
                  <option>Heavy Rain</option>
                  <option>Heat Wave</option>
                </select>
              </label>
            </div>

            {scenario.yield !== undefined && (
              <div className="mt-5 grid grid-cols-3 gap-2">
                <div className="rounded-lg bg-white/5 p-3">
                  <p className="text-xs text-gray-500">Yield</p>
                  <p className="font-bold">
                    {scenario.yield}
                  </p>
                </div>

                <div className="rounded-lg bg-white/5 p-3">
                  <p className="text-xs text-gray-500">Cost</p>
                  <p className="font-bold">
                    ₹{scenario.cost}
                  </p>
                </div>

                <div className="rounded-lg bg-white/5 p-3">
                  <p className="text-xs text-gray-500">Risk</p>
                  <p className="font-bold">
                    {scenario.risk}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}