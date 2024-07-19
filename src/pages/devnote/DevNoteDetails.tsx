import { useGetDevNote } from "@/services/devnote/queries";
import { useParams } from "react-router-dom";

const DevNoteDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetDevNote(id as string);

  return (
    <div>
      <h1>{JSON.stringify(data)}</h1>
    </div>
  );
};

export default DevNoteDetails;
