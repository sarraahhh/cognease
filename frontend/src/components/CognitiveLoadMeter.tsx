export function CognitiveLoadMeter({
  totalLoad,
  intrinsicLoad,
  extraneousLoad,
  germaneLoad,
}: any) {
  return (
    <div className="bg-white p-8 rounded-2xl border shadow-sm flex gap-8 items-center">
      {/* Circle */}
      <div className="relative w-40 h-40">
        <div className="absolute inset-0 rounded-full border-[10px] border-gray-200" />
        <div
          className="absolute inset-0 rounded-full border-[10px] border-yellow-400"
          style={{
            clipPath: `inset(${100 - totalLoad}% 0 0 0)`,
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-yellow-600">
            {totalLoad}%
          </span>
          <span className="text-sm text-gray-500">Moderate</span>
        </div>
      </div>

      {/* Bars */}
      <div className="flex-1 space-y-4">
        <LoadBar label="Intrinsic Load" value={intrinsicLoad} />
        <LoadBar label="Extraneous Load" value={extraneousLoad} />
        <LoadBar
          label="Germane Load"
          value={germaneLoad}
          color="bg-green-500"
        />
      </div>
    </div>
  );
}

function LoadBar({
  label,
  value,
  color = "bg-yellow-400",
}: any) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium">{value}%</span>
      </div>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

