import PageNotFound from "../not-found";
import type { Route } from "../lib/router";
import HomePage from "@/pages/home";
import AboutPage from "@/pages/about";

export const routes: Route[] = [
  {
    path: "/",
    element: HomePage,
    errorElement: PageNotFound,
    children: [
      {
        path: "about",
        children: [
          {
            path: ":id",
            element: AboutPage,
          },
        ],
      },
    ],
  },
] as const;
