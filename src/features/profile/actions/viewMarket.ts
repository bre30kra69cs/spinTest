import {store} from '../../store/store';
import {near} from '../../../api';

export const viewMarket = async () => {
  store.dispatch({
    name: 'markets/viewMarket/push',
    payload: (state) => {
      return {
        ...state,
        markets: {
          ...state.markets,
          isViewMarketsLoading: true,
        },
      };
    },
  });

  const result = await near.callViewContract({
    market_id: store.getState().markets.currentId,
  });

  if (result.type === 'ERROR') {
    store.dispatch({
      name: 'markets/viewMarket/fail',
      payload: (state) => {
        return {
          ...state,
          markets: {
            ...state.markets,
            isViewMarketsLoading: false,
          },
        };
      },
    });
  }

  if (result.type === 'OK') {
    store.dispatch({
      name: 'markets/viewMarket/done',
      payload: (state) => {
        return {
          ...state,
          markets: {
            ...state.markets,
            view: result.data,
            isViewMarketsLoading: false,
          },
        };
      },
    });
  }

  return result;
};
