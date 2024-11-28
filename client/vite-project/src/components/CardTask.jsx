import { useDraggable } from "@dnd-kit/core";

export default function CardTask({ note }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: note.id, 
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="bg-blue-100 p-4 rounded-lg shadow-md"
    >
      <p className="font-medium text-gray-700">{note.task}</p>
    </div>
  );
}
