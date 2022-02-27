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
    shared: {
      isLoading: false,
    },
  },
  {
    logger: !process.env.PRODUCTION,
  },
);

export type Dispatch = typeof store['dispatch'];
