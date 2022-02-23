import {signIn} from './actions';

const initLoginButton = () => {
  const signInButton = document.getElementsByClassName('info_signin').item(0);
  if (!signInButton) return;
  signInButton.addEventListener('click', signIn);
};

export const initUser = () => {
  initLoginButton();
};
