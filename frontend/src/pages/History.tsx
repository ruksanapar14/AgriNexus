import {
  Clock3,
  Sprout,
  Droplets,
  IndianRupee,
  AlertTriangle,
} from "lucide-react";

const history = [
  {
    id: 1,
    date: "Today, 8:20 PM",
    scenario: "Current Plan",
    yield: 4.77,
    water: 4200,
    cost: 16730,
    risk: "LOW",
  },
  {
    id: 2,
    date: "Today, 8:15 PM",
    scenario: "Water Saving",
    yield: 3.41,
    water: 3000,
    cost: 15170,
    risk: "MEDIUM",
  },
  {
    id: 3,
    date: "Today, 8:10 PM",
    scenario: "Drought Plan",
    yield: 3.31,
    water: 5000,
    cost: 17100,
    risk: "MEDIUM",
  },
];

export default function History() {
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <p className="text-sm font-medium text-emerald-400">
          SIMULATION LOG
        </p>

        <h1 className="mt-1 text-3xl font-bold">
          History
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Review previous farm simulation scenarios.
        </p>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-3 gap-4">

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <Clock3 className="text-emerald-400" />

          <p className="mt-4 text-sm text-gray-500">
            Simulations Run
          </p>

          <p className="mt-1 text-3xl font-bold">
            3
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <Sprout className="text-emerald-400" />

          <p className="mt-4 text-sm text-gray-500">
            Best Yield
          </p>

          <p className="mt-1 text-3xl font-bold">
            4.77 t/ha
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <IndianRupee className="text-emerald-400" />

          <p className="mt-4 text-sm text-gray-500">
            Best Cost
          </p>

          <p className="mt-1 text-3xl font-bold">
            ₹15,170
          </p>
        </div>

      </div>

      {/* HISTORY */}
      <div className="space-y-4">

        {history.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <div className="flex items-center justify-between">

              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold">
                    {item.scenario}
                  </h2>

                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                    COMPLETED
                  </span>
                </div>

                <p className="mt-1 text-xs text-gray-500">
                  {item.date}
                </p>
              </div>

              <AlertTriangle
                size={20}
                className={
                  item.risk === "LOW"
                    ? "text-emerald-400"
                    : "text-yellow-400"
                }
              />

            </div>

            <div className="mt-5 grid grid-cols-4 gap-4">

              <div className="rounded-xl bg-white/5 p-4">
                <p className="text-xs text-gray-500">
                  Yield
                </p>

                <p className="mt-1 font-bold">
                  {item.yield} t/ha
                </p>
              </div>

              <div className="rounded-xl bg-white/5 p-4">
                <p className="text-xs text-gray-500">
                  Water
                </p>

                <p className="mt-1 font-bold">
                  {item.water} L
                </p>
              </div>

              <div className="rounded-xl bg-white/5 p-4">
                <p className="text-xs text-gray-500">
                  Cost
                </p>

                <p className="mt-1 font-bold">
                  ₹{item.cost}
                </p>
              </div>

              <div className="rounded-xl bg-white/5 p-4">
                <p className="text-xs text-gray-500">
                  Risk
                </p>

                <p className="mt-1 font-bold">
                  {item.risk}
                </p>
              </div>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}