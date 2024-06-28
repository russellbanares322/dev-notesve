import { UserButton } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { ArrowLeftToLine, ArrowRightToLine } from "lucide-react";
import { useSidebar } from "@/context/sidebar-provider";

const Navbar = () => {
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();

  return (
    <nav className="py-3 shadow-slate-400 shadow-sm">
      <div className="flex items-center justify-between px-3">
        <Button onClick={toggleSidebar}>
          {isSidebarCollapsed ? <ArrowRightToLine /> : <ArrowLeftToLine />}
        </Button>
        {/* Nav Items */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 ml-5">
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
