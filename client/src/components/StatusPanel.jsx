function StatusItem({ label, ok }) {
  return (
    <div className="bg-gray-700 p-4 rounded text-center">
      <p className="text-sm">{label}</p>
      <p className={`font-semibold ${ok ? "text-green-400" : "text-red-400"}`}>
        {ok ? "OK" : "DOWN"}
      </p>
    </div>
  );
}

export default function StatusPanel({ status }) {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Status</h2>

      <div className="grid grid-cols-3 gap-4">
        <StatusItem label="Backend" ok={status.backend} />
        <StatusItem label="Database" ok={status.database} />
        <StatusItem label="LLM" ok={status.llm} />
      </div>
    </div>
  );
}
