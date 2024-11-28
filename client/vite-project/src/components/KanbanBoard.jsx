import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor } from "@dnd-kit/core";
import CardTask from "./CardTask";
import { useState } from "react";
import CreateTask from "./CreateTask";
import axios from "axios";

export default function KanbanBoard({ status, notes, setNotes }) {
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  const [isCreateTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const handleDragEnd = (event) => {
    const { active, over } = event;

    const task = notes.find((note) => note.id === active.id);

    if (task && over && active.id !== over.id) {
      axios
        .put(
          `http://localhost:3000/notes/${active.id}`,
          { statusId: status.id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        )
        .catch(console.log);
    }
  };

  const handleCreateTask = () => {
    setCreateTaskModalOpen(true);
  };

  const handleCloseCreateTaskModal = () => {
    setCreateTaskModalOpen(false);
    setTaskName(""); 
    setTaskDescription("");
  };

  // Fungsi untuk menambahkan task baru ke dalam notes
  const addTaskToBoard = (newTask) => {
    setNotes((prevNotes) => [...prevNotes, newTask]); // Menambahkan task baru ke notes
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-700">
            {status.name.toUpperCase()}
          </h3>
          <button
            onClick={handleCreateTask}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
        <div className="space-y-3">
          {notes.map((note) => (
            <CardTask key={note.id} note={note} />
          ))}
        </div>
      </div>

      {isCreateTaskModalOpen && (
        <CreateTask
          taskName={taskName}
          taskDescription={taskDescription}
          setTaskName={setTaskName}
          setTaskDescription={setTaskDescription}
          onClose={handleCloseCreateTaskModal}
          addTaskToBoard={addTaskToBoard} 
        />
      )}
    </DndContext>
  );
}
