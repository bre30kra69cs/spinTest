import {createRender} from '../../utils/render';
import {Loader} from './component';

const render = createRender();

export const initShared = () => {
  const root = document.getElementById('loader');
  if (!root) return;
  render(root, Loader);
};
