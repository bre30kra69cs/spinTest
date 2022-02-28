import {signIn} from './actions/signIn';
import {createComponent} from '../../utils/component';

export const Signin = createComponent({
  template: () => `
    <section class="signin">
      <p class="title title__gap">Welcome!</p>
      <button class="button signin_button">Signin</button>
      <style>
      </style>
    </section>`,
  effect: () => {
    const signInButton = document.getElementsByClassName('signin_button').item(0);
    signInButton?.addEventListener('click', signIn);

    return () => {
      signInButton?.removeEventListener('click', signIn);
    };
  },
});
