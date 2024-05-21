import { LogInIcon } from "lucide-react";
import { Button } from "./ui/button";
import { SignInButton as ClerkSignInButton } from "@clerk/clerk-react";

const SignInButton = () => {
  return (
    <div className="flex items-center justify-center h-full min-h-[100vh]">
      <ClerkSignInButton mode="modal">
        <Button className="flex items-center gap-2">
          <LogInIcon size={17} /> Sign In
        </Button>
      </ClerkSignInButton>
    </div>
  );
};

export default SignInButton;
