import { truncateString } from "@/lib/truncateString";
import { useGetDevNotesByAuthorId } from "@/services/devnote/queries";
import { useUser } from "@clerk/clerk-react";

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
        <li className="text-sm ml-7 cursor-pointer" key={note.devnote_id}>
          {truncateString(note.title)}
        </li>
      ))}
    </ul>
  );
};

export default DevNotesSidebarDisplay;
