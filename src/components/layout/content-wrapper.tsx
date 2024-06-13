import { MenuIcon, X } from "lucide-react";
import Sidebar from "./sidebar";
import { Button } from "../ui/button";
import { useState } from "react";

type ContentWrapperProps = {
  children: React.ReactNode;
};
const ContentWrapper = ({ children }: ContentWrapperProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdownVisibility = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex items-start h-full gap-1 mt-10 container relative">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="absolute -top-6 left-2 md:hidden">
        <Button onClick={toggleDropdownVisibility} size="sm">
          {!isDropdownOpen && <MenuIcon />}
          {isDropdownOpen && <X />}
        </Button>
      </div>
      <div className="pl-4 pt-7 md:pl-0 md:pt-0">{children}</div>
    </div>
  );
};

export default ContentWrapper;
