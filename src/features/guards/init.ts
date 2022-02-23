import {store} from '../store/store';
import {memo} from '../store/memo';

export const initGuards = () => {
  store.listen(
    memo(
      (state) => state.user.isSignedIn,
      (state) => {
        const signInSection = document.getElementById('signin');
        const mainSection = document.getElementById('main');
        if (!signInSection || !mainSection) return;
        if (state.user.isSignedIn) {
          signInSection.classList.add('info_section__hide');
          mainSection.classList.remove('info_section__hide');
        } else {
          signInSection.classList.remove('info_section__hide');
          mainSection.classList.add('info_section__hide');
        }
      },
    ),
  );
};
