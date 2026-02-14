import { useState } from "react";
import { extract } from "../services/api";

export default function TranscriptInput({ reload }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!text) return alert("Paste transcript");

    setLoading(true);
    await extract(text);
    setText("");
    setLoading(false);
    await reload();
  }

  return (
    <div className="space-y-3">
      <textarea
        className="w-full p-3 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
        rows="5"
        placeholder="Paste meeting transcript here..."
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <button
        onClick={submit}
        disabled={loading}
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Running agent..." : "Process"}
      </button>
    </div>
  );
}
