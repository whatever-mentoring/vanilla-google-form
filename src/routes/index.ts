import PageNotFound from "../not-found";
import type { Route } from "../lib/router";
import HomePage from "@/pages/home/page";
import FirstPage from "@/pages/servey/first/page";
import SecondPage from "@/pages/servey/second/page";

export const routes: Route[] = [
  {
    path: "/",
    element: HomePage,
    errorElement: PageNotFound,
    children: [
      {
        path: "servey",
        children: [
          {
            path: "first",
            element: FirstPage,
          },
          {
            path: "second",
            element: SecondPage,
          },
        ],
      },
    ],
  },
] as const;
