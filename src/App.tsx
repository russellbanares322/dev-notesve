import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { ContentWrapper, ModeToggle, SignInButton } from "./components";
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes/routes";
import { useCreateUser } from "./services/user/mutations";
import { useCheckIfUserExistInDb } from "./services/user/queries";
import { useEffect } from "react";

function App() {
  const { isSignedIn, user } = useUser();
  const { data: response } = useCheckIfUserExistInDb(user?.id);
  const { mutate: createUserMutation } = useCreateUser();
  const doesUserExist = response?.data;

  useEffect(() => {
    if (isSignedIn) {
      if (!doesUserExist) {
        createUserMutation({
          user_id: user?.id,
          first_name: user?.firstName as string,
          last_name: user?.lastName as string,
        });
      }
    }
  }, [doesUserExist, isSignedIn]);

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
      <SignedIn>
        <Routes>{renderRoutes()}</Routes>
      </SignedIn>
      {/* Show login page when user is not authenticated */}
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <ModeToggle />
    </div>
  );
}

export default App;
