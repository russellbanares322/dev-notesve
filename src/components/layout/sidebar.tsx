import { twMerge } from "tailwind-merge";
import AppLogo from "../app-logo";
import { FileCode2 } from "lucide-react";
import { truncateString } from "@/lib/truncateString";
import { useSidebar } from "@/context/sidebar-provider";

const Sidebar = () => {
  const { isSidebarCollapsed } = useSidebar();

  const renderAppLogo = isSidebarCollapsed ? (
    <FileCode2 size={20} />
  ) : (
    <AppLogo />
  );

  return (
    <div
      className={twMerge(
        isSidebarCollapsed ? "w-[80px]" : "w-[250px]",
        "p-2 shadow-slate-400 shadow-sm mr-[1px] duration-500 ease-in-out"
      )}
    >
      <div>
        <div className="flex items-center justify-center py-3">
          {renderAppLogo}
        </div>
        <ul className="pl-3 mt-8 space-y-4">
          <li>{truncateString("NextJS Installationasdasdasdsa")}</li>
          <li>useSample Hook</li>
          <li>Algorithm</li>
          <li>Algorithm</li>
          <li>Algorithm</li>
          <li>Algorithm</li>
          <li>Algorithm</li>
          <li>Algorithm</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
