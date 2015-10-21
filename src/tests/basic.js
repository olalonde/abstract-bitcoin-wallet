import test from 'blue-tape';

export default (wallet) => {
  const methods = [
    'summary',
    'send',
    'createAddress',
    'address',
  ];

  test('implements all methods', (t) => {
    methods.forEach((method) => {
      t.equal(typeof wallet[method], 'function', 'implements ' + method);
    });
    t.end();
  });

  test('#summary', (t) => {
    return wallet.summary()
      .then((summary) => {
        t.equal(typeof summary, 'object');
        t.equal(summary.confirmedBalance,
          parseInt(summary.confirmedBalance, 10),
          'confirmedBalance is integer');
        t.equal(summary.balance,
          parseInt(summary.balance, 10),
          'balance is integer');
      });
  });

  let createdAddress;
  test('#createAdddress', (t) => {
    return wallet.createAddress()
      .then((address) => {
        t.equal(typeof address, 'object', '');
        t.equal(typeof address.address, 'string');
        createdAddress = address;
      });
  });

  test('#address', (t) => {
    return wallet.address(createdAddress)
      .then((info) => {
        t.equal(typeof info, 'object');
        t.equal(typeof info.address, 'string');
        t.equal(typeof info.balance, 'number');
        t.equal(typeof info.received, 'number');
        t.equal(typeof info.sent, 'number');
      });
  });
};
