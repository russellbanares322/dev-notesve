import { useDisplayDevNotesStore } from "@/store/useDisplayDevNotesStore";
import { X } from "lucide-react";
import { useState } from "react";

const DevNoteDetailsDisplay = () => {
  const { selectedDevNotes } = useDisplayDevNotesStore();
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  const onMouseEnter = (id: string) => {
    setHoveredItemId(id);
  };

  const onMouseLeave = () => {
    setHoveredItemId(null);
  };

  return (
    <div className="flex items-center gap-2">
      {selectedDevNotes?.map((note) => (
        <div
          className="flex items-center gap-1 cursor-pointer"
          onMouseEnter={() => onMouseEnter(note.devnote_id)}
          onMouseLeave={onMouseLeave}
          key={note.devnote_id}
        >
          <p className="text-sm">{note.title}</p>
          {hoveredItemId === note.devnote_id && <X />}
        </div>
      ))}
    </div>
  );
};

export default DevNoteDetailsDisplay;
