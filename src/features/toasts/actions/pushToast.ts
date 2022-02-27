import {store} from '../../store/store';
import {Toast} from '../../../types';
import {wait} from '../../../utils/wait';
import {createCounter} from '../../../counter';

const counter = createCounter();

export const pushToast = async (toast: Omit<Toast, 'id'>) => {
  const id = counter.gen((value) => `toast${value}`);
  store.dispatch({
    name: 'toasts/pushToast/push',
    payload: (state) => {
      return {
        ...state,
        toasts: [
          ...state.toasts,
          {
            ...toast,
            id,
          },
        ],
      };
    },
  });
  await wait(toast.duration);
  store.dispatch({
    name: 'toasts/pushToast/done',
    payload: (state) => {
      return {
        ...state,
        toasts: state.toasts.filter((item) => item.id !== id),
      };
    },
  });
};
