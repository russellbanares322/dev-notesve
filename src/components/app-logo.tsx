import { useSidebarStore } from "@/store/useSidebarStore";
import { FileCode2 } from "lucide-react";

const AppLogo = () => {
  const { isSidebarCollapsed } = useSidebarStore();

  if (isSidebarCollapsed) {
    return (
      <div className="flex items-center justify-center flex-col">
        <FileCode2 size={20} />
        <div className="flex">
          <p className="text-[0.6rem] -translate-y-1">Dev</p>
          <p className="text-[0.6rem]">Notesve</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center">
      <h1 className="flex items-center bg-black text-white px-1 border-l border-l-gray-200">
        <FileCode2 size={20} />
        Dev
      </h1>
      <h1 className=" bg-gray-200 text-black px-1 border-r border-r-black">
        Notesve
      </h1>
    </div>
  );
};

export default AppLogo;
