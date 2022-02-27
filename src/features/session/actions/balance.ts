import {store} from '../../store/store';
import {near} from '../../../api';

export const balance = async () => {
  store.dispatch({
    name: 'user/balance/push',
    payload: (state) => {
      return {
        ...state,
        user: {
          ...state.user,
          isBalanceLoading: true,
        },
      };
    },
  });

  const result = await near.getBalance();

  if (result.type === 'ERROR') {
    store.dispatch({
      name: 'user/balance/fail',
      payload: (state) => {
        return {
          ...state,
          user: {
            ...state.user,
            isBalanceLoading: false,
          },
        };
      },
    });
  }

  if (result.type === 'OK') {
    store.dispatch({
      name: 'user/balance/done',
      payload: (state) => {
        return {
          ...state,
          user: {
            ...state.user,
            balance: result.data?.total,
            isBalanceLoading: false,
          },
        };
      },
    });
  }

  return result;
};
