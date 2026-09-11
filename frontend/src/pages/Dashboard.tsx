import { useState } from "react";
import {
  Droplets,
  FlaskConical,
  IndianRupee,
  Sprout,
  AlertTriangle,
  CloudSun,
  Play,
} from "lucide-react";

import MetricCard from "../components/MetricCard";
import FarmMap from "../components/FarmMap";

interface SimulationResult {
  expected_yield: number;
  water_used: number;
  fertilizer_used: number;
  estimated_cost: number;
  risk: string;
  weather: string;
  is_simulation: boolean;
}

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [simulationResult, setSimulationResult] =
    useState<SimulationResult | null>(null);

  const runSimulation = async () => {
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
            irrigation: 4200,
            fertilizer: 82,
            rainfall: 400,
            weather: "Normal",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Simulation failed");
      }

      const data: SimulationResult = await response.json();

      setSimulationResult(data);
    } catch (error) {
      console.error(error);
      alert("Backend connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <p className="text-sm font-medium text-emerald-400">
          COMMAND CENTER
        </p>

        <div className="mt-1 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Green Valley Farm
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Rice • 10 hectares • Loamy soil
            </p>
          </div>

          <button
            onClick={runSimulation}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Play size={18} />

            {loading
              ? "SIMULATING..."
              : "RUN SIMULATION"}
          </button>
        </div>
      </div>

      {/* STATUS */}
      <div className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />

          <span className="text-sm text-emerald-300">
            {simulationResult
              ? "SIMULATION COMPLETE"
              : "SIMULATION READY"}
          </span>
        </div>

        <span className="text-xs text-gray-500">
          Digital twin engine online
        </span>
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-5 gap-4">

        <MetricCard
          title="Expected Yield"
          value={
            simulationResult
              ? `${simulationResult.expected_yield} t/ha`
              : "4.8 t/ha"
          }
          subtitle="Simulated estimate"
          icon={Sprout}
        />

        <MetricCard
          title="Water Used"
          value={
            simulationResult
              ? `${simulationResult.water_used} L`
              : "4,200 L"
          }
          subtitle="Irrigation requirement"
          icon={Droplets}
        />

        <MetricCard
          title="Fertilizer"
          value={
            simulationResult
              ? `${simulationResult.fertilizer_used} kg`
              : "82 kg"
          }
          subtitle="Optimized"
          icon={FlaskConical}
        />

        <MetricCard
          title="Estimated Cost"
          value={
            simulationResult
              ? `₹${simulationResult.estimated_cost}`
              : "₹16,800"
          }
          subtitle="Per simulated cycle"
          icon={IndianRupee}
        />

        <MetricCard
          title="Risk"
          value={
            simulationResult
              ? simulationResult.risk
              : "LOW"
          }
          subtitle="Under current scenario"
          icon={AlertTriangle}
        />

      </div>

      {/* FARM + WEATHER */}
      <div className="grid grid-cols-3 gap-6">

        <div className="col-span-2">
          <FarmMap />
        </div>

        {/* WEATHER */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">
                Weather
              </h2>

              <p className="text-xs text-gray-500">
                Current simulation
              </p>
            </div>

            <CloudSun
              size={24}
              className="text-emerald-400"
            />
          </div>

          <div className="mt-6">
            <p className="text-4xl font-bold">
              29°C
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Partly cloudy
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">

            <div className="rounded-xl bg-white/5 p-4">
              <p className="text-xs text-gray-500">
                Rainfall
              </p>

              <p className="mt-1 font-semibold">
                400 mm
              </p>
            </div>

            <div className="rounded-xl bg-white/5 p-4">
              <p className="text-xs text-gray-500">
                Humidity
              </p>

              <p className="mt-1 font-semibold">
                65%
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* AI ADVISOR */}
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">

        <div className="flex items-start gap-4">

          <div className="rounded-xl bg-emerald-500/10 p-3">
            <Sprout
              size={22}
              className="text-emerald-400"
            />
          </div>

          <div>
            <p className="text-xs font-semibold tracking-wider text-emerald-400">
              AI FARM ADVISOR
            </p>

            <h2 className="mt-1 text-xl font-bold">
              Precision irrigation recommended
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
              Current simulated conditions indicate that
              adaptive irrigation may improve resource
              efficiency while maintaining expected yield.
            </p>
          </div>

        </div>

      </div>

      {/* SIMULATION RESULT */}
      {simulationResult && (
        <div className="rounded-2xl border border-emerald-500/20 bg-white/[0.03] p-6">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-semibold tracking-wider text-emerald-400">
                LATEST SIMULATION
              </p>

              <h2 className="mt-1 text-xl font-bold">
                Scenario Result
              </h2>
            </div>

            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
              {simulationResult.weather}
            </span>

          </div>

          <div className="mt-5 grid grid-cols-3 gap-4">

            <div className="rounded-xl bg-white/5 p-4">
              <p className="text-xs text-gray-500">
                Expected Yield
              </p>

              <p className="mt-2 text-2xl font-bold">
                {simulationResult.expected_yield} t/ha
              </p>
            </div>

            <div className="rounded-xl bg-white/5 p-4">
              <p className="text-xs text-gray-500">
                Risk Level
              </p>

              <p className="mt-2 text-2xl font-bold text-emerald-400">
                {simulationResult.risk}
              </p>
            </div>

            <div className="rounded-xl bg-white/5 p-4">
              <p className="text-xs text-gray-500">
                Estimated Cost
              </p>

              <p className="mt-2 text-2xl font-bold">
                ₹{simulationResult.estimated_cost}
              </p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}