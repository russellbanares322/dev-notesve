import { useGetDevNote } from "@/services/devnote/queries";
import { useParams } from "react-router-dom";
import moment from "moment";

const DevNoteDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetDevNote(id as string);

  return (
    <div className="mt-5">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl font-semibold">{data?.title?.toUpperCase()}</h1>
        <span className="font-normal text-xs">
          {moment(data?.date_created)?.format("LLL")}
        </span>
      </div>
    </div>
  );
};

export default DevNoteDetails;
