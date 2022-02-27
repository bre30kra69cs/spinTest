import {store} from '../store/store';
import {memo} from '../store/memo';

export const initShared = () => {
  store.listen(
    memo()(
      (state) => state.shared.isLoading,
      (state) => {
        const loader = document.getElementsByClassName('loader').item(0);
        if (!loader) return;
        if (state.shared.isLoading) {
          loader.classList.remove('loader__hide');
        } else {
          loader.classList.add('loader__hide');
        }
      },
    ),
  );
};
