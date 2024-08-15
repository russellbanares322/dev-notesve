import { useGetDevNote } from "@/services/devnote/queries";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Dot, FilePenLine } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkCold } from "react-syntax-highlighter/dist/esm/styles/prism";

const DevNoteDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetDevNote(id as string);

  return (
    <div className="mt-5">
      <div className="flex flex-col items-center justify-start">
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <Badge>{data?.category}</Badge>
            <Dot />
            <h1 className="text-xl font-semibold">
              {data?.title?.toUpperCase()}
            </h1>
          </div>
          <Button variant="ghost" size="sm">
            <FilePenLine size={20} />
          </Button>
        </div>
        <span className="font-light text-xs">
          Date Created:{" "}
          <span className="font-medium">
            {moment(data?.date_created)?.format("LLL")}
          </span>
        </span>
      </div>
      <div className="mt-10 max-w-5xl mx-auto">
        <SyntaxHighlighter
          customStyle={{
            borderRadius: "1rem",
            fontWeight: "bold",
          }}
          language="javascript"
          style={coldarkCold}
        >
          {`${data?.content}`}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default DevNoteDetails;
