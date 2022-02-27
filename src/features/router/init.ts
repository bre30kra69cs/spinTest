import {store} from '../store/store';
import {memo} from '../store/memo';
import {Signin} from '../signin/component';
import {Profile} from '../profile/component';
import {render} from '../../utils/render';

export const initRouter = () => {
  const root = document.getElementById('root');
  if (!root) return;

  store.listen(
    memo(
      (state) => state.user.isSignedIn,
      (state) => {
        if (state.user.isSignedIn) {
          render(root, Profile);
        } else {
          render(root, Signin);
        }
      },
    ),
  );
};
