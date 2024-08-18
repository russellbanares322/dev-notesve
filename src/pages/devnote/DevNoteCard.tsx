import { Button } from "@/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { dedvNoteCardActions } from "@/data/devnote-card-actions";
import { truncateString } from "@/lib/truncateString";
import { DevNotes } from "@/services/devnote/types";
import { Ellipsis } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkCold } from "react-syntax-highlighter/dist/esm/styles/prism";

type DevNoteCardProps = DevNotes;
const DevNoteCard = (props: DevNoteCardProps) => {
  const { title, content } = props;

  return (
    <div className="border rounded-tl-md rounded-tr-md">
      <div className="flex items-center justify-between">
        <p className="font-semibold p-2">{truncateString(title)}</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {dedvNoteCardActions.map((action) => (
              <DropdownMenuItem key={action.key}>
                {action.icon}
                {action.title}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
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
