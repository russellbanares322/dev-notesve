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
import { useDebounce } from "@/hooks";
import { Skeleton } from "@/components/ui/skeleton";

const Home = () => {
  const { user } = useUser();
  const [sortDirection, setSortDirection] = useState<SortDirectionValue>("1");
  const [category, setCategory] = useState("ALL");
  const [search, setSearch] = useState("");
  const [makeFilterOptionSticky, setMakeFilterOptionSticky] = useState(false);
  const { isDarkTheme } = useTheme();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, _] = useState(10);
  const [openCreateUpdateNoteModal, setOpenCreateUpdateNoteModal] =
    useState(false);
  const { debouncedValue, isUserTyping } = useDebounce<string>(search);

  const { data } = useGetDevNotesByAuthorId({
    search: debouncedValue,
    author_id: user?.id as string,
    sort_direction: sortDirection,
    category: category === "ALL" ? "" : category,
    page_size: pageSize,
    page_number: pageNumber,
  });
  const isDataEmpty = data?.items?.length === 0;

  const onSelectSortDirection = (value: SortDirectionValue) => {
    setSortDirection(value);
  };

  const onSelectCategory = (value: string) => {
    setCategory(value);
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onMakeFilterOptionSticky = () => {
    return setMakeFilterOptionSticky(window.scrollY > 130);
  };

  const onPageNumberChange = (selectedPageNumber: number) => {
    setPageNumber(selectedPageNumber);
  };

  const handleOpenCreateUpdateNoteModal = () => {
    setOpenCreateUpdateNoteModal(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", onMakeFilterOptionSticky);
    return () => {
      window.removeEventListener("scroll", onMakeFilterOptionSticky);
    };
  }, []);

  // Properly check user information

  return (
    <div className="container min-h-screen h-full">
      {search === "" && !data && (
        <div className="flex flex-col items-center justify-center gap-5 min-h-screen">
          <AppLogo />
          <h1 className="text-xl">Browse or create new note</h1>
          <Button onClick={handleOpenCreateUpdateNoteModal}>
            Create new note <FilePlus2 className="ml-1" />
          </Button>
        </div>
      )}
      <div className="mt-10 space-y-5 min-h-screen h-full">
        <div
          className={twMerge(
            makeFilterOptionSticky
              ? "fixed top-0 left-0 right-0 mx-0 lg:mx-[200px] p-2 mt-1 rounded-md shadow-md"
              : "static w-full",
            isDarkTheme ? "bg-background/70" : "bg-white/90",
            "flex flex-wrap-reverse items-center justify-between z-10"
          )}
        >
          {/* Devnote Filter Options */}
          <DevNoteFilterOptions
            onSelectSortDirection={onSelectSortDirection}
            currentSelectedSortDirection={sortDirection}
            onSelectCategory={onSelectCategory}
            onSearchChange={onSearchChange}
            category={category}
            search={search}
          />
          {/* Add Devnote Button */}
          <Button onClick={handleOpenCreateUpdateNoteModal}>
            Create new note <FilePlus2 className="ml-1" />
          </Button>
        </div>
        <hr />
        {/* Devnote Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 grid-flow-row auto-rows-fr">
          {!isUserTyping &&
            search === "" &&
            !isDataEmpty &&
            data?.items?.map((item) => <DevNoteCard {...item} />)}
          {isUserTyping &&
            Array.from({ length: 5 })
              .fill("")
              .map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-[300px] w-[350px] rounded-tl-md rounded-tr-md"
                />
              ))}
        </div>
        {!isDataEmpty && data && (
          <Pagination
            pageNumber={pageNumber}
            onPageNumberChange={onPageNumberChange}
            pageSize={pageSize}
            totalPages={data?.totalPages as number}
          />
        )}
        {search && isDataEmpty && (
          <h1 className="text-center">
            No matches your query: <strong>{search}</strong>
          </h1>
        )}
      </div>
      <CreateUpdateNoteModal
        open={openCreateUpdateNoteModal}
        onOpenChange={setOpenCreateUpdateNoteModal}
      />
      <Outlet />
    </div>
  );
};

export default Home;
