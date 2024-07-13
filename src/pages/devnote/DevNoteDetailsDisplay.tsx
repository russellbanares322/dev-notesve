import { useDisplayDevNotesStore } from "@/store/useDisplayDevNotesStore";
import { X } from "lucide-react";
import { twMerge } from "tailwind-merge";

const DevNoteDetailsDisplay = () => {
  const {
    selectedDevNotes,
    onRemoveDevNote,
    currentlyViewingDevNote,
    onViewDevNote,
  } = useDisplayDevNotesStore();

  return (
    <div className="flex items-center gap-2">
      {selectedDevNotes?.map((note) => {
        const isItemCurrentlyViewing =
          currentlyViewingDevNote === note.devnote_id;

        return (
          <div
            className={twMerge(
              isItemCurrentlyViewing ? "border-b border-solid" : "border-0",
              "group cursor-pointer mt-5 relative mr-5 flex items-center gap-1 pb-1"
            )}
            key={note.devnote_id}
            onClick={() => onViewDevNote(note.devnote_id)}
          >
            <p className="text-sm">{note.title}</p>
            <X
              size={17}
              className="hidden group-hover:block group-hover:absolute group-hover:-right-[20px]"
              onClick={() => onRemoveDevNote(note.devnote_id)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DevNoteDetailsDisplay;
