import {
  LayoutDashboard,
  ListTodo,
  Brain,
  Lightbulb,
  Settings,
} from "lucide-react";

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "tasks", label: "Tasks", icon: ListTodo },
  { id: "decisions", label: "Agent Decisions", icon: Brain },
  { id: "insights", label: "Insights", icon: Lightbulb },
  { id: "settings", label: "Settings", icon: Settings },
];

export function Sidebar({ activeTab, onTabChange }: any) {
  return (
    <aside className="w-72 bg-white border-r p-6 space-y-6">
      <div className="flex items-center gap-2 text-2xl font-semibold text-blue-600">
        🧠 CognEase
      </div>

      <nav className="space-y-2">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left transition ${
              activeTab === id
                ? "bg-blue-50 text-blue-600 font-medium"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

