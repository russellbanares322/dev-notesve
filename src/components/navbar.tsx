import { PlusIcon } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { UserButton } from "@clerk/clerk-react";
import AppLogo from "./app-logo";
import { useGetDevNotesByAuthorId } from "@/services/devnote/queries";

const Navbar = () => {
  const { data } = useGetDevNotesByAuthorId("a1");

  console.log(data);
  return (
    <nav className="border-b py-3">
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <AppLogo />
        {/* Nav Items */}
        <div className="flex items-center gap-6">
          <Button className="flex items-center gap-2">
            <PlusIcon size={17} /> Add Note
          </Button>
          <div className="flex items-center gap-2 ml-5">
            <ModeToggle />
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
