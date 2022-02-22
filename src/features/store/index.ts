import {createStore} from '../../store';
import {StoreState} from '../../types';

export const store = createStore<StoreState>({
  toasts: [],
});
