import test from 'blue-tape';

export default (wallet) => {
  test('transaction', (t) => {
    const amount = 10000;
    let hashMemo;
    return wallet.createAddress({ label: 'abw-test-transaction' })
    .then(({ address }) => wallet.send({ address, amount }))
    .then(({ hash }) => {
      hashMemo = hash;
      return wallet.transaction({ hash });
    })
    .then((txInfo) => {
      t.equal(typeof txInfo, 'object');
      t.equal(txInfo.hash, hashMemo);
      t.ok(Array.isArray(txInfo.outputs));
      t.ok(Array.isArray(txInfo.inputs));
      t.equal(typeof txInfo.fee, 'number');
      t.equal(typeof txInfo.hex, 'string');
    });
  });
};
