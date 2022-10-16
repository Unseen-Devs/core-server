export const USER_MODULE_OPTIONS = 'USER_MODULE_OPTIONS';

export type UserModuleOptions = {
  /**
   * Time for activation code expried: `minute`
   * Default: 30
   */
  codeExpireTime?: number;
};
