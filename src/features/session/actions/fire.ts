import {store} from '../../store/store';
import {isSignedIn} from './isSignedIn';
import {connect} from './connect';
import {userId} from './userId';
import {balance} from './balance';
import {markets} from './markets';

export const fire = async () => {
  store.dispatch({
    name: 'session/fire/push',
    payload: (state) => {
      return {
        ...state,
        shared: {
          isLoading: true,
        },
      };
    },
  });

  const connectResult = await connect();

  if (connectResult.type === 'ERROR') {
    store.dispatch({
      name: 'session/fire/fail',
      payload: (state) => {
        return {
          ...state,
          shared: {
            isLoading: false,
          },
        };
      },
    });
  }

  const isSignInResult = await isSignedIn();

  if (isSignInResult.type === 'ERROR') {
    store.dispatch({
      name: 'session/fire/fail',
      payload: (state) => {
        return {
          ...state,
          shared: {
            isLoading: false,
          },
        };
      },
    });
  }

  const userIdResult = await userId();

  if (userIdResult.type === 'ERROR') {
    store.dispatch({
      name: 'session/fire/fail',
      payload: (state) => {
        return {
          ...state,
          shared: {
            isLoading: false,
          },
        };
      },
    });
  }

  const balanceResult = await balance();

  if (balanceResult.type === 'ERROR') {
    store.dispatch({
      name: 'session/fire/fail',
      payload: (state) => {
        return {
          ...state,
          shared: {
            isLoading: false,
          },
        };
      },
    });
  }

  const marketsResult = await markets();

  if (marketsResult.type === 'ERROR') {
    store.dispatch({
      name: 'session/fire/fail',
      payload: (state) => {
        return {
          ...state,
          shared: {
            isLoading: false,
          },
        };
      },
    });
  } else {
    store.dispatch({
      name: 'session/fire/done',
      payload: (state) => {
        return {
          ...state,
          shared: {
            isLoading: false,
          },
        };
      },
    });
  }
};
