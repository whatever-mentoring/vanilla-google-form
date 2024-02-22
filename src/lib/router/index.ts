import { render } from "../dom";
import type { Component } from "../dom/types";
import { pathToRegex } from "./utils";

type HistoryChangeEventData = {
  path: string;
  search: string;
  isReplace?: boolean;
};

export type Route = {
  path: string;
  element?: Component;
  errorElement?: Component;
  children?: Route[];
};

const navigateTo = ({
  path,
  search,
  isReplace = false,
}: HistoryChangeEventData) => {
  const historyChange = new CustomEvent<HistoryChangeEventData>(
    "historychange",
    {
      detail: {
        path,
        search,
        isReplace,
      },
    }
  );
  dispatchEvent(historyChange);
};

let pageParams: any;

const router = (root: HTMLElement, routes: Route[]) => {
  const matchUrlToRoute = (routes: Route[], path: string) => {
    const segments = path.split("/").map((segment) => {
      if (segment === "") return "/";
      return segment;
    });
    if (segments.length <= 2 && segments[1] === "/") {
      return { Component: routes[0].element, params: undefined };
    }
    function traverse(
      routes: Route[],
      segments: string[],
      errorComponent?: Component
    ) {
      for (const route of routes) {
        const { path, children, element, errorElement } = route;
        const regex = pathToRegex(path);
        const [pathname, segment] = segments[0].match(regex) || [];
        if (!pathname) continue;
        if (segments.length === 1) {
          return { Component: element, params: segment };
        } else if (children) {
          return traverse(
            children,
            segments.slice(1),
            errorElement ?? errorComponent
          );
        } else {
          return { Component: errorComponent, params: undefined };
        }
      }
      return { Component: errorComponent, params: undefined };
    }
    ``;
    return traverse(routes, segments);
  };
  const loadRouteComponent = (path: string) => {
    const { Component, params } = matchUrlToRoute(routes, path);
    if (!Component) {
      throw new Error("no matching component error");
    } else {
      pageParams = params;
      render(root, Component);
    }
  };
  // attach "data-link" to attribute of anchor tag when use custom anchor tag
  const customizeAnchorBehavior = () => {
    window.addEventListener("click", (e) => {
      const el = e.target as HTMLElement;
      const anchor = el.closest("a[data-link]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (!anchor) return;
      e.preventDefault();
      push(anchor.pathname + anchor.search);
    });
  };
  const initLoad = () => {
    loadRouteComponent(currentPath());
    customizeAnchorBehavior();

    window.addEventListener("historychange", (e: unknown) => {
      const {
        detail: { path, search, isReplace },
      } = e as CustomEvent<HistoryChangeEventData>;
      if (isReplace) {
        window.history.replaceState({}, "", path + search);
      } else {
        window.history.pushState(
          {
            scrollTop:
              document.body.scrollHeight ||
              document.documentElement.scrollHeight,
          },
          "",
          path + search
        );
      }
      loadRouteComponent(path);
    });

    window.addEventListener("popstate", () => {
      loadRouteComponent(currentPath());
    });
  };
  initLoad();
};

const getPageParams = () => {
  return pageParams;
};

const replace = (path: string) => {
  const { pathname, search } = new URL(window.location.origin + path);
  navigateTo({ path: pathname, search, isReplace: true });
};
const push = (path: string) => {
  const { pathname, search } = new URL(window.location.origin + path);
  navigateTo({ path: pathname, search });
};
const pop = () => {
  window.history.back();
};
const currentPath = () => {
  return window.location.pathname;
};

export { router, replace, push, pop, currentPath, getPageParams };
