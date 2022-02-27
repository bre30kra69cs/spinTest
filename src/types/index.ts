export type Toast = {
  id: string;
  message: string;
  duration: number;
};

export type User = {
  id?: string;
  balance?: string;
  isSignInLoading: boolean;
  isSignedIn: boolean;
  isBalanceLoading: boolean;
  isIdLoading: boolean;
};

export type Session = {
  isConnectLoading: boolean;
  isConnected: boolean;
};

export type Shared = {
  isLoading: boolean;
};

export type StoreState = {
  toasts: Toast[];
  user: User;
  session: Session;
  shared: Shared;
  markets: Markets;
};

type MarketItem = {
  address: string;
  decimal: number;
  ticker: string;
};

export type Market = {
  fee: number;
  id: number;
  base: MarketItem;
  quote: MarketItem;
};

export type Markets = {
  view?: MarketView;
  markets: Market[];
  currentId: number;
  isMarketsLoading: boolean;
  isMarketOpen: boolean;
};

export type MarketViewArg = {
  market_id: number;
};

type MarketViewItem = {
  price: number;
  quantity: number;
};

export type MarketView = {
  ask_orders: MarketViewItem[];
  bid_orders: MarketViewItem[];
};
