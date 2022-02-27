import {store} from '../../store/store';
import {near} from '../../../api';

export const markets = async () => {
  store.dispatch({
    name: 'markets/markets/push',
    payload: (state) => {
      return {
        ...state,
        markets: {
          ...state.markets,
          isMarketsLoading: true,
        },
      };
    },
  });

  const result = await near.callContract();

  if (result.type === 'ERROR') {
    store.dispatch({
      name: 'markets/markets/fail',
      payload: (state) => {
        return {
          ...state,
          markets: {
            ...state.markets,
            isMarketsLoading: false,
          },
        };
      },
    });
  }

  if (result.type === 'OK') {
    const markets = result.data ?? [];
    const head = markets[0];

    store.dispatch({
      name: 'markets/markets/done',
      payload: (state) => {
        return {
          ...state,
          markets: {
            ...state.markets,
            isMarketsLoading: false,
            currentId: head?.id ?? -1,
            markets,
          },
        };
      },
    });
  }

  return result;
};
