import { useDraggable } from "@dnd-kit/core";

export default function CardTask({ note, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: note.id,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="p-4 bg-blue-100 rounded shadow-md cursor-pointer"
      style={{
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
      }}
    >
      <h4 className="font-semibold">{note.task}</h4>
      <p>{note.description}</p>
      <div className="flex gap-2 mt-2">
        <button onClick={onEdit} className="px-2 py-1 bg-green-500 text-white rounded">
          Edit
        </button>
        <button onClick={onDelete} className="px-2 py-1 bg-red-500 text-white rounded">
          Delete
        </button>
      </div>
    </div>
  );
}
