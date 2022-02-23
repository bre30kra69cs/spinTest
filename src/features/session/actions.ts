import {store} from '../store/store';
import {near} from '../../api';
import {isSignedIn} from '../user/actions';

export const connect = async () => {
  store.dispatch({
    name: 'session/connect/push',
    payload: (state) => {
      return {
        ...state,
        session: {
          ...state.session,
          isConnectLoading: true,
          isConnected: false,
        },
      };
    },
  });

  const result = await near.connect();

  if (result.type === 'ERROR') {
    store.dispatch({
      name: 'session/connect/fail',
      payload: (state) => {
        return {
          ...state,
          session: {
            ...state.session,
            isConnectLoading: false,
            isConnected: false,
          },
        };
      },
    });
  }

  if (result.type === 'OK') {
    await isSignedIn();
    store.dispatch({
      name: 'session/connect/done',
      payload: (state) => {
        return {
          ...state,
          session: {
            ...state.session,
            isConnectLoading: false,
            isConnected: true,
          },
        };
      },
    });
  }

  return result;
};
