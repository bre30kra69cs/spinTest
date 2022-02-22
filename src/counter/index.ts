import {tap} from '../utils/tap';

export const createCounter = (init = 0) => {
  let count = init;

  const next = () => {
    count += 1;
  };

  const get = <T = number>(fn?: (value: number) => T): T => {
    const final = fn ?? tap;
    return final(count as number & T);
  };

  const gen = <T = number>(fn?: (value: number) => T): T => {
    next();
    return get(fn);
  };

  return {
    next,
    get,
    gen,
  };
};
