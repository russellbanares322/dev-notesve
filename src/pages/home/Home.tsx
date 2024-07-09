import { useDisplayDevNotesStore } from "@/store/useDisplayDevNotesStore";
import DevNoteDetailsDisplay from "../devnote/DevNoteDetailsDisplay";

const Home = () => {
  const { selectedDevNotes } = useDisplayDevNotesStore();
  const isSelectedDevNotesEmpty = selectedDevNotes.length === 0;
  return (
    <div className="container min-h-screen h-full">
      {isSelectedDevNotesEmpty && <p>Display DevNotes Here</p>}
      {!isSelectedDevNotesEmpty && <DevNoteDetailsDisplay />}
    </div>
  );
};

export default Home;
