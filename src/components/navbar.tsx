import { FileCode2 } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
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
        <ul className="flex items-center gap-3">
          <li>Home</li>
          <li>About</li>
          <ModeToggle />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
