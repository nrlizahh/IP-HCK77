import { useState } from "react";

export default function EditTaskModal({ note, onSave, onClose }) {
  const [taskName, setTaskName] = useState(note.task);
  const [taskDescription, setTaskDescription] = useState(note.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedNote = { ...note, task: taskName, description: taskDescription };
    onSave(updatedNote); // Kirim ke parent untuk API update
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Task Name</label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter task name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Task Description</label>
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter task description"
              rows="4"
            ></textarea>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
