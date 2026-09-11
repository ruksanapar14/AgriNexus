import { useState } from "react";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import CreateFarm from "./pages/CreateFarm";
import Scenarios from "./pages/Scenarios";
import Comparison from "./pages/Comparison";
import Analytics from "./pages/Analytics";
import History from "./pages/History";

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

function App() {
  const [activePage, setActivePage] =
    useState<Page>("dashboard");

  const [farmCreated, setFarmCreated] =
    useState(false);

  const renderPage = () => {
    if (!farmCreated) {
      return (
        <CreateFarm
          onCreated={() => {
            setFarmCreated(true);
            setActivePage("dashboard");
          }}
        />
      );
    }

    switch (activePage) {
      case "dashboard":
        return <Dashboard />;

      case "scenarios":
        return <Scenarios />;

      case "comparison":
        return <Comparison />;

      case "analytics":
        return <Analytics />;

      case "history":
        return <History />;

      case "advisor":
        return <Dashboard />;

      case "simulation":
        return <Scenarios />;

      case "results":
        return <Comparison />;

      case "home":
      case "farms":
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#07110d] text-white">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="flex-1 overflow-y-auto">
        <div className="min-h-full p-8">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

export default App;