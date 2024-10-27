import { Button, CreateUpdateNoteModal, PopConfirm } from "@/components";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { devNoteCardActions } from "@/data/devnote-card-actions";
import { onCopyTextToClipboard } from "@/lib/onCopyTextToClipboard";
import { truncateString } from "@/lib/truncateString";
import { useDeleteDevNote } from "@/services/devnote/mutations";
import { DevNotes } from "@/services/devnote/types";
import { Editor } from "@monaco-editor/react";
import { ClipboardCopy, Ellipsis } from "lucide-react";
import moment from "moment";
import { useState } from "react";

type DevNoteCardProps = DevNotes;
const DevNoteCard = (props: DevNoteCardProps) => {
  const { devnote_id, title, content, date_created, category } = props;
  const dataForUpdateValue: Omit<DevNotes, "date_created" | "author_id"> = {
    devnote_id,
    title,
    content,
    category,
  };

  const [openDeletePopConfirm, setOpenDeletePopConfirm] = useState(false);
  const [openUpdateNoteModal, setOpenUpdateNoteModal] = useState(false);
  const [openDropdownMenu, setOpenDropdownMenu] = useState(false);

  const { mutate: deleteDevNoteMutation } = useDeleteDevNote(() =>
    setOpenDeletePopConfirm(false)
  );

  const onActionClick = (key: string) => {
    setOpenDropdownMenu(false);
    if (key === "Delete") {
      return setOpenDeletePopConfirm(true);
    }

    return setOpenUpdateNoteModal(true);
  };
  // Implement new sidebar
  return (
    <div className="border rounded-tl-md rounded-tr-md mb-2">
      <div className="flex items-start justify-between">
        <div className="p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="font-semibold cursor-default">
                {truncateString(title)}
              </p>
            </TooltipTrigger>
            <TooltipContent>
              <p>{title}</p>
            </TooltipContent>
          </Tooltip>
          <Badge>{category}</Badge>
          <p className="text-xs">
            Date Created: {moment(date_created).format("LLL")}
          </p>
        </div>
        <DropdownMenu
          open={openDropdownMenu}
          onOpenChange={setOpenDropdownMenu}
        >
          <DropdownMenuTrigger>
            <Button variant="ghost" size="sm">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {devNoteCardActions.map((action) => (
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
      <div className="relative group h-[300px] w-full">
        <Editor
          language={category.toLowerCase()}
          theme="vs-dark"
          value={content}
          options={{
            lineNumbers: "off",
            wordWrap: "on",
            readOnly: true,
            fontSize: 12,
            minimap: {
              enabled: false,
            },
            folding: false,
          }}
        />
        <div className="flex items-center gap-1 absolute top-4 right-5 cursor-pointer scale-0 group-hover:scale-100 duration-150 ease-in-out">
          <div className="flex items-center gap-1 text-gray-400 hover:text-white hover:bg-gray-400 p-1 rounded-sm duration-150 ease-in-out">
            <p className="text-xs">Copy Code</p>
            <ClipboardCopy
              size={15}
              onClick={() => onCopyTextToClipboard(content)}
            />
          </div>
        </div>
      </div>
      <PopConfirm
        open={openDeletePopConfirm}
        onOpenChange={setOpenDeletePopConfirm}
        onConfirm={() => deleteDevNoteMutation(devnote_id)}
        title="Delete Note"
        description="Do you want to delete the entry? Deleting this entry cannot be undone."
      />
      <CreateUpdateNoteModal
        open={openUpdateNoteModal}
        onOpenChange={setOpenUpdateNoteModal}
        isDataForUpdate={true}
        dataForUpdate={dataForUpdateValue}
      />
    </div>
  );
};

export default DevNoteCard;
