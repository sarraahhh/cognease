import { useState } from "react";

type Props = {
  onAddTask: (text: string) => void;
};

export function TaskInputPanel({ onAddTask }: Props) {
  const [taskText, setTaskText] = useState("");

  const handleAnalyze = () => {
    if (!taskText.trim()) return;
    onAddTask(taskText);
    
  };

  const handleClear = () => {
    setTaskText("");
  };

  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
      <h3 className="text-lg font-semibold">Enter Task</h3>

      <textarea
        className="w-full border rounded-lg p-3 text-sm resize-none"
        rows={4}
        placeholder="Paste or type the task you are working on..."
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />

      <div className="flex gap-3">
        <button
          onClick={handleAnalyze}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
        >
          Analyze Task
        </button>

        <button
          onClick={handleClear}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
