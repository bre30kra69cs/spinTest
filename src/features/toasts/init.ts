import {createRender} from '../../utils/render';
import {Toasts} from './component';

const render = createRender();

export const initToasts = () => {
  const root = document.getElementById('toasts');
  if (!root) return;
  render(root, Toasts);
};
