import test from 'blue-tape';
import promiseRetry from 'promise-retry';
import { retryConfig, debug } from './_common';

export default (wallet) => {
  test('send to self', (t) => {
    let createdAddress;
    // TODO: configurable amount?
    // through wallet.tresholdAmount?
    // or passed when calling test function?
    const amount = 10000;
    return wallet.createAddress({
      label: 'abw-test-send',
    })
    .then(({ address }) => {
      createdAddress = address;
      t.comment('send ' + amount + ' to ' + address);
      return wallet.send({ address, amount });
    })
    .then((tx) => {
      t.equal(typeof tx, 'object');
      t.equal(typeof tx.hash, 'string');
      t.comment('tx hash: ' + tx.hash);
    })
    .then(() => wallet.address({ address: createdAddress }))
    .then(() => {
      // let's be nice and try again in 1s
      // maybe the wallet backend needs some more time
      // to update the address info
      return promiseRetry((retry, number) => {
        t.comment('try ' + number);
        return wallet.address({ address: createdAddress })
        .then((addrInfo) => {
          if (addrInfo.received !== amount) {
            debug(addrInfo);
            retry('addrInfo.received !== amount');
            return null;
          }
          return addrInfo;
        });
      }, retryConfig);
    })
    .then((addrInfo) => {
      t.equal(typeof addrInfo, 'object');
      t.equal(addrInfo.address, createdAddress, 'address');
      t.equal(addrInfo.balance, amount, 'balance');
      t.equal(addrInfo.received, amount, 'received');
      t.equal(addrInfo.sent, 0, 'sent');
    });
  });
};
