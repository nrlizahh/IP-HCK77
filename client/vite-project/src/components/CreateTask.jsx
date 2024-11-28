import { useState } from "react";
import axios from "axios";

export default function CreateTask({
  onClose,
  taskName,
  taskDescription,
  setTaskName,
  setTaskDescription,
  addTaskToBoard,
}) {
  const [isTaskCreated, setIsTaskCreated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (taskName && taskDescription) {
      const taskData = {
        task: taskName,
        description: taskDescription,
      };

      axios
        .post("http://localhost:3000/notes", taskData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => {
          console.log("Task created:", response.data);
          addTaskToBoard(response.data.data); // Menambahkan task baru ke board
          setIsTaskCreated(true);
          onClose(); 
        })
        .catch((error) => {
          console.error("Error creating task:", error);
        });
    } else {
      alert("Please fill out both task name and description.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Create New Task</h2>
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
              onClick={() => onClose()}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isTaskCreated}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              {isTaskCreated ? "Task Created" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
