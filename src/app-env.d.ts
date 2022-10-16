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

    // Sendgrid
    readonly SENDGRID_API_KEY?: string;
    readonly EMAIL_SERVER_SENDER_FROM?: string;

    // Amazon
    readonly AWS_ACCESS_KEY_ID?: string;
    readonly AWS_SECRET_KEY_ACCESS?: string;
    readonly AWS_S3_BUCKET_NAME?: string;

    // Apple login
    readonly APPLE_TEAM_ID?: string;
    readonly APPLE_KEY_PATH?: string;
    readonly APPLE_CLIENT_ID?: string;
    readonly APPLE_KEY_ID?: string;
    readonly APPLE_REDIRECT_URI?: string;
  }
}
