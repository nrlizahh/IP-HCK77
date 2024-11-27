import { useDraggable } from "@dnd-kit/core";

export default function CardTask({ note, onDropHandler }) {
  
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: note.id.toString(), // Set ID for drag
  });

  return (
    <div
      ref={setNodeRef}  // Attach the drag ref here
      {...listeners}     // Attach the drag event listeners
      {...attributes}    // Attach the attributes for drag behavior
      className="p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md"
    >
      <p className="text-gray-700 text-sm">{note.task}</p>
    </div>
  );
}
