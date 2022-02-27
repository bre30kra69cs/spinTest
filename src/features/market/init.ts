import {createRender} from '../../utils/render';
import {Market} from './component';

const render = createRender();

export const iniMarket = () => {
  const root = document.getElementById('market');
  if (!root) return;
  render(root, Market);
};
