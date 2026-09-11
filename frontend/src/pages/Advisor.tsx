import { useState } from "react";
import {
  Brain,
  Droplets,
  FlaskConical,
  CloudRain,
  Sprout,
  Lightbulb,
} from "lucide-react";

export default function Advisor() {
  const [irrigation, setIrrigation] = useState(4200);
  const [fertilizer, setFertilizer] = useState(82);
  const [weather, setWeather] = useState("Normal");

  const getAdvice = () => {
    if (weather === "Drought") {
      return {
        title: "Increase irrigation efficiency",
        text: "Drought conditions may reduce crop performance. Consider precision irrigation and avoid unnecessary water loss.",
        icon: Droplets,
      };
    }

    if (weather === "Heavy Rain") {
      return {
        title: "Reduce irrigation",
        text: "Heavy rainfall can increase soil moisture. Avoid additional irrigation unless the soil becomes dry.",
        icon: CloudRain,
      };
    }

    if (fertilizer > 110) {
      return {
        title: "Optimize fertilizer usage",
        text: "High fertilizer input may increase cost without proportional yield improvement. Consider a balanced application.",
        icon: FlaskConical,
      };
    }

    if (irrigation > 5500) {
      return {
        title: "Reduce water consumption",
        text: "Current irrigation is relatively high. Precision irrigation could improve water efficiency.",
        icon: Droplets,
      };
    }

    return {
      title: "Conditions look favorable",
      text: "Current simulated conditions support a balanced farming strategy. Maintain efficient irrigation and nutrient management.",
      icon: Sprout,
    };
  };

  const advice = getAdvice();
  const AdviceIcon = advice.icon;

  return (
    <div className="space-y-6">

      <div>
        <p className="text-sm font-medium text-emerald-400">
          AI DECISION SUPPORT
        </p>

        <h1 className="mt-1 text-3xl font-bold">
          AI Farm Advisor
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Get recommendations based on your simulated farm conditions.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">

        {/* INPUTS */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

          <h2 className="font-semibold">
            Farm Conditions
          </h2>

          <div className="mt-6 space-y-6">

            <label className="block">
              <span className="text-sm text-gray-400">
                Irrigation
              </span>

              <input
                type="range"
                min="1000"
                max="7000"
                value={irrigation}
                onChange={(e) =>
                  setIrrigation(Number(e.target.value))
                }
                className="mt-3 w-full accent-emerald-400"
              />

              <p className="mt-1 text-sm font-semibold">
                {irrigation} L
              </p>
            </label>

            <label className="block">
              <span className="text-sm text-gray-400">
                Fertilizer
              </span>

              <input
                type="range"
                min="20"
                max="150"
                value={fertilizer}
                onChange={(e) =>
                  setFertilizer(Number(e.target.value))
                }
                className="mt-3 w-full accent-emerald-400"
              />

              <p className="mt-1 text-sm font-semibold">
                {fertilizer} kg
              </p>
            </label>

            <label className="block">
              <span className="text-sm text-gray-400">
                Weather
              </span>

              <select
                value={weather}
                onChange={(e) => setWeather(e.target.value)}
                className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none"
              >
                <option>Normal</option>
                <option>Ideal</option>
                <option>Drought</option>
                <option>Heavy Rain</option>
                <option>Heat Wave</option>
              </select>
            </label>

          </div>
        </div>

        {/* ADVICE */}
        <div className="col-span-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-500/10 p-3">
              <Brain className="text-emerald-400" />
            </div>

            <div>
              <p className="text-xs font-semibold tracking-wider text-emerald-400">
                AI RECOMMENDATION
              </p>

              <h2 className="text-xl font-bold">
                {advice.title}
              </h2>
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-black/20 p-6">

            <div className="flex items-start gap-4">
              <AdviceIcon
                size={28}
                className="mt-1 text-emerald-400"
              />

              <div>
                <h3 className="font-semibold">
                  Recommended Action
                </h3>

                <p className="mt-2 leading-7 text-gray-400">
                  {advice.text}
                </p>
              </div>
            </div>

          </div>

          <div className="mt-5 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
            <Lightbulb
              size={20}
              className="text-yellow-400"
            />

            <p className="text-sm text-gray-400">
              These recommendations are simulation-based
              suggestions, not guaranteed outcomes.
            </p>
          </div>

        </div>

      </div>

      {/* FEATURES */}
      <div className="grid grid-cols-3 gap-4">

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <Sprout className="text-emerald-400" />
          <h3 className="mt-4 font-semibold">
            Crop Optimization
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Identify conditions that may improve crop performance.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <Droplets className="text-emerald-400" />
          <h3 className="mt-4 font-semibold">
            Water Efficiency
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Reduce unnecessary irrigation through scenario testing.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <FlaskConical className="text-emerald-400" />
          <h3 className="mt-4 font-semibold">
            Nutrient Planning
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Explore fertilizer levels before making decisions.
          </p>
        </div>

      </div>

    </div>
  );
}