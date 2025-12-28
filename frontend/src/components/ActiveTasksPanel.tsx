export function ActiveTasksPanel({ tasks }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
      <h3 className="font-semibold text-lg">Active Tasks</h3>

      {tasks.map((task: any) => (
        <div
          key={task.id}
          className="border rounded-xl p-4 flex justify-between items-center"
        >
          <div>
            <p className="font-medium">{task.name}</p>
            <p className="text-sm text-gray-500 mt-1">
              Mental effort: {task.mentalEffort}%
            </p>
          </div>

          <div className="flex gap-2">
            <span className="px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">
              {task.complexity}
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
              {task.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
