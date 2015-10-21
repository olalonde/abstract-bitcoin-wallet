import test from 'blue-tape';

export default (wallet) => {
  test('send to self', (t) => {
    let createdAddress;
    // TODO: configurable amount?
    // through wallet.tresholdAmount?
    // or passed when calling test function?
    const amount = 5460;
    return wallet.createAddress({
      label: 'abstract-bitcoin-wallet-test',
    })
    .then(({ address }) => {
      createdAddress = address;
      return wallet.send({ address, amount });
    })
    .then((tx) => {
      t.equal(typeof tx, 'object');
      t.equal(typeof tx.hash, 'string');
    })
    .then(() => {
      return wallet.address({ address: createdAddress });
    })
    .then((addrInfo) => {
      t.equal(typeof addrInfo, 'object');
      t.equal(addrInfo.address, createdAddress);
      t.equal(addrInfo.balance, amount);
      t.equal(addrInfo.received, amount);
      t.equal(addrInfo.sent, 0);
    });
  });
};
