import { useDisplayDevNotesStore } from "@/store/useDisplayDevNotesStore";
import { X } from "lucide-react";

const DevNoteDetailsDisplay = () => {
  const { selectedDevNotes, onRemoveDevNote } = useDisplayDevNotesStore();

  return (
    <div className="flex items-center gap-2">
      {selectedDevNotes?.map((note) => (
        <div
          className="group cursor-pointer relative mr-3 flex items-center gap-1"
          key={note.devnote_id}
        >
          <p className="text-sm">{note.title}</p>
          <X
            size={17}
            className="hidden group-hover:block"
            onClick={() => onRemoveDevNote(note.devnote_id)}
          />
        </div>
      ))}
    </div>
  );
};

export default DevNoteDetailsDisplay;
