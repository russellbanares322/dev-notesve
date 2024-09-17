import {
  AppLogo,
  Button,
  CreateUpdateNoteModal,
  Pagination,
} from "@/components";
import { useGetDevNotesByAuthorId } from "@/services/devnote/queries";
import { useUser } from "@clerk/clerk-react";
import { FilePlus2 } from "lucide-react";
import { Outlet } from "react-router-dom";
import DevNoteCard from "../devnote/DevNoteCard";
import DevNoteFilterOptions from "../devnote/DevNoteFilterOptions";
import { useEffect, useState } from "react";
import { SortDirectionValue } from "@/services/devnote/types";
import { twMerge } from "tailwind-merge";
import { useTheme } from "@/context/theme-provider";

const Home = () => {
  const { user } = useUser();
  const [sortDirection, setSortDirection] = useState<SortDirectionValue>("1");
  const [category, setCategory] = useState("ALL");
  const [makeFilterOptionSticky, setMakeFilterOptionSticky] = useState(false);
  const { isDarkTheme } = useTheme();
  const [pageNumber, setPageNumber] = useState(1);
  useGetDevNotesByAuthorId;
  const { data } = useGetDevNotesByAuthorId({
    author_id: user?.id as string,
    sort_direction: sortDirection,
    category: category === "ALL" ? "" : category,
    page_size: 10,
    page_number: 1,
  });
  const isDataEmpty = data?.length === 0;

  const onSelectSortDirection = (value: SortDirectionValue) => {
    setSortDirection(value);
  };

  const onSelectCategory = (value: string) => {
    setCategory(value);
  };

  const onMakeFilterOptionSticky = () => {
    return setMakeFilterOptionSticky(window.scrollY > 130);
  };

  const onPageNumberChange = (selectedPageNumber: number) => {
    setPageNumber(selectedPageNumber);
  };

  useEffect(() => {
    window.addEventListener("scroll", onMakeFilterOptionSticky);
    return () => {
      window.removeEventListener("scroll", onMakeFilterOptionSticky);
    };
  }, []);

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
        <div className="mt-10 space-y-5 min-h-screen h-full">
          <div
            className={twMerge(
              makeFilterOptionSticky
                ? "fixed top-0 left-0 right-0 mx-[200px] p-2 mt-1 rounded-md"
                : "static w-full",
              isDarkTheme ? "bg-background/70" : "bg-white/70",
              "flex items-center justify-between z-10"
            )}
          >
            {/* Devnote Filter Options */}
            <DevNoteFilterOptions
              onSelectSortDirection={onSelectSortDirection}
              currentSelectedSortDirection={sortDirection}
              onSelectCategory={onSelectCategory}
              category={category}
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
          <Pagination
            pageNumber={pageNumber}
            onPageNumberChange={onPageNumberChange}
            pageSize={10}
          />
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default Home;
