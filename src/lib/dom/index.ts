import { shallowEqual } from "@/utils/object";
import { updateElement } from "./diff";
import type { VDOM } from "../jsx/types";
import type { Component } from "./types";

interface IRenderInfo {
  $root: HTMLElement | null;
  component: null | Component;
  currentVDOM: VDOM | null;
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
  };
  const resetOptions = () => {
    options.hooks = [];
    options.currentHook = 0;
    options.renderCount = 0;
  };
  const _render = () => {
    const { $root, currentVDOM, component } = renderInfo;
    if (!$root) return;
    const newVDOM = component!();
    updateElement($root, newVDOM, currentVDOM);
    renderInfo.currentVDOM = newVDOM;
    options.currentHook = 0;
    options.renderCount += 1;
  };

  const render = (root: HTMLElement, component: Component) => {
    resetOptions();
    renderInfo.$root = root;
    renderInfo.component = component;

    _render();
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
