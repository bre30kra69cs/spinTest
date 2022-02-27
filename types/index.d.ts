import * as NearApi from 'near-api-js';

declare global {
  namespace nearApi {
    const connect = NearApi.connect;
    const keyStores = NearApi.keyStores;
    const WalletConnection = NearApi.WalletConnection;
    const Contract = NearApi.Contract;

    type WalletConnection = NearApi.WalletConnection;
    type Near = NearApi.Near;
    type Contract = NearApi.Contract;
  }

  namespace NodeJS {
    interface ProcessEnv {
      PRODUCTION?: boolean;
    }
  }

  type Undefinable<T> = T | undefined;

  type Voidable<T> = T | void;
}
