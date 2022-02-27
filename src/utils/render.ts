import {Component} from './component';
import {html} from './html';

export const createRender = () => {
  let prevNode: ChildNode | null | undefined;
  let prevUnmount: (() => void) | undefined;

  const render = (root: Node, component: Component) => {
    if (prevUnmount) {
      prevUnmount();
      prevUnmount = undefined;
    }

    if (prevNode) {
      prevNode.remove();
      prevNode = undefined;
    }

    const node = html(component.template());
    prevNode = node;

    if (node) {
      root.appendChild(node);
    }

    const rerender = () => {
      if (prevNode === node) {
        render(root, component);
      }
    };

    if (component.effect) {
      const unmout = component.effect(rerender);

      if (unmout) {
        prevUnmount = unmout;
      }
    }
  };

  return render;
};
