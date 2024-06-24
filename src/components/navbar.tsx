import { PlusIcon } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { UserButton } from "@clerk/clerk-react";
import AppLogo from "./app-logo";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <nav className="border-b py-3">
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <AppLogo />
        {/* Nav Items */}
        <div className="flex items-center gap-6">
          <Dialog onOpenChange={setIsModalOpen} open={isModalOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <PlusIcon size={17} /> Add Note
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create note</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

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
