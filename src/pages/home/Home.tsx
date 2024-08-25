import { AppLogo, Button, CreateUpdateNoteModal } from "@/components";
import { useGetDevNotesByAuthorId } from "@/services/devnote/queries";
import { useUser } from "@clerk/clerk-react";
import { FilePlus2 } from "lucide-react";
import { Outlet } from "react-router-dom";
import DevNoteCard from "../devnote/DevNoteCard";
import DevNoteFilterOptions from "../devnote/DevNoteFilterOptions";
import { useState } from "react";
import { SortDirectionValue } from "@/services/devnote/types";

const Home = () => {
  const { user } = useUser();
  const [sortDirection, setSortDirection] = useState<SortDirectionValue>("1");

  const { data } = useGetDevNotesByAuthorId({
    author_id: user?.id as string,
    sort_direction: sortDirection,
  });
  const isDataEmpty = data?.length === 0;

  const onSelectSortDirection = (value: SortDirectionValue) => {
    setSortDirection(value);
  };

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
      {!isDataEmpty && (
        <div className="mt-10 space-y-5">
          <div className="flex items-center justify-between">
            {/* Devnote Filter Options */}
            <DevNoteFilterOptions
              onSelectSortDirection={onSelectSortDirection}
              currentSelectedSortDirection={sortDirection}
            />
            {/* Add Devnote Button */}
            <CreateUpdateNoteModal
              buttonTrigger={
                <Button>
                  Create new note <FilePlus2 className="ml-1" />
                </Button>
              }
            />
          </div>
          {/* Devnote Card */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {data?.map((item) => (
              <DevNoteCard {...item} />
            ))}
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default Home;
