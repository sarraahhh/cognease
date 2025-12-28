export interface Reasoning {
  trigger: string;
  reasoning: string;
  action: string;
}

export function AgentReasoningPanel({ reasoning }: { reasoning: Reasoning }) {
  return (
    <div className="bg-white p-6 rounded-xl border">
      <h3 className="font-medium mb-2">Agent Reasoning</h3>
      <p><strong>Trigger:</strong> {reasoning.trigger}</p>
      <p className="mt-2">{reasoning.reasoning}</p>
      <p className="mt-2 text-blue-600">{reasoning.action}</p>
    </div>
  );
}
