import { DevNotes } from "@/services/devnote/types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkCold } from "react-syntax-highlighter/dist/esm/styles/prism";

type DevNoteCardProps = DevNotes;
const DevNoteCard = (props: DevNoteCardProps) => {
  const { title, content } = props;

  return (
    <div className="border rounded-tl-md rounded-tr-md">
      <p className="font-semibold p-2">{title}</p>
      <SyntaxHighlighter
        customStyle={{
          borderBottomLeftRadius: "0.5rem",
          borderBottomRightRadius: "0.5rem",
          fontWeight: "bold",
          margin: 0,
          height: "100%",
        }}
        language="javascript"
        style={coldarkCold}
      >
        {`${content}`}
      </SyntaxHighlighter>
    </div>
  );
};

export default DevNoteCard;
