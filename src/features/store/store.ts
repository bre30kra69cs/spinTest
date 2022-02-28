import {createStore} from '../../store';
import {StoreState} from '../../types';

export const store = createStore<StoreState>(
  {
    toasts: [],
    user: {
      id: '',
      balance: '',
      isSignInLoading: false,
      isSignedIn: false,
      isIdLoading: false,
      isBalanceLoading: false,
    },
    session: {
      isConnectLoading: true,
      isConnected: false,
    },
    shared: {
      isLoading: false,
    },
    markets: {
      currentId: -1,
      markets: [],
      isMarketsLoading: false,
      isMarketOpen: false,
      isViewMarketsLoading: false,
    },
  },
  {
    logger: !process.env.PRODUCTION,
  },
);

export type Dispatch = typeof store['dispatch'];
