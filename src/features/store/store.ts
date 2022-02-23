import {createStore} from '../../store';
import {StoreState} from '../../types';

export const store = createStore<StoreState>(
  {
    toasts: [],
    user: {
      isSignInLoading: false,
      isSignedIn: false,
    },
    session: {
      isConnectLoading: true,
      isConnected: false,
    },
  },
  {
    logger: !process.env.PRODUCTION,
  },
);
