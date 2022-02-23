export type Toast = {
  id: string;
  message: string;
  duration: number;
};

export type User = {
  isSignInLoading: boolean;
  isSignedIn: boolean;
};

export type Session = {
  isConnectLoading: boolean;
  isConnected: boolean;
};

export type StoreState = {
  toasts: Toast[];
  user: User;
  session: Session;
};
