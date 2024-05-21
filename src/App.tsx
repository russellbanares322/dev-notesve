import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Footer, Navbar, SignInButton } from "./components";

function App() {
  return (
    <div>
      {/* Show main page when user is authenticated */}
      <SignedIn>
        <Navbar />
        Content
        <Footer />
      </SignedIn>
      {/* Show login page when user is not authenticated */}
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </div>
  );
}

export default App;
