import test from 'blue-tape';

export default (wallet) => {
  test('send to self', (t) => {
    let createdAddress;
    // TODO: configurable amount?
    // through wallet.tresholdAmount?
    // or passed when calling test function?
    const amount = 10000;
    const retryDelay = 1000;
    return wallet.createAddress({
      label: 'abw-test-send',
    })
    .then(({ address }) => {
      createdAddress = address;
      return wallet.send({ address, amount });
    })
    .then((tx) => {
      t.equal(typeof tx, 'object');
      t.equal(typeof tx.hash, 'string');
    })
    .then(() => wallet.address({ address: createdAddress }))
    .then((addrInfo) => {
      t.equal(typeof addrInfo, 'object');
      if (addrInfo.received !== amount) {
        // let's be nice and try again in 1s
        // maybe the wallet backend needs some more time
        // to update the address info
        return new Promise((resolve) => setTimeout(resolve, retryDelay))
        .then(() => wallet.address({ address: createdAddress }));
      }
      return addrInfo;
    })
    .then((addrInfo) => {
      t.equal(addrInfo.address, createdAddress);
      t.equal(addrInfo.balance, amount);
      t.equal(addrInfo.received, amount);
      t.equal(addrInfo.sent, 0);
    });
  });
};
