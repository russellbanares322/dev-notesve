import { useDisplayDevNotesStore } from "@/store/useDisplayDevNotesStore";
import { AppLogo, Button, SelectedDevNoteTab } from "@/components";
import { FilePlus2 } from "lucide-react";

const Home = () => {
  const { selectedDevNotes } = useDisplayDevNotesStore();
  const isSelectedDevNotesEmpty = selectedDevNotes.length === 0;
  return (
    <div className="container min-h-screen h-full">
      {isSelectedDevNotesEmpty && (
        <div className="flex flex-col items-center justify-center gap-5 min-h-screen">
          <AppLogo />
          <h1 className="text-xl">Browse or create new note</h1>
          <Button>
            Create new note <FilePlus2 className="ml-1" />
          </Button>
        </div>
      )}
      {!isSelectedDevNotesEmpty && <SelectedDevNoteTab />}
    </div>
  );
};

export default Home;
