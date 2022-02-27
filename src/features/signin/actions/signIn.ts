import {store} from '../../store/store';
import {near} from '../../../api';

export const signIn = async () => {
  store.dispatch({
    name: 'user/signIn/push',
    payload: (state) => {
      return {
        ...state,
        user: {
          ...state.user,
          isSignInLoading: true,
        },
      };
    },
  });

  const result = await near.signIn();

  if (result.type === 'ERROR') {
    store.dispatch({
      name: 'user/signIn/fail',
      payload: (state) => {
        return {
          ...state,
          user: {
            ...state.user,
            isSignInLoading: false,
          },
        };
      },
    });
  }

  if (result.type === 'OK') {
    store.dispatch({
      name: 'user/signIn/done',
      payload: (state) => {
        return {
          ...state,
          user: {
            ...state.user,
            isSignInLoading: false,
            data: result.data,
          },
        };
      },
    });
  }

  return result;
};
