import { VNode, VDOM } from "./types";
type Component = (props?: Record<string, any>) => VDOM;

export const createVDOM = (
  component: string | Component,
  props: Record<string, any> | null,
  ...children: VNode[]
) => {
  if (typeof component === "function") {
    return component({ ...props, children });
  }
  const arr = children.flat().map((child) => {
    if (typeof child === "string" || typeof child === "number") {
      return child;
    } else if (child === undefined || child === null) {
      return { type: "fragment", props: null, children: [] };
    } else if (typeof child === "object") {
      return { ...child };
    }
  });
  return { type: component, props, children: arr };
};
