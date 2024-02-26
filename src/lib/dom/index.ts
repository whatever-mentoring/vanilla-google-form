import { shallowArrayEqual, shallowEqual } from "@/utils/object";
import { updateElement } from "./diff";
import type { VDOM } from "../jsx/types";
import type { Component } from "./types";

interface IRenderInfo {
  $root: HTMLElement | null;
  component: null | Component;
  currentVDOM: VDOM | null;
}

interface IOptions {
  renderCount: number;
  states: any[];
  dependencies: any[];
  stateHook: number;
  effectHook: number;
  effectList: Array<() => void>;
}

const domRenderer = () => {
  const options: IOptions = {
    renderCount: 0,
    states: [],
    dependencies: [],
    stateHook: 0,
    effectHook: 0,
    effectList: [],
  };
  const renderInfo: IRenderInfo = {
    $root: null,
    component: null,
    currentVDOM: null,
  };
  const resetOptions = () => {
    options.states = [];
    options.stateHook = 0;
    options.renderCount = 0;
    //...
    options.effectList = [];
    options.dependencies = [];
    options.effectHook = 0;
  };
  const _render = () => {
    const { $root, currentVDOM, component } = renderInfo;
    if (!$root || !component) return;

    const newVDOM = component();
    console.log("_render : ", newVDOM);
    updateElement($root, newVDOM, currentVDOM);
    options.stateHook = 0;
    options.effectHook = 0;
    renderInfo.currentVDOM = newVDOM;

    options.effectList.forEach((fn) => fn());
    options.effectList = [];
    options.renderCount += 1;
  };

  const render = (root: HTMLElement, component: Component) => {
    resetOptions();
    renderInfo.$root = root;
    renderInfo.component = component;
    _render();
  };

  const useState = <T>(initialState?: T) => {
    const { stateHook: index } = options;
    const state = (options.states[index] ?? initialState) as T;
    const setState = (newState: T) => {
      queueMicrotask(() => {
        if (shallowEqual(state, newState)) return;
        options.states[index] = newState;
        _render();
      });
    };
    options.stateHook += 1;
    return [state, setState] as const;
  };

  const useEffect = (callback: () => void, dependencies?: any[]) => {
    const index = options.effectHook;
    options.effectList[index] = () => {
      const hasNoDeps = !dependencies;
      const prevDeps = options.dependencies[index];
      const hasChangedDeps = prevDeps
        ? !shallowArrayEqual(dependencies ?? [], prevDeps)
        : true;
      if (hasNoDeps || hasChangedDeps) {
        options.dependencies[index] = dependencies;
        callback();
      }
    };
    options.effectHook += 1;
  };

  return { render, useState, useEffect };
};

export const { render, useState, useEffect } = domRenderer();
