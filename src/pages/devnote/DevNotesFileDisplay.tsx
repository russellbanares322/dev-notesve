import { truncateString } from "@/lib/truncateString";
import { useGetDevNotesByAuthorId } from "@/services/devnote/queries";
import { useDisplayDevNotesStore } from "@/store/useDisplayDevNotesStore";
import { useUser } from "@clerk/clerk-react";
import { File } from "lucide-react";

type DevNotesFileDisplayProps = {
  category: string;
};

const DevNotesFileDisplay = ({ category }: DevNotesFileDisplayProps) => {
  const { user } = useUser();
  const { data } = useGetDevNotesByAuthorId(user?.id as string);
  const filteredDevNotes = data?.filter((note) => note.category === category);
  const { onSelectDevNote } = useDisplayDevNotesStore();

  return (
    <ul className="space-y-2">
      {filteredDevNotes?.map((note) => (
        <div
          className="flex ml-3 items-end gap-3 cursor-pointer"
          key={note.devnote_id}
          onClick={() => onSelectDevNote(note)}
        >
          <File size={20} className="text-gray-500" />
          <li className="text-sm">{truncateString(note.title)}</li>
        </div>
      ))}
    </ul>
  );
};

export default DevNotesFileDisplay;
