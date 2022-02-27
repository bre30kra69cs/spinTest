import {connect} from './actions/connect';
import {store} from '../store/store';
import {memo} from '../store/memo';

export const initSession = () => {
  connect();
  store.listen(
    memo(
      (state) => state.session.isConnectLoading,
      (state) => {
        const loader = document.getElementsByClassName('loader').item(0);
        if (!loader) return;
        if (state.session.isConnectLoading) {
          loader.classList.remove('loader__hide');
        } else {
          loader.classList.add('loader__hide');
        }
      },
    ),
  );
};
