import {createComponent} from '../../utils/component';
import {signOut} from './actions/signOut';
import {store} from '../store/store';
import {memo} from '../store/memo';

let d = 0;

export const Profile = createComponent({
  template: () => `
    <section class="profile">
      <p class="title">Hi! 👋</p>
      <p class="subtitle title__gap">${store.getState().user.id}</p>
      <button class="button profile_button">Signout</button>
      <style>
      </style>
    </section>`,
  effect: (rerender) => {
    const signOutButton = document.getElementsByClassName('profile_button').item(0);
    if (!signOutButton) return;
    signOutButton.addEventListener('click', signOut);

    const unlisten = store.listen(
      memo(
        (state) => state.user.id,
        (state) => {
          if (state.user.id) {
            rerender();
          }
        },
      ),
    );

    return () => {
      unlisten?.();
      signOutButton.removeEventListener('click', signOut);
    };
  },
});
