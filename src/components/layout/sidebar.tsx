import { twMerge } from "tailwind-merge";
import { truncateString } from "@/lib/truncateString";
import { UserButton, useUser } from "@clerk/clerk-react";
import { useGetDevNoteCategories } from "@/services/devnote/queries";
import { ChevronDown, ChevronRight, Folder } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/context/theme-provider";
import { DevNotesFileDisplay } from "@/pages";

const Sidebar = () => {
  const { user } = useUser();
  const { data } = useGetDevNoteCategories(user?.id as string);
  const { isDarkTheme } = useTheme();
  // This state is for dynamically showing each individual sidebar file
  const [collapsedSidebarFolders, setCollapsedSidebarFolders] = useState<
    string[]
  >([]);
  // This state is for dynamically showing all of the sidebar folder
  const [showSidebarFolders, setShowSidebarFolders] = useState(true);

  const isSidebarFolderCollapsed = (category: string) => {
    const collapsedSidebarItem = collapsedSidebarFolders.includes(category);

    return collapsedSidebarItem;
  };

  const toggleSidebarFoldersVisibility = () => {
    setShowSidebarFolders((prev) => !prev);
  };

  const handleCollapseSidebarItem = (category: string) => {
    if (isSidebarFolderCollapsed(category)) {
      const filteredCollapsedSidebarItems = collapsedSidebarFolders.filter(
        (item) => item !== category
      );
      setCollapsedSidebarFolders(filteredCollapsedSidebarItems);
    } else {
      1;
      setCollapsedSidebarFolders([...collapsedSidebarFolders, category]);
    }
  };

  return (
    <div className="p-2 shadow-slate-400 shadow-sm mr-[1px] duration-500 ease-in-out w-full max-w-[250px]">
      <div className="pt-3">
        <div className="flex items-center justify-between mb-3 border-b border-0 border-solid pb-3">
          <p>
            Hi, <strong>{user?.firstName}</strong>
          </p>
          <UserButton />
        </div>
        <div
          className="flex gap-1 mb-2 cursor-pointer"
          onClick={toggleSidebarFoldersVisibility}
        >
          {!showSidebarFolders && (
            <ChevronRight className="-translate-y-[1.5px]" />
          )}
          {showSidebarFolders && (
            <ChevronDown className="-translate-y-[1.5px]" />
          )}
          <p className="text-sm font-semibold">DEV-NOTESVE</p>
        </div>
        <ul
          className={twMerge(
            showSidebarFolders
              ? "translate-y-[1px] opacity-100"
              : "-translate-y-5 opacity-0 pointer-events-none",
            "pl-4 space-y-4 duration-150 ease-in-out"
          )}
        >
          {data?.map((category: string) => (
            <div className="space-y-4" key={category}>
              <div onClick={() => handleCollapseSidebarItem(category)}>
                <div className="flex items-center gap-3 cursor-pointer">
                  <Folder
                    className="text-gray-500"
                    fill={
                      isSidebarFolderCollapsed(category)
                        ? isDarkTheme
                          ? ""
                          : "#ffff"
                        : "#6b7280"
                    }
                  />
                  <li className="text-sm font-medium">
                    {truncateString(category)}
                  </li>
                </div>
              </div>
              {isSidebarFolderCollapsed(category) && (
                <DevNotesFileDisplay category={category} />
              )}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
