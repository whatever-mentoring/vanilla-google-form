import type { VNode } from "../jsx/types";

const createElement = (node: VNode) => {
  if (typeof node === "string" || typeof node === "number") {
    return document.createTextNode(String(node));
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

export { createElement };
