import { Child, VDOM } from "./type";
type Component = (props?: Record<string, any>) => VDOM;

export const createVDOM = (
  component: string | Component,
  props: Record<string, any> | null,
  ...children: Child[]
) => {
  if (typeof component === "function") {
    return component({ ...props });
  }
  return { type: component, props, children: children.flat() };
};
