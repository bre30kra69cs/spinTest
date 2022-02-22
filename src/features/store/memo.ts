import {StoreState} from '../../types';

type Selector<T> = (state: StoreState) => T;

export const memo = <T>(selector: Selector<T>, fn: (state: StoreState) => void) => {
  let cache: T;

  return (state: StoreState) => {
    const nextCache = selector(state);

    if (nextCache !== cache) {
      fn(state);
    }

    cache = nextCache;
  };
};
