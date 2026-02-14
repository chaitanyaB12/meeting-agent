export default function History({ history }) {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Last Transcripts</h2>

      {history.length === 0 && (
        <p className="text-gray-400 text-sm">No transcripts yet.</p>
      )}

      <ul className="space-y-2 text-sm">
        {history.map(h => (
          <li
            key={h._id}
            className="bg-gray-700 px-3 py-2 rounded text-gray-300"
          >
            {new Date(h.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
