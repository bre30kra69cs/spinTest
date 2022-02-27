import {store} from '../../store/store';

export const closeMarket = () => {
  store.dispatch({
    name: 'markets/closeMarket',
    payload: (state) => {
      return {
        ...state,
        markets: {
          ...state.markets,
          isMarketOpen: false,
        },
      };
    },
  });
};
