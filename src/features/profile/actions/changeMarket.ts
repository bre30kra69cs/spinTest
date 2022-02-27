import {store} from '../../store/store';

export const changeMarket = (id: number) => {
  store.dispatch({
    name: 'markets/changeMarket',
    payload: (state) => {
      return {
        ...state,
        markets: {
          ...state.markets,
          currentId: id,
        },
      };
    },
  });
};
