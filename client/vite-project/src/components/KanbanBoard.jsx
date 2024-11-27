import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor } from "@dnd-kit/core"; // Hapus DragEndEvent
import { useState } from "react";
import CardTask from "./CardTask";

export default function KanbanBoard({ status, notes }) {
  const [tasks, setTasks] = useState(notes);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    // Check if dropped in another area (valid drop target)
    if (over && active.id !== over.id) {
      // Update task's status based on the target status
      const updatedTasks = tasks.map((task) =>
        task.id === active.id ? { ...task, statusId: over.id } : task
      );
      setTasks(updatedTasks);

      // Optionally update status in the backend
      axios
        .put(`http://localhost:3000/notes/${active.id}`, {
          statusId: over.id,
        })
        .catch(console.log);
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          {status.name.toUpperCase()}
        </h3>
        <div className="space-y-3">
          {tasks.map((note) => (
            <CardTask key={note.id} note={note} />
          ))}
        </div>
      </div>
    </DndContext>
  );
}
