import {initToasts} from './features/toasts/init';
import {initSession} from './features/session/init';
import {initRouter} from './features/router/init';
import {initShared} from './features/shared/init';
import {iniMarket} from './features/market/init';

initShared();
initRouter();
initToasts();
iniMarket();
initSession();
