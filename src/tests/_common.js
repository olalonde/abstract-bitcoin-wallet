import initDebug from 'debug';

export const retryConfig = {
  retries: 12,
  minTimeout: 1000,
};

export const debug = initDebug('abw');

