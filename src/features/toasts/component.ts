import {createComponent} from '../../utils/component';
import {store} from '../store/store';
import {memo} from '../store/memo';
import {removeToast} from './actions/removeToast';

const selector = memo();

export const Toasts = createComponent({
  template: () => `
    <div class="toasts">
      ${store
        .getState()
        .toasts.map((toast) => {
          return `
          <div id="${toast.id}" class="toast">
            <span>${toast.message}</span>
          </div>`;
        })
        .join('')}
      <style>
        .toasts {
          position: fixed;
          top: 0.5em;
          right: 0.5em;
        }

        .toast {
          cursor: pointer;
          background-color: #da1212;
          width: 15em;
          padding: 0.5em 1em;
          border-radius: 4px;
          margin-bottom: 0.3em;
        }

        .toast span {
          color: white;
          font-size: 1em;
        }
      </style>
    </div>
  `,
  effect: (rerender) => {
    const listners = store.getState().toasts.map((toast) => {
      const element = document.getElementById(toast.id);
      if (!element) return;

      const onClick = () => {
        removeToast(toast.id);
      };

      element.addEventListener('click', onClick);
      return [element, onClick] as const;
    });

    const unlisten = store.listen(
      selector(
        (state) => state.toasts.length,
        () => {
          rerender();
        },
      ),
    );

    return () => {
      unlisten?.();
      listners.forEach((item) => {
        if (!item) return;
        const [element, onClick] = item;
        element.removeEventListener('click', onClick);
      });
    };
  },
});
