import type { VNode } from "../jsx/types";
import { createElement } from "./client";

const diffTextVDOM = (newVDOM: VNode, currentVDOM: VNode) => {
  if (typeof newVDOM !== "string" && typeof currentVDOM === "string")
    return true;
  if (typeof newVDOM === "string" && typeof currentVDOM !== "string")
    return true;
  if (typeof newVDOM === "string" && typeof currentVDOM === "string") {
    if (newVDOM === currentVDOM) return false;
    return true;
  }
  return false;
};

const updateElement = (
  parent: Element,
  newVDOM: VNode,
  currentVDOM: VNode | null,
  index: number = 0
) => {
  if (parent.childNodes) {
    if (!newVDOM && currentVDOM) {
      return parent.removeChild(parent.childNodes[index]);
    }
  }

  if (!currentVDOM) {
    return parent.appendChild(createElement(newVDOM));
  }

  if (diffTextVDOM(newVDOM, currentVDOM)) {
    return parent.replaceChild(
      createElement(newVDOM),
      parent.childNodes[index]
    );
  }

  if (typeof newVDOM === "string" || typeof currentVDOM === "string") return;
  if (typeof newVDOM === "number" || typeof currentVDOM === "number") return;

  if (newVDOM.type !== currentVDOM.type) {
    return parent.replaceChild(
      createElement(newVDOM),
      parent.childNodes[index]
    );
  }

  updateAttributes(
    parent.childNodes[index] as Element,
    newVDOM.props ?? {},
    currentVDOM.props ?? {}
  );

  const maxLength = Math.max(
    newVDOM.children.length,
    currentVDOM.children.length
  );
  for (let i = 0; i < maxLength; i++) {
    updateElement(
      parent.childNodes[index] as Element,
      newVDOM.children[i],
      currentVDOM.children[i],
      i
    );
  }
};

function updateAttributes(
  target: Element,
  newProps: Record<string, any>,
  oldProps: Record<string, any>
) {
  for (const [attr, value] of Object.entries(newProps)) {
    if (oldProps[attr] === newProps[attr]) continue;
    (target as any)[attr] = value;
  }

  for (const attr of Object.keys(oldProps)) {
    if (newProps[attr] !== undefined) continue;
    target.removeAttribute(attr);
  }
}

export { updateElement };
