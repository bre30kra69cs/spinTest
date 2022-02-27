import {store} from '../../store/store';

export const removeToast = (id: string) => {
  store.dispatch({
    name: 'toasts/removeToast',
    payload: (state) => {
      return {
        ...state,
        toasts: state.toasts.filter((item) => item.id !== id),
      };
    },
  });
};
