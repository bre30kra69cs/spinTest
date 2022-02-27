export type Component = {
  template: string;
  effect?: () => Voidable<() => void>;
};

export const createComponent = (component: Component) => {
  return component;
};
