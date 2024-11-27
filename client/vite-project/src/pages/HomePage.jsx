import axios from "axios";
import { useEffect, useState } from "react";
import KanbanBoard from "../components/KanbanBoard";
import Navbar from "../components/Navbar";

export default function HomePage() {
  const [notes, setNotes] = useState([]);
  const [statuses, setStatuses] = useState([]);

  // Fetch notes and statuses
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

  // Filter notes by statusId
  const renderNotesByStatus = (statusId) => {
    return notes.filter((note) => note.statusId === statusId);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-100 min-h-screen">
        {statuses.map((status) => (
          <KanbanBoard
            key={status.id}
            status={status}
            notes={renderNotesByStatus(status.id)} // Filter notes based on statusId
          />
        ))}
      </div>
    </div>
  );
}
