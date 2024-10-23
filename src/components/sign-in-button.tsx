import { LogInIcon } from "lucide-react";
import { Button } from "./ui/button";
import { SignInButton as ClerkSignInButton } from "@clerk/clerk-react";
import AppLogo from "./app-logo";

const SignInButton = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[95vh] gap-7">
      <div className="flex flex-col items-center justify-center gap-2">
        <AppLogo />
        <h1 className="text-3xl font-bold mt-7">Welcome backx</h1>
        <p>Sign in to access your dashboard, settings and notes.</p>
      </div>
      <ClerkSignInButton mode="modal">
        <Button className="flex items-center gap-2">
          <LogInIcon size={17} /> Connect with Google
        </Button>
      </ClerkSignInButton>
    </div>
  );
};

export default SignInButton;
