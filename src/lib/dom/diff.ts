import { VNode } from "../jsx/type";
import { createElement } from "./client";

const updateElement = (
  parent: Element,
  newVDOM: VNode,
  currentVDOM: VNode,
  index: number = 0
) => {
  // 1. oldNode만 있는 경우
  if (!newVDOM && currentVDOM) {
    return parent.removeChild(parent.childNodes[index]);
  }

  // 2. newVDOM만 있는 경우
  if (newVDOM && !currentVDOM) {
    return parent.appendChild(createElement(newVDOM));
  }

  // 3. currentVDOM newVDOM 모두 text 타입일 경우
  if (typeof newVDOM === "string" && typeof currentVDOM === "string") {
    if (newVDOM === currentVDOM) return;
    return parent.replaceChild(
      createElement(newVDOM),
      parent.childNodes[index]
    );
  }

  if (typeof newVDOM === "string" || typeof currentVDOM === "string") return;
  if (typeof newVDOM === "number" || typeof currentVDOM === "number") return;

  // 4. currentVDOM newVDOM의 태그 이름(type)이 다를 경우
  if (newVDOM.type !== currentVDOM.type) {
    return parent.replaceChild(
      createElement(newVDOM),
      parent.childNodes[index]
    );
  }

  // 5. currentVDOM newVDOM의 태그 이름(type)이 같을 경우
  updateAttributes(
    parent.childNodes[index] as Element,
    newVDOM.props ?? {},
    currentVDOM.props ?? {}
  );

  // 6. newVDOM와 oldNode의 모든 자식 태그를 순회하며 1 ~ 5의 내용을 반복한다.
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

// 5 - newVDOM와 oldNode의 attribute를 비교하여 변경된 부분만 반영한다.
function updateAttributes(
  target: Element,
  newProps: Record<string, any>,
  oldProps: Record<string, any>
) {
  // 달라지거나 추가된 Props를 반영
  for (const [attr, value] of Object.entries(newProps)) {
    if (oldProps[attr] === newProps[attr]) continue;
    (target as any)[attr] = value;
  }

  // 없어진 props를 attribute에서 제거
  for (const attr of Object.keys(oldProps)) {
    if (newProps[attr] !== undefined) continue;
    target.removeAttribute(attr);
  }
}

export { updateElement };
