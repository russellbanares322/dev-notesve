import { useGetDevNote } from "@/services/devnote/queries";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Dot } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const DevNoteDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetDevNote(id as string);

  return (
    <div className="mt-5">
      <div className="flex flex-col items-center justify-start">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold">
            {data?.title?.toUpperCase()}
          </h1>
          <Dot />
          <Badge>{data?.category}</Badge>
        </div>
        <span className="font-light text-xs">
          Date Created:{" "}
          <span className="font-medium">
            {moment(data?.date_created)?.format("LLL")}
          </span>
        </span>
      </div>
      <div>
        <p>{data?.content}</p>
      </div>
    </div>
  );
};

export default DevNoteDetails;
