export type Toast = {
  id: string;
  message: string;
  duration: number;
};

export type User = {
  id?: string;
  isSignInLoading: boolean;
  isSignedIn: boolean;
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
};
