import { updateAction } from "../services/api";

export default function ActionItem({ a, reload }) {
  return (
    <div className="flex items-center gap-3 bg-gray-700 px-3 py-2 rounded">
      <input
        type="checkbox"
        checked={a.done}
        onChange={async () => {
          await updateAction(a._id, { done: !a.done });
          reload();
        }}
      />

      <div className="flex-1">
        <p className={a.done ? "line-through opacity-50" : ""}>
          {a.task}
        </p>
        {a.owner && (
          <p className="text-xs text-gray-300">{a.owner}</p>
        )}
      </div>
    </div>
  );
}
