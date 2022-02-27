import {store} from '../../store/store';

export const openMarket = () => {
  store.dispatch({
    name: 'markets/openMarket',
    payload: (state) => {
      return {
        ...state,
        markets: {
          ...state.markets,
          isMarketOpen: true,
        },
      };
    },
  });
};
