import { twMerge } from "tailwind-merge";
import AppLogo from "../app-logo";
import { truncateString } from "@/lib/truncateString";
import { useSidebar } from "@/context/sidebar-provider";
import { useUser } from "@clerk/clerk-react";
import { useGetDevNoteCategories } from "@/services/devnote/queries";
import { Folder } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useState } from "react";

const Sidebar = () => {
  const { isSidebarCollapsed } = useSidebar();
  const { user } = useUser();
  const { data } = useGetDevNoteCategories(user?.id as string);
  const [collapsedSidebarItems, setCollapsedSidebarItems] = useState<string[]>(
    []
  );

  const isSidebarItemCollapsed = (category: string) => {
    const collapsedSidebarItem = collapsedSidebarItems.includes(category);

    return collapsedSidebarItem;
  };

  const handleCollapseSidebarItem = (category: string) => {
    if (isSidebarItemCollapsed(category)) {
      const filteredCollapsedSidebarItems = collapsedSidebarItems.filter(
        (item) => item !== category
      );
      setCollapsedSidebarItems(filteredCollapsedSidebarItems);
    } else {
      setCollapsedSidebarItems([...collapsedSidebarItems, category]);
    }
  };

  const renderSidebarItemIcon = (category: string) => {
    const iconElement = (
      <Folder
        className="text-gray-300"
        fill={isSidebarItemCollapsed(category) ? "" : "#d1d5db"}
      />
    );

    return isSidebarCollapsed ? (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{iconElement}</TooltipTrigger>
          <TooltipContent side="right">
            <p>{category}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ) : (
      iconElement
    );
  };

  return (
    <div
      className={twMerge(
        isSidebarCollapsed ? "w-[80px]" : "w-[250px]",
        "p-2 shadow-slate-400 shadow-sm mr-[1px] duration-500 ease-in-out"
      )}
    >
      <div>
        <div className="flex items-center justify-center py-3">
          <AppLogo />
        </div>
        <ul className="pl-3 mt-8 space-y-4">
          {data?.map((category: string) => (
            <div
              className="flex items-center gap-3 cursor-pointer pl-2"
              key={category}
              onClick={() => handleCollapseSidebarItem(category)}
            >
              {renderSidebarItemIcon(category)}
              {!isSidebarCollapsed && (
                <li className="text-sm text-gray-300 hover:text-white">
                  {truncateString(category)}
                </li>
              )}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
