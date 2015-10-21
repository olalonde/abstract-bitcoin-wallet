import basic from './tests/basic';
import send from './tests/send';
import transaction from './tests/transaction';

const tests = [ basic, send, transaction ];

// TODO: pass treshold value, address format, etc.

export default (wallet) => {
  tests.forEach((test) => test(wallet));
};

export { default as mockWallet } from './mock';
