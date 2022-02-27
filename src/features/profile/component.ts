import {createComponent} from '../../utils/component';
import {signOut} from './actions/signOut';

export const Profile = createComponent({
  template: `
    <section class="profile">
      <p class="title">Hi!</p>
      <button class="button profile_button">Signout</button>
      <style>
      </style>
    </section>`,
  effect: () => {
    const signOutButton = document.getElementsByClassName('profile_button').item(0);
    if (!signOutButton) return;
    signOutButton.addEventListener('click', signOut);

    return () => {
      signOutButton.removeEventListener('click', signOut);
    };
  },
});
