export function SimplifiedOutputPanel({ output }: any) {
  if (!output) return null;

  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-2">
      <h3 className="text-lg font-semibold">Simplified Instructions</h3>
      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
        {output}
      </p>
    </div>
  );
}
