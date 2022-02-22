import {createEmitter} from '../emitter';

type State = Record<string, unknown>;

type Action<T extends State> = {
  name?: string;
  payload: (state: T) => T;
};

type StoreConfig = {
  logger?: boolean;
};

export const log = <T extends State>(prevState: T, nextState: T, name?: string) => {
  if (!console?.log || !console?.groupCollapsed || !console?.groupEnd) return;
  console.groupCollapsed(name ? `ACTION: ${name}` : 'ACTION');
  console.log('PREV_STATE', JSON.stringify(prevState, undefined, 2));
  console.log('NEXT_STATE', JSON.stringify(nextState, undefined, 2));
  console.groupEnd();
};

export const createStore = <T extends State>(initialState: T, config?: StoreConfig) => {
  const emiter = createEmitter<T>();

  let state = initialState;

  const dispatch = (action: Action<T>) => {
    const prevState = state;
    state = action.payload(prevState);

    if (config?.logger) {
      log(prevState, state, action.name);
    }

    emiter.emit(state);
  };

  const getState = () => {
    return state;
  };

  return {
    listen: emiter.listen,
    dispatch,
    getState,
  };
};
