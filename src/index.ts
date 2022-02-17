const config = {
  networkId: 'testnet',
  keyStore: new nearApi.keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
  explorerUrl: 'https://explorer.testnet.near.org',
  headers: {},
};

const main = async () => {
  const near = await nearApi.connect(config);
  const wallet = new nearApi.WalletConnection(near, null);
};

main();
