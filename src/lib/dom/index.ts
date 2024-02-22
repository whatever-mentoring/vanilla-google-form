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
    renderCount: 0,
    hooks: [] as any,
    currentHook: 0,
  };
  const renderInfo: IRenderInfo = {
    $root: null,
    component: null,
    currentVDOM: null,
    newVDOM: null,
  };
  const reset = () => {
    options.hooks = [];
    options.currentHook = 0;
    options.renderCount = 0;
  };
  const _render = () => {
    const { $root, currentVDOM, component } = renderInfo;
    if (!$root || !currentVDOM) return;
    const VDOM = component!();
    updateElement($root, VDOM, currentVDOM);
    renderInfo.currentVDOM = VDOM;
    options.currentHook = 0;
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
    const { currentHook: index } = options;
    const state = (options.hooks[index] || initialState) as T;
    const setState = (newState: T) => {
      if (shallowEqual(state, newState)) return;
      options.hooks[index] = newState;
      _render();
    };
    options.currentHook += 1;
    return [state, setState] as const;
  };

  const useEffect = (callback: () => void, dependencies?: any[]) => {
    const { hooks, currentHook } = options;
    const hasNoDeps = !dependencies;
    const prevDeps = hooks[currentHook];
    const hasChangedDeps = prevDeps
      ? !dependencies?.every((el, i) => shallowEqual(el, prevDeps[i]))
      : true;
    if (hasNoDeps || hasChangedDeps) {
      callback();
      hooks[currentHook] = dependencies;
    }
    options.currentHook += 1;
  };

  return { render, useState, useEffect };
};

export const { render, useState, useEffect } = domRenderer();
