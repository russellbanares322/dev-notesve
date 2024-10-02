import { Home, PageNotFound } from "@/pages";

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
  {
    path: "*",
    name: "404",
    element: <PageNotFound />,
  },
];
