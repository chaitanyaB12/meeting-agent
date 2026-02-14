import { useState, useRef, useEffect } from "react";
import { updateAction, deleteAction, createAction } from "../services/api";

export default function ActionList({ actions, reload }) {
  const wrapperRef = useRef(null);

  const [newTask, setNewTask] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [newDue, setNewDue] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editTask, setEditTask] = useState("");
  const [editOwner, setEditOwner] = useState("");
  const [editDue, setEditDue] = useState("");

  // cancel edit when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setEditingId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function toggleDone(a) {
    await updateAction(a._id, { done: !a.done });
    reload();
  }

  async function handleDelete(id) {
    await deleteAction(id);
    reload();
  }

  async function handleSave(id) {
    await updateAction(id, {
      task: editTask,
      owner: editOwner,
      dueDate: editDue,
    });
    setEditingId(null);
    reload();
  }

  async function handleAdd() {
    if (!newTask.trim()) return;

    await createAction({
      task: newTask,
      owner: newOwner,
      dueDate: newDue,
      done: false,
    });

    setNewTask("");
    setNewOwner("");
    setNewDue("");
    reload();
  }

  return (
    <div className="space-y-3" ref={wrapperRef}>
      <h2 className="text-xl font-semibold">Actions</h2>

      {/* ADD */}
      <div className="flex gap-2">
        <input
          className="flex-1 bg-gray-700 p-2 rounded"
          placeholder="Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />

        <input
          className="w-28 bg-gray-700 p-2 rounded"
          placeholder="Owner"
          value={newOwner}
          onChange={(e) => setNewOwner(e.target.value)}
        />

        <input
          type="date"
          className="w-36 bg-gray-700 p-2 rounded"
          value={newDue}
          onChange={(e) => setNewDue(e.target.value)}
        />

        <button onClick={handleAdd} className="bg-blue-600 px-4 rounded">
          Add
        </button>
      </div>

      {/* LIST */}
      {actions.map((a) => (
        <div key={a._id} className="bg-gray-700 p-3 rounded flex justify-between">

          <div className="flex-1">
            {editingId === a._id ? (
              <div className="flex gap-2">
                <input
                  className="flex-1 bg-gray-600 p-2 rounded"
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                />

                <input
                  className="w-28 bg-gray-600 p-2 rounded"
                  value={editOwner}
                  onChange={(e) => setEditOwner(e.target.value)}
                />

                <input
                  type="date"
                  className="w-36 bg-gray-600 p-2 rounded"
                  value={editDue}
                  onChange={(e) => setEditDue(e.target.value)}
                />
              </div>
            ) : (
              <>
                <p className={a.done ? "line-through text-gray-400" : ""}>
                  {a.task}
                </p>
                <p className="text-sm text-gray-300">
                  {a.owner} {a.dueDate && `• ${a.dueDate}`}
                </p>
              </>
            )}
          </div>

          <div className="flex gap-2 items-center ml-3">
            <input type="checkbox" checked={a.done} onChange={() => toggleDone(a)} />

            {editingId === a._id ? (
              <button onClick={() => handleSave(a._id)} className="bg-green-600 px-2 rounded">
                Save
              </button>
            ) : (
              <button
                onClick={() => {
                  setEditingId(a._id);
                  setEditTask(a.task);
                  setEditOwner(a.owner);
                  setEditDue(a.dueDate || "");
                }}
                className="bg-yellow-600 px-2 rounded"
              >
                Edit
              </button>
            )}

            <button onClick={() => handleDelete(a._id)} className="bg-red-600 px-2 rounded">
              Delete
            </button>
          </div>

        </div>
      ))}
    </div>
  );
}
