import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Footer, Navbar, SignInButton } from "./components";
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes/routes";

function App() {
  return (
    <div>
      {/* Show main page when user is authenticated */}
      <SignedIn>
        <Navbar />
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
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
