import { DevNotes } from "@/services/devnote/types";

type DevNoteCardProps = DevNotes;
const DevNoteCard = (props: DevNoteCardProps) => {
  const { title } = props;

  return <div className="border">{title}</div>;
};

export default DevNoteCard;
