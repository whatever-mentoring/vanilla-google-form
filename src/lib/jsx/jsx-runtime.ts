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
  return { type: component, props, children: children.flat() };
};
