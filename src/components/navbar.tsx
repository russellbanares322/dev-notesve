import { UserButton, useUser } from "@clerk/clerk-react";
import AppLogo from "./app-logo";

const Navbar = () => {
  const { user } = useUser();

  return (
    <div className="flex items-center justify-between border-b pb-3">
      {/* App Logo */}
      <AppLogo />
      {/* User Account Menu */}
      <div className="flex items-center gap-2">
        <p>{`Hi, ${user?.fullName}`}</p>
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
