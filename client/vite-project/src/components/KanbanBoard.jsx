import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor } from "@dnd-kit/core";
import { useState } from "react";
import axios from "axios";
import CardTask from "./CardTask";
import EditTaskModal from "./EditTask";
import CreateTask from "./CreateTask";

export default function KanbanBoard({ status, initialNotes }) {
  const [notes, setNotes] = useState(initialNotes);
  const [editingNote, setEditingNote] = useState(null); 
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  // Handle drag and drop
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
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
        .then(() => {
          setNotes((prevNotes) =>
            prevNotes.map((note) =>
              note.id === active.id ? { ...note, statusId: status.id } : note
            )
          );
        })
        .catch(console.log);
    }
  };

  const addTaskToBoard = (newTask) => {
    setNotes((prevNotes) => [...prevNotes, newTask]);
  };

  const handleEdit = (note) => {
    axios
      .put(
        `http://localhost:3000/notes/${note.id}`,
        note,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then(({ data }) => {
        setNotes((prevNotes) =>
          prevNotes.map((note) => (note.id === data.id ? data : note))
        );
        setEditingNote(null); // Tutup modal
      })
      .catch(console.log);
  };

  // Hapus task
  const handleDelete = (noteId) => {
    axios
      .delete(`http://localhost:3000/notes/${noteId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
      })
      .catch(console.log);
  };

  return (
    <>
      {/* Modal Create Task */}
      {isCreatingTask && (
        <CreateTask
          onClose={() => setIsCreatingTask(false)}
          taskName=""
          taskDescription=""
          setTaskName={() => {}}
          setTaskDescription={() => {}}
          addTaskToBoard={addTaskToBoard}
        />
      )}

      {/* Modal Edit Task */}
      {editingNote && (
        <EditTaskModal
          note={editingNote}
          onSave={handleEdit}
          onClose={() => setEditingNote(null)}
        />
      )}

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            {status.name.toUpperCase()}
          </h3>
          <button
            onClick={() => setIsCreatingTask(true)}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            + Add Task
          </button>
          <div className="space-y-3">
            {notes.map((note) => (
              <CardTask
                key={note.id}
                note={note}
                onEdit={() => setEditingNote(note)}
                onDelete={() => handleDelete(note.id)}
              />
            ))}
          </div>
        </div>
      </DndContext>
    </>
  );
}
