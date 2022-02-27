import {response} from './response';
import {invariant} from '../utils/invariant';
import {wait} from '../utils/wait';

type InstanceConfig = {
  onError?: (message?: string) => void;
};

const APP_NAME = 'spinTest';

const CONTRACT_ID = 'app_2.spin_swap.testnet';

const CONFIG = {
  networkId: 'testnet',
  keyStore: new nearApi.keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
  explorerUrl: 'https://explorer.testnet.near.org',
  headers: {},
};

export const createNearInstance = (config?: InstanceConfig) => {
  let connection: nearApi.Near;
  let wallet: nearApi.WalletConnection;

  const helper =
    <T>(fn: () => Promise<T>) =>
    async () => {
      const result = await response(fn);

      if (config?.onError && result.type === 'ERROR') {
        config.onError?.(result.message);
      }

      return result;
    };

  const connect = helper(async () => {
    connection = await nearApi.connect(CONFIG);
    await wait(1000);
    wallet = new nearApi.WalletConnection(connection, null);
  });

  const signIn = helper(async () => {
    invariant(wallet, '[near] signIn: wallet not created');
    await wallet.requestSignIn(CONTRACT_ID, APP_NAME);
  });

  const signOut = helper(async () => {
    invariant(wallet, '[near] signOut: wallet not created');
    await wait(1000);
    wallet.signOut();
  });

  const isSignedIn = helper(async () => {
    invariant(wallet, '[near] isSignedIn: wallet not created');
    return wallet.isSignedIn();
  });

  const getUserId = helper(async () => {
    invariant(wallet, '[near] getUserId: wallet not created');
    return wallet.getAccountId() as string;
  });

  const getBalance = helper(async () => {
    invariant(wallet, '[near] getBalance: wallet not created');
    return await wallet.account().getAccountBalance();
  });

  return {
    connect,
    signIn,
    signOut,
    isSignedIn,
    getUserId,
    getBalance,
  };
};
