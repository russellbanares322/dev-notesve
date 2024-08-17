import { AppLogo, Button, CreateUpdateNoteModal } from "@/components";
import { useGetDevNotesByAuthorId } from "@/services/devnote/queries";
import { useUser } from "@clerk/clerk-react";
import { FilePlus2 } from "lucide-react";
import { Outlet } from "react-router-dom";
import DevNoteCard from "../devnote/DevNoteCard";

const Home = () => {
  const { user } = useUser();
  const { data } = useGetDevNotesByAuthorId(user?.id as string);
  const isDataEmpty = data?.length === 0;

  return (
    <div className="container min-h-screen h-full">
      {isDataEmpty && (
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
      {/* Devnote Card */}
      <div className="flex items-center justify-center gap-2">
        {data?.map((item) => (
          <DevNoteCard {...item} />
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
