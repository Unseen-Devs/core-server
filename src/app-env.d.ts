/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly PORT: string;
    readonly NODE_ENV?: 'production' | 'development';
    readonly BASE_URL?: string;
    readonly DATABASE_PORT?: string;
    readonly DATABASE_HOST?: string;
    readonly DATABASE_USER?: string;
    readonly DATABASE_PASSWORD?: string;
    readonly DATABASE_NAME?: string;
    readonly DATABASE_ACL_NAME?: string;
    readonly DATABASE_SYNC?: 'true' | 'false';
    readonly DATABASE_LOGGING?: 'true' | 'false';

    // OPTA
    readonly OPTA_OUTLET_AUTH_KEY: string;
    readonly OPTA_BASE_URL: string;
    readonly OPTA_WEBSOCKET_URL: string;
    readonly WEB3_PROVIDER_URL: string;
    readonly WEB3_ACCOUNT_SIGNER: string;
    readonly WEB3_CHAIN_ID: string;
    readonly WEB3_AKSHUN_STORE_CONTRACT_ADDRESS: string;
  }
}
