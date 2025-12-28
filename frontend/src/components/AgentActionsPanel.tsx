export function AgentActionsPanel({ actions }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
      <h3 className="font-semibold text-lg">
        Agent Actions & Notifications
      </h3>

      {actions.map((a: any) => (
        <div
          key={a.id}
          className={`p-4 rounded-xl border ${
            a.type === "success"
              ? "bg-green-50 border-green-200"
              : "bg-yellow-50 border-yellow-200"
          }`}
        >
          <p className="font-medium">{a.message}</p>
          <p className="text-sm text-gray-500 mt-1">
            {a.timestamp}
          </p>
        </div>
      ))}
    </div>
  );
}

