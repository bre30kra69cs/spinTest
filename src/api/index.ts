import {createNearInstance} from './instance';
import {pushToast} from '../features/toasts/actions/pushToast';

export const near = createNearInstance({
  onError: (message) => {
    pushToast({
      message: message ?? 'INSTANCE_ERROR',
      duration: 5000,
    });
  },
});
