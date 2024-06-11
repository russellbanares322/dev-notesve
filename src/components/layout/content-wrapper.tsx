import { MenuIcon } from "lucide-react";
import Sidebar from "./sidebar";
import { Button } from "../ui/button";

type ContentWrapperProps = {
  children: React.ReactNode;
};
const ContentWrapper = ({ children }: ContentWrapperProps) => {
  return (
    <div className="flex items-start h-full gap-1 mt-10 container relative">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="absolute -top-6 left-2 md:hidden">
        <Button size="sm">
          <MenuIcon />
        </Button>
      </div>
      <div className="pl-4 md:pl-0">{children}</div>
    </div>
  );
};

export default ContentWrapper;
