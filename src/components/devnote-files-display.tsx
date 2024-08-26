import { truncateString } from "@/lib/truncateString";
import { useGetDevNotesByAuthorId } from "@/services/devnote/queries";
import { DevNotes, SortDirectionValue } from "@/services/devnote/types";
import { useDisplayDevNotesStore } from "@/store/useDisplayDevNotesStore";
import { useUser } from "@clerk/clerk-react";
import { File } from "lucide-react";
import { useNavigate } from "react-router-dom";

type DevNotesFileDisplayProps = {
  category: string;
};

const DevNotesFileDisplay = ({ category }: DevNotesFileDisplayProps) => {
  const { user } = useUser();
  const { data } = useGetDevNotesByAuthorId({
    author_id: user?.id as string,
    sort_direction: "0" as SortDirectionValue,
    category: "",
  });
  const filteredDevNotes = data?.filter((note) => note.category === category);
  const { onSelectDevNote } = useDisplayDevNotesStore();
  const navigate = useNavigate();

  const handleSelectItem = (note: DevNotes) => {
    onSelectDevNote(note);
    navigate(`devnote/${note.devnote_id}`);
  };

  return (
    <ul className="space-y-2">
      {filteredDevNotes?.map((note) => (
        <div
          className="flex ml-3 items-end gap-3 cursor-pointer"
          key={note.devnote_id}
          onClick={() => handleSelectItem(note)}
        >
          <File size={20} className="text-gray-500" />
          <li className="text-sm">{truncateString(note.title)}</li>
        </div>
      ))}
    </ul>
  );
};

export default DevNotesFileDisplay;
