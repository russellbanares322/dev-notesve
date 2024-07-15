import { DevNoteDetails, Home } from "@/pages";

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
    child: [
      {
        path: "devnote/:id",
        name: "DevNote Details",
        element: <DevNoteDetails />,
      },
    ],
  },
];
