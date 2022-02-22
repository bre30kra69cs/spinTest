import {store} from '../store';
import {Toast} from '../../types';
import {wait} from '../../utils/wait';

const pushToast = async (toast: Toast) => {
  store.dispatch({
    name: 'pushToast/pending',
    payload: (state) => {
      state.toasts.push(toast);
      return state;
    },
  });
  await wait(toast.duration);
  store.dispatch({
    name: 'pushToast/done',
    payload: (state) => {
      state.toasts = state.toasts.filter((item) => item !== toast);
      return state;
    },
  });
};
