import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { ContentWrapper, Footer, SignInButton } from "./components";
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes/routes";

function App() {
  return (
    <div>
      {/* Show main page when user is authenticated */}
      <SignedIn>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<ContentWrapper>{route.element}</ContentWrapper>}
            />
          ))}
        </Routes>
      </SignedIn>
      {/* Show login page when user is not authenticated */}
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </div>
  );
}

export default App;
