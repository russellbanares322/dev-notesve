import { FileCode2, PlusIcon } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

const Navbar = () => {
  const isLoggedIn = true;

  return (
    <nav className="border-b py-3">
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <div>
          <h1 className="flex items-center gap-1 font-semibold">
            <FileCode2 size={20} />
            DevNotesve
          </h1>
        </div>
        {/* Nav Items */}
        <div className="flex items-center gap-6">
          {isLoggedIn && (
            <Button className="flex items-center gap-2">
              <PlusIcon size={17} /> Add Note
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
