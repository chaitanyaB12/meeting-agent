import { useEffect, useState } from "react";
import TranscriptInput from "./components/TranscriptInput";
import ActionList from "./components/ActionList";
import History from "./components/History";
import StatusPanel from "./components/StatusPanel";
import { getActions, getHistory, getStatus } from "./services/api";

export default function App() {
  const [actions, setActions] = useState([]);
  const [history, setHistory] = useState([]);
  const [status, setStatus] = useState({});

  // reusable reload function
  async function reload() {
    const a = await getActions();
    const h = await getHistory();
    const s = await getStatus();

    setActions(a);
    setHistory(h);
    setStatus(s);
  }

  // initial load
  useEffect(() => {
    let mounted = true;

    const fetchAll = async () => {
      const a = await getActions();
      const h = await getHistory();
      const s = await getStatus();

      if (mounted) {
        setActions(a);
        setHistory(h);
        setStatus(s);
      }
    };

    fetchAll();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <div className="max-w-3xl mx-auto space-y-6">

        <h1 className="text-3xl font-bold">Meeting Action Agent</h1>

        <div className="bg-gray-800 p-4 rounded">
          <TranscriptInput reload={reload} />
        </div>

        <div className="bg-gray-800 p-4 rounded">
          <ActionList actions={actions} reload={reload} />
        </div>

        <div className="bg-gray-800 p-4 rounded">
          <History history={history} />
        </div>

        <div className="bg-gray-800 p-4 rounded">
          <StatusPanel status={status} />
        </div>

      </div>
    </div>
  );
}
