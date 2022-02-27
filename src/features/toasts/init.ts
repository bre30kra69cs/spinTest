import {store} from '../store/store';
import {memo} from '../store/memo';
import {Toast} from '../../types';
import {removeToast} from './actions/removeToast';

export const initToasts = () => {
  const toasts = document.getElementById('toasts');
  if (!toasts) return;
  const cache: Record<string, HTMLDivElement> = {};

  const createToast = (toast: Toast) => {
    const toastContainer = document.createElement('div');
    toastContainer.setAttribute('id', toast.id);
    toastContainer.setAttribute('class', 'toast');
    toastContainer.innerHTML = `<span>${toast.message}</span>`;
    toastContainer.addEventListener('click', () => {
      removeToast(toast.id);
    });
    toasts.appendChild(toastContainer);
    return toastContainer;
  };

  store.listen(
    memo(
      (state) => state.toasts,
      (state) => {
        const toDelete = Object.keys(cache).filter((key) =>
          state.toasts.every((toast) => toast.id !== key),
        );

        toDelete.forEach((key) => {
          const element = cache[key];
          element.remove();
          delete cache[key];
        });

        state.toasts.forEach((toast) => {
          const element = cache[toast.id];
          if (element) return;
          const container = createToast(toast);
          cache[toast.id] = container;
        });
      },
    ),
  );
};
