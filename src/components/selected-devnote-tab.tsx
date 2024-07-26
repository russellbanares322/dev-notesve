import { useDisplayDevNotesStore } from "@/store/useDisplayDevNotesStore";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const SelectedDevNoteTab = () => {
  const {
    selectedDevNotes,
    onRemoveDevNote,
    currentlyViewingDevNote,
    onViewDevNote,
  } = useDisplayDevNotesStore();
  const navigate = useNavigate();

  const handleViewDevNote = (devNoteId: number) => {
    onViewDevNote(devNoteId);
    navigate(`devnote/${devNoteId}`);
  };

  return (
    <div className="flex items-center gap-2">
      {selectedDevNotes?.map((note, index) => {
        const isItemCurrentlyViewing =
          currentlyViewingDevNote === note.devnote_id;

        return (
          <div
            className={twMerge(
              isItemCurrentlyViewing ? "border-b border-solid" : "border-0",
              "group cursor-pointer mt-5 relative mr-5 flex items-center gap-1 pb-1"
            )}
            key={note.devnote_id}
            onClick={() => handleViewDevNote(note.devnote_id)}
          >
            <p className="text-sm">{note.title}</p>
            <X
              size={17}
              className="absolute -right-[20px]"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveDevNote(note.devnote_id, index);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SelectedDevNoteTab;
