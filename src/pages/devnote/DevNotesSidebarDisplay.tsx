import { truncateString } from "@/lib/truncateString";
import { useGetDevNotesByAuthorId } from "@/services/devnote/queries";
import { useUser } from "@clerk/clerk-react";
import { File } from "lucide-react";

type DevNotesSidebarDisplayProps = {
  category: string;
};

const DevNotesSidebarDisplay = ({ category }: DevNotesSidebarDisplayProps) => {
  const { user } = useUser();

  const { data } = useGetDevNotesByAuthorId(user?.id as string);
  const filteredDevNotes = data?.filter((note) => note.category === category);

  return (
    <ul className="space-y-2">
      {filteredDevNotes?.map((note) => (
        <div
          className="flex ml-3 items-end gap-3 cursor-pointer hover:text-white"
          key={note.devnote_id}
        >
          <File size={18} />
          <li className="text-xs">{truncateString(note.title)}</li>
        </div>
      ))}
    </ul>
  );
};

export default DevNotesSidebarDisplay;
