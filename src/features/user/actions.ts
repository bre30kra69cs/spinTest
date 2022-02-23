import {store} from '../store/store';
import {near} from '../../api';

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

export const isSignedIn = async () => {
  store.dispatch({
    name: 'user/isSignedIn/push',
    payload: (state) => {
      return {
        ...state,
        user: {
          ...state.user,
          isSignInLoading: true,
          isSignedIn: false,
        },
      };
    },
  });

  const result = await near.isSignedIn();

  if (result.type === 'ERROR') {
    store.dispatch({
      name: 'user/isSignedIn/fail',
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

  if (result.type === 'OK' && result.data) {
    store.dispatch({
      name: 'user/isSignedIn/done',
      payload: (state) => {
        return {
          ...state,
          user: {
            ...state.user,
            isSignInLoading: false,
            isSignedIn: true,
          },
        };
      },
    });
  }

  return result;
};
