import {store} from '../../store/store';
import {near} from '../../../api';

export const signOut = async () => {
  store.dispatch({
    name: 'user/signOut/push',
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

  const result = await near.signOut();

  if (result.type === 'ERROR') {
    store.dispatch({
      name: 'user/signOut/fail',
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
      name: 'user/signOut/done',
      payload: (state) => {
        return {
          ...state,
          user: {
            ...state.user,
            isSignInLoading: false,
            isSignedIn: false,
          },
        };
      },
    });
  }

  return result;
};
