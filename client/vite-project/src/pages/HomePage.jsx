import axios from "axios";
import { useEffect, useState } from "react";
import KanbanBoard from "../components/KanbanBoard";
import Navbar from "../components/Navbar";
import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor } from "@dnd-kit/core";

export default function HomePage() {
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const [notes, setNotes] = useState([]);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:3000/statuses",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then(({ data }) => setStatuses(data))
      .catch(console.log);

    axios({
      method: "GET",
      url: "http://localhost:3000/notes",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then(({ data }) => setNotes(data))
      .catch(console.log);
  }, []);

  const updateNoteStatus = (noteId, newStatusId, newOrder) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId
          ? { ...note, statusId: newStatusId, order: newOrder }
          : note
      )
    );
  };

  const renderNotesByStatus = (statusId) => {
    return notes
      .filter((note) => note.statusId === statusId)
      .sort((a, b) => a.order - b.order); 
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    console.log(active, over);

    if (over) {
      const newStatusId = over.id; 
      const noteId = active.id;
      const targetNotes = notes.filter((note) => note.statusId === newStatusId);
      const newOrder = targetNotes.length + 1;

      try {
        // Update the status of the note in the backend
        // await axios.put(
        //   http://localhost:3000/notes/${noteId},
        //   { statusId: newStatusId, order: newOrder },
        //   {
        //     headers: {
        //       Authorization: Bearer ${localStorage.getItem("access_token")},
        //     },
        //   }
        // );

        updateNoteStatus(noteId, newStatusId, newOrder);
      } catch (error) {
        console.error("Failed to update note status:", error);
      }
    }
  };


  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-100 min-h-screen">
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          {statuses.map((status) => (
            <KanbanBoard
              key={status.id}
              status={status}
              notes={renderNotesByStatus(status.id)}
              onUpdateNoteStatus={updateNoteStatus}
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
}
