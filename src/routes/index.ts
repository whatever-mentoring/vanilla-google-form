import PageNotFound from "../not-found";
import type { Route } from "../lib/router";
import HomePage from "@/pages/home";
import FirstPage from "@/pages/servey/first";
import SecondPage from "@/pages/servey/second";

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
