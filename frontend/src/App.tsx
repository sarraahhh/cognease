import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { CognitiveLoadMeter } from "./components/CognitiveLoadMeter";
import { ActiveTasksPanel } from "./components/ActiveTasksPanel";
import { AgentActionsPanel } from "./components/AgentActionsPanel";
import { AgentReasoningPanel } from "./components/AgentReasoningPanel";
import { TaskInputPanel } from "./components/TaskInputPanel";
import { SimplifiedOutputPanel } from "./components/SimplifiedOutputPanel";
import { CognitiveChecklist } from "./components/CognitiveChecklist";


/* =====================
   Types
   ===================== */

type Task = {
  id: string;
  name: string;
  complexity: string;
  mentalEffort: number;
  status: string;
};

type AgentAction = {
  id: string;
  message: string;
  timestamp: string;
  type: "success" | "warning" | "info";
};

type Reasoning = {
  trigger: string;
  reasoning: string;
  action: string;
};

/* =====================
   Mock Tasks 
   ===================== */

const mockTasks: Task[] = [
  {
    id: "1",
    name: "Complete quarterly financial report",
    complexity: "High",
    mentalEffort: 85,
    status: "Active",
  },
  {
    id: "2",
    name: "Review team performance metrics",
    complexity: "Medium",
    mentalEffort: 45,
    status: "Simplified",
  },
  {
    id: "3",
    name: "Schedule client meetings",
    complexity: "Low",
    mentalEffort: 20,
    status: "Deferred",
  },
];

function InsightCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm">
      <h4 className="font-medium mb-2">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

/* =====================
   App
   ===================== */

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Live agent state
  const [simplifiedOutput, setSimplifiedOutput] = useState<string | null>(null);
  const [agentActions, setAgentActions] = useState<AgentAction[]>([]);
  const [loadData, setLoadData] = useState({
    intrinsic: 0,
    extraneous: 0,
    germane: 0,
    total: 0,
  });

  const [reasoning, setReasoning] = useState<Reasoning>({
    trigger: "No analysis yet",
    reasoning: "Submit a task to see agent reasoning.",
    action: "—",
  });

  /* =====================
     Backend call
     ===================== */

  const handleAddTask = async (text: string) => {
    setSimplifiedOutput("Analyzing cognitive load...");

    const res = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();

    // Cognitive load
    setLoadData({
      intrinsic: data.cognitive_load.intrinsic,
      extraneous: data.cognitive_load.extraneous,
      germane: data.cognitive_load.germane,
      total: data.cognitive_load.total,
    });

    // Agent actions
    setAgentActions(
      data.actions.map((a: string, i: number) => ({
        id: String(i),
        message: a.replaceAll("_", " "),
        timestamp: "just now",
        type: "info",
      }))
    );

    // Reasoning summary 
    setReasoning({
      trigger: `Total cognitive load = ${data.cognitive_load.total}`,
      reasoning:
        "Agent evaluated intrinsic, extraneous, and germane load based on task characteristics.",
      action: data.actions.join(", "),
    });

    // Simplified output
    setSimplifiedOutput(
      data.simplified_text ??
        "No simplification required. Agent chose an alternative intervention."
    );



  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 p-8 overflow-auto space-y-8">
          {activeTab === "dashboard" && (
            <div className="max-w-7xl mx-auto space-y-8">
              <TaskInputPanel onAddTask={handleAddTask} />
              <SimplifiedOutputPanel output={simplifiedOutput} />
              <SimplifiedOutputPanel output={simplifiedOutput} />
<CognitiveChecklist />


              <CognitiveLoadMeter
                totalLoad={loadData.total}
                intrinsicLoad={loadData.intrinsic}
                extraneousLoad={loadData.extraneous}
                germaneLoad={loadData.germane}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ActiveTasksPanel tasks={mockTasks} />
                <AgentActionsPanel actions={agentActions} />
              </div>

              <AgentReasoningPanel reasoning={reasoning} />
            </div>
          )}

          {activeTab === "tasks" && (
            <div className="max-w-6xl mx-auto space-y-6">
              <h2 className="text-2xl font-semibold">All Tasks</h2>
              <ActiveTasksPanel tasks={mockTasks} />
            </div>
          )}

          {activeTab === "decisions" && (
            <div className="max-w-6xl mx-auto space-y-6">
              <h2 className="text-2xl font-semibold">Agent Decisions</h2>
              <AgentActionsPanel actions={agentActions} />
            </div>
          )}

          {activeTab === "insights" && (
            <div className="max-w-6xl mx-auto space-y-6">
              <h2 className="text-2xl font-semibold">Insights</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <InsightCard
                  title="Peak Overload Times"
                  description="Agent detects higher cognitive strain during complex, multi-step tasks."
                />
                <InsightCard
                  title="Decision Strategy"
                  description="LLM usage is gated and invoked only when simplification is required."
                />
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <h2 className="text-2xl font-semibold">Settings</h2>
              <p className="text-gray-600">
                Agent behavior customization will appear here.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
