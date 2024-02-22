import { shallowEqual } from "@/utils/object";
import { createElement } from "./client";
import { updateElement } from "./diff";
import { VDOM } from "../jsx/type";

interface IRenderInfo {
  $root: HTMLElement | null;
  component: null | (() => any);
  currentVDOM: VDOM | null;
  newVDOM: VDOM | null;
}

const domRenderer = () => {
  const options = {
    states: [] as any,
    renderCount: 0,
    stateIndex: 0,
  };
  const renderInfo: IRenderInfo = {
    $root: null,
    component: null,
    currentVDOM: null,
    newVDOM: null,
  };
  const reset = () => {
    options.states = [];
    options.stateIndex = 0;
  };
  const _render = () => {
    const { $root, currentVDOM, component } = renderInfo;
    if (!$root || !currentVDOM) return;
    const VDOM = component!();
    updateElement($root, VDOM, currentVDOM);
    renderInfo.currentVDOM = VDOM;
    options.stateIndex = 0;
    options.renderCount += 1;
  };

  const render = (root: HTMLElement, component: () => any) => {
    renderInfo.$root = root;
    renderInfo.component = component;
    renderInfo.currentVDOM = component();
    const $el = createElement(renderInfo.currentVDOM!);
    renderInfo.$root?.appendChild($el);
    reset();
  };

  const useState = <T>(initialState?: T) => {
    const { stateIndex: index } = options;
    const state = (options.states[index] || initialState) as T;
    const setState = (newState: T) => {
      if (shallowEqual(state, newState)) return;
      options.states[index] = newState;
      _render();
    };
    options.stateIndex += 1;
    return [state, setState] as const;
  };

  return { render, useState };
};

export const { render, useState } = domRenderer();
