export type Component = {
  template: () => string;
  effect?: (rerender: () => void) => Voidable<() => void>;
};

export const createComponent = (component: Component) => {
  return component;
};
