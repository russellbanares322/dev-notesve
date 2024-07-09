import { useDisplayDevNotesStore } from "@/store/useDisplayDevNotesStore";
import { X } from "lucide-react";

const DevNoteDetailsDisplay = () => {
  const { selectedDevNotes } = useDisplayDevNotesStore();

  return (
    <div className="flex items-center gap-2">
      {selectedDevNotes?.map((note) => (
        <div className="flex items-center gap-1" key={note.devnote_id}>
          <p className="text-sm">{note.title}</p>
          <X />
        </div>
      ))}
    </div>
  );
};

export default DevNoteDetailsDisplay;
