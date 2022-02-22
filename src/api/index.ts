import {response} from './response';

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

export const createNearInstance = () => {
  let connection: nearApi.Near;
  let wallet: nearApi.WalletConnection;

  const connect = response(async () => {
    connection = await nearApi.connect(CONFIG);
    wallet = new nearApi.WalletConnection(connection, null);
  });

  const signIn = response(async () => {
    await wallet.requestSignIn(undefined, APP_NAME);
  });

  const signOut = response(() => {
    wallet.signOut();
  });

  return {
    connect,
    signIn,
    signOut,
  };
};
