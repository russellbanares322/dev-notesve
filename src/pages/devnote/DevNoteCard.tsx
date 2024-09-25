import { Button } from "@/components";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useToast } from "@/components/ui/use-toast";
import { dedvNoteCardActions } from "@/data/devnote-card-actions";
import { truncateString } from "@/lib/truncateString";
import { useDeleteDevNote } from "@/services/devnote/mutations";
import { DevNotes } from "@/services/devnote/types";
import { Copy, Ellipsis } from "lucide-react";
import moment from "moment";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkCold } from "react-syntax-highlighter/dist/esm/styles/prism";

type DevNoteCardProps = DevNotes;
const DevNoteCard = (props: DevNoteCardProps) => {
  const { devnote_id, title, content, date_created, category } = props;
  const { toast } = useToast();

  const { mutate: deleteDevNoteMutation } = useDeleteDevNote(() =>
    console.log("Deleted")
  );

  const onCopyCode = () => {
    try {
      navigator.clipboard.writeText(content);
      toast({
        description: "Successfully copied code to clipboard",
      });
    } catch (error) {
      toast({
        description: "Failed to copy code",
        variant: "destructive",
      });
    }
  };

  const onActionClick = (key: string) => {
    if (key === "delete") {
      return deleteDevNoteMutation(devnote_id);
    }
  };

  return (
    <div className="border rounded-tl-md rounded-tr-md mb-20">
      <div className="flex items-start justify-between">
        <div className="p-2">
          <p className="font-semibold">{truncateString(title)}</p>
          <Badge>{category}</Badge>
          <p className="text-xs">
            Date Created: {moment(date_created).format("LLL")}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {dedvNoteCardActions.map((action) => (
              <DropdownMenuItem
                onClick={() => onActionClick(action.key)}
                key={action.key}
              >
                {action.icon}
                {action.title}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="relative group h-full w-full">
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
        <Copy
          onClick={onCopyCode}
          className="absolute top-2 right-2 text-black cursor-pointer scale-0 group-hover:scale-100 duration-150 ease-in-out bg-slate-200"
        />
      </div>
    </div>
  );
};

export default DevNoteCard;
