import {store} from '../../store/store';
import {near} from '../../../api';

export const userId = async () => {
  store.dispatch({
    name: 'user/userId/push',
    payload: (state) => {
      return {
        ...state,
        user: {
          ...state.user,
          isIdLoading: true,
        },
      };
    },
  });

  const result = await near.getUserId();

  if (result.type === 'ERROR') {
    store.dispatch({
      name: 'user/userId/fail',
      payload: (state) => {
        return {
          ...state,
          user: {
            ...state.user,
            isIdLoading: false,
          },
        };
      },
    });
  }

  if (result.type === 'OK') {
    store.dispatch({
      name: 'user/userId/done',
      payload: (state) => {
        return {
          ...state,
          user: {
            ...state.user,
            id: result.data || 'USER_ID',
            isIdLoading: false,
          },
        };
      },
    });
  }

  return result;
};
