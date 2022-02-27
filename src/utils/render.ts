import {Component} from './component';
import {html} from './html';

let prevNode: ChildNode | undefined;
let prevUnmount: (() => void) | undefined;

export const render = (root: Node, component: Component) => {
  if (prevUnmount) {
    prevUnmount();
    prevUnmount = undefined;
  }

  if (prevNode) {
    prevNode.remove();
    prevNode = undefined;
  }

  const node = html(component.template());
  if (!node) return;

  root.appendChild(node);
  prevNode = node;

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
