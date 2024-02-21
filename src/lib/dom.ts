import { VDOM } from "./jsx/type";

const createElement = (node: string | VDOM) => {
  if (typeof node === "string") {
    return document.createTextNode(node);
  }
  const element = document.createElement(node.type);

  Object.entries(node.props || {}).forEach(([attr, value]) => {
    if (attr.startsWith("data-")) {
      element.dataset[attr.slice(5)] = value;
    } else {
      (element as any)[attr] = value;
    }
  });

  // node의 children virtual dom을 dom으로 변환한다.
  const children = node.children.map(createElement);

  // element에 변환된 children dom을 추가한다.
  children.forEach((child) => element.appendChild(child));

  // 변환된 dom을 반환한다.
  return element;
};

const createRoot = (el: HTMLElement) => {
  return {
    render: (component: string | VDOM) => {
      const _el = createElement(component);
      el.appendChild(_el);
    },
  };
};

export { createElement, createRoot };
