import { twMerge } from "tailwind-merge";
import AppLogo from "../app-logo";

const Sidebar = () => {
  const isCollapsed = false;

  return (
    <div
      className={twMerge(
        isCollapsed ? "w-[80px]" : "w-[250px]",
        "p-2 shadow-slate-400 shadow-sm mr-[1px] duration-500 ease-in-out"
      )}
    >
      <div>
        <div className="flex items-center justify-center py-3">
          <AppLogo />
        </div>
        <ul className="pl-3 mt-8 space-y-4">
          <li>NextJS Installation</li>
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
