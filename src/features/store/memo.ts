import {StoreState} from '../../types';

type Selector<T> = (state: StoreState) => T;

export const memo = <T>() => {
  let cache: T;

  return (selector: Selector<T>, fn: (state: StoreState) => void) => {
    return (state: StoreState) => {
      const nextCache = selector(state);

      if (nextCache !== cache) {
        fn(state);
      }

      cache = nextCache;
    };
  };
};
