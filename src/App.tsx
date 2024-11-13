import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { ContentWrapper, ModeToggle, SignInButton } from "./components";
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes/routes";
import { useCreateUser } from "./services/user/mutations";
import { useEffect } from "react";

function App() {
  const { isSignedIn, user } = useUser();
  const { mutate: createUserMutation } = useCreateUser(user?.id as string);
  const Authenticated = SignedIn;
  const UnAuthenticated = SignedOut;

  useEffect(() => {
    if (isSignedIn) {
      createUserMutation({
        user_id: user?.id,
        first_name: user?.firstName as string,
        last_name: user?.lastName as string,
      });
    }
  }, [isSignedIn]);

  const renderRoutes = () => {
    return routes.map((route) => (
      <Route
        key={route.path}
        path={route.path}
        element={<ContentWrapper>{route.element}</ContentWrapper>}
      >
        {route?.child?.map((childRoute) => (
          <Route
            key={childRoute.path}
            path={childRoute.path}
            element={childRoute.element}
          />
        ))}
      </Route>
    ));
  };

  return (
    <div>
      {/* Show main page when user is authenticated */}
      <Authenticated>
        <Routes>{renderRoutes()}</Routes>
      </Authenticated>
      {/* Show login page when user is not authenticated */}
      <UnAuthenticated>
        <SignInButton />
      </UnAuthenticated>
      <ModeToggle />
    </div>
  );
}

export default App;
