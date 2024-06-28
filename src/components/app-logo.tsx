import { FileCode2 } from "lucide-react";

/**
 * TODO: Style this conditionally, depending on sidebar if it is collapsed or not
 */
const AppLogo = () => {
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
