import { useDisplayDevNotesStore } from "@/store/useDisplayDevNotesStore";
import { X } from "lucide-react";
import { useState } from "react";

const DevNoteDetailsDisplay = () => {
  const { selectedDevNotes, onRemoveDevNote } = useDisplayDevNotesStore();
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
          className="cursor-pointer relative mr-3"
          onMouseEnter={() => onMouseEnter(note.devnote_id)}
          onMouseLeave={onMouseLeave}
          key={note.devnote_id}
        >
          <p className="text-sm">{note.title}</p>
          {hoveredItemId === note.devnote_id && (
            <X
              size={17}
              className="absolute top-0 -right-4"
              onClick={() => onRemoveDevNote(note.devnote_id)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default DevNoteDetailsDisplay;
