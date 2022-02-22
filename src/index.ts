import {createNearInstance} from './api';
import {createStore} from './store';

const store = createStore(
  {
    test: '',
  },
  {
    logger: true,
  },
);

// store.dispatch((state) => {
//   return {
//     ...state,
//     test: 'test',
//   };
// }, 'testAction');

const near = createNearInstance();

const main = async () => {
  const result = await near.connect();
  console.log(result);
};

main();
