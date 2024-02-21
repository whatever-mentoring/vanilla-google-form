export type Child = string | VDOM;
export type VDOM = {
  type: string;
  props: Record<string, any> | null;
  children: Child[];
};
