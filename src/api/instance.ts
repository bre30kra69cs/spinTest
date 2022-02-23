import {response} from './response';
import {invariant} from '../utils/invariant';
import {wait} from '../utils/wait';

type InstanceConfig = {
  onError?: (message?: string) => void;
};

const APP_NAME = 'spinTest';

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

  const helepr =
    <T>(fn: () => Promise<T>) =>
    async () => {
      const result = await response(fn);

      if (config?.onError && result.type === 'ERROR') {
        config.onError?.(result.message);
      }

      return result;
    };

  const connect = helepr(async () => {
    connection = await nearApi.connect(CONFIG);
    await wait(1000);
    wallet = new nearApi.WalletConnection(connection, null);
  });

  const signIn = helepr(async () => {
    invariant(wallet, '[near] signIn: wallet not created');
    await wallet.requestSignIn(undefined, APP_NAME);
  });

  const signOut = helepr(async () => {
    invariant(wallet, '[near] signOut: wallet not created');
    wallet.signOut();
  });

  const isSignedIn = helepr(async () => {
    invariant(wallet, '[near] isSignedIn: wallet not created');
    return wallet.isSignedIn();
  });

  return {
    connect,
    signIn,
    signOut,
    isSignedIn,
  };
};
