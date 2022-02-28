import {createComponent} from '../../utils/component';
import {store} from '../store/store';
import {memo} from '../store/memo';

const selector = memo();

export const Loader = createComponent({
  template: () =>
    store.getState().shared.isLoading
      ? `
    <div class="loader">
      <div class="loader_indicator"></div>
      <style>
        .loader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.4);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .loader_indicator {
          border: 2px solid #f3f3f3;
          border-top: 2px solid rgb(37, 90, 163);
          border-radius: 50%;
          width: 100px;
          height: 100px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      </style>
    </div>
  `
      : '',
  effect: (rerender) => {
    const unlisten = store.listen(
      selector(
        (state) => state.shared.isLoading,
        () => {
          rerender();
        },
      ),
    );

    return () => {
      unlisten?.();
    };
  },
});
