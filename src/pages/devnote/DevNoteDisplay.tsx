import { truncateString } from "@/lib/truncateString";
import { useGetDevNotesByAuthorId } from "@/services/devnote/queries";
import { useUser } from "@clerk/clerk-react";

type DevNoteDisplayProps = {
  category: string;
};

const DevNoteDisplay = ({ category }: DevNoteDisplayProps) => {
  const { user } = useUser();

  const { data } = useGetDevNotesByAuthorId(user?.id as string);
  const filteredDevNotes = data?.filter((note) => note.category === category);

  return (
    <ul>
      {filteredDevNotes?.map((note) => (
        <li className="text-sm" key={note.devnote_id}>
          {truncateString(note.title)}
        </li>
      ))}
    </ul>
  );
};

export default DevNoteDisplay;
