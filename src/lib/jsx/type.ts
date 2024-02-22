export type VNode = string | number | VDOM;
export type VDOM = {
  type: string;
  props: Record<string, any> | null;
  children: VNode[];
};
