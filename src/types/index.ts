export type Toast = {
  message: string;
  duration: number;
};

export type StoreState = {
  toasts: Toast[];
};
