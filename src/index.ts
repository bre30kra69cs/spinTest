import {initToasts} from './features/toasts/init';
import {initSession} from './features/session/init';
import {initUser} from './features/user/init';
import {initGuards} from './features/guards/init';

initGuards();
initToasts();
initSession();
initUser();
