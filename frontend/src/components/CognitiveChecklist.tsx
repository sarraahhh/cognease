export function CognitiveChecklist() {
  const items = [
    "Break this task into smaller steps",
    "Choose just one priority for now",
    "Defer non-urgent parts",
    "Write things down instead of remembering",
    "Reduce expectations for this task",
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-3">
      <h3 className="text-lg font-semibold">Cognitive Relief Checklist</h3>
      <p className="text-sm text-gray-500">
        Optional suggestions to reduce mental load. Pick what helps.
      </p>

      <div className="space-y-2">
        {items.map((item, i) => (
          <label key={i} className="flex items-start gap-2 text-sm text-gray-700">
            <input type="checkbox" className="mt-1" />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
}
