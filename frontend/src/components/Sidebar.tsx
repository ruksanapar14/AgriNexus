import {
  LayoutDashboard,
  Sprout,
  FlaskConical,
  BarChart3,
  History,
  Settings,
  Brain,
  GitCompare,
} from "lucide-react";

type Page =
  | "home"
  | "farms"
  | "dashboard"
  | "scenarios"
  | "simulation"
  | "results"
  | "comparison"
  | "analytics"
  | "history"
  | "advisor";

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    page: "dashboard" as Page,
  },
  {
    label: "Scenarios",
    icon: FlaskConical,
    page: "scenarios" as Page,
  },
  {
    label: "Compare",
    icon: GitCompare,
    page: "comparison" as Page,
  },
  {
    label: "AI Advisor",
    icon: Brain,
    page: "advisor" as Page,
  },
  {
    label: "Analytics",
    icon: BarChart3,
    page: "analytics" as Page,
  },
  {
    label: "History",
    icon: History,
    page: "history" as Page,
  },
];

export default function Sidebar({
  activePage,
  setActivePage,
}: SidebarProps) {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-white/10 bg-[#08130e]">

      {/* LOGO */}
      <div className="flex items-center gap-3 border-b border-white/10 px-6 py-6">

        <div className="rounded-xl bg-emerald-500/10 p-2">
          <Sprout
            size={25}
            className="text-emerald-400"
          />
        </div>

        <div>
          <h1 className="font-bold">
            AgriNexus
          </h1>

          <p className="text-xs text-gray-500">
            AI Farm Simulator
          </p>
        </div>

      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 space-y-2 p-4">

        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-600">
          Workspace
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = activePage === item.page;

          return (
            <button
              key={item.page}
              onClick={() => setActivePage(item.page)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                active
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={19} />

              <span>{item.label}</span>
            </button>
          );
        })}

      </nav>

      {/* BOTTOM */}
      <div className="border-t border-white/10 p-4">

        <button
          onClick={() => alert("Settings coming soon")}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-400 hover:bg-white/5 hover:text-white"
        >
          <Settings size={19} />

          <span>Settings</span>
        </button>

        <div className="mt-3 flex items-center gap-3 rounded-xl bg-white/5 p-3">

          <div className="h-2 w-2 rounded-full bg-emerald-400" />

          <div>
            <p className="text-xs font-medium">
              Simulation Engine
            </p>

            <p className="text-[11px] text-emerald-400">
              Online
            </p>
          </div>

        </div>

      </div>

    </aside>
  );
}