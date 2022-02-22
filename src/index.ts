import {near} from './api';
import {initToasts} from './features/toasts/init';
import {pushToast} from './features/toasts/actions';

initToasts();

const main = async () => {
  await near.signIn();
};

main();
