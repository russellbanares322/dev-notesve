import { AppLogo, Button, CreateUpdateNoteModal } from "@/components";
import { FilePlus2 } from "lucide-react";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="container min-h-screen h-full">
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
      {/* Render selected dev note and implement crud action */}
      <Outlet />
    </div>
  );
};

export default Home;
