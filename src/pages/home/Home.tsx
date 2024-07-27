import { useDisplayDevNotesStore } from "@/store/useDisplayDevNotesStore";
import {
  AppLogo,
  Button,
  CreateUpdateNoteModal,
  SelectedDevNoteTab,
} from "@/components";
import { FilePlus2 } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const { selectedDevNotes } = useDisplayDevNotesStore();
  const isSelectedDevNotesEmpty = selectedDevNotes?.length === 0;
  const navigate = useNavigate();

  useEffect(() => {
    if (isSelectedDevNotesEmpty) {
      navigate("/");
    }
  }, [isSelectedDevNotesEmpty]);

  return (
    <div className="container min-h-screen h-full">
      {isSelectedDevNotesEmpty && (
        <div className="flex flex-col items-center justify-center gap-5 min-h-screen">
          <AppLogo />
          <h1 className="text-xl">Browse or create new note</h1>
          <CreateUpdateNoteModal
            buttonTrigger={
              <Button>
                Create new note <FilePlus2 className="ml-1" />
              </Button>
            }
          />
        </div>
      )}
      {!isSelectedDevNotesEmpty && <SelectedDevNoteTab />}
      {/* Render selected dev note and implement crud action */}
      <Outlet />
    </div>
  );
};

export default Home;
