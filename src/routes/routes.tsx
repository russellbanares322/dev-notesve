import { Home } from "@/pages";

type Routes = {
  path: string;
  name: string;
  element: React.ReactNode;
  child?: Routes[];
};

export const routes: Routes[] = [
  {
    path: "/",
    name: "Home",
    element: <Home />,
  },
];
