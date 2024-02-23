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
  let removeIndex: undefined | number = undefined;
  if (parent.childNodes) {
    if (!newVDOM && currentVDOM) {
      parent.removeChild(parent.childNodes[index]);
      return index;
    }
  }

  if (!currentVDOM) {
    parent.appendChild(createElement(newVDOM));
    return;
  }

  if (diffTextVDOM(newVDOM, currentVDOM)) {
    parent.replaceChild(createElement(newVDOM), parent.childNodes[index]);
    return;
  }

  if (typeof newVDOM === "string" || typeof currentVDOM === "string") return;
  if (typeof newVDOM === "number" || typeof currentVDOM === "number") return;

  if (newVDOM.type !== currentVDOM.type) {
    parent.replaceChild(createElement(newVDOM), parent.childNodes[index]);
    return;
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
    const _removeIndex = updateElement(
      parent.childNodes[index] as Element,
      newVDOM.children[i],
      currentVDOM.children[i],
      removeIndex ?? i
    );
    removeIndex = _removeIndex;
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
