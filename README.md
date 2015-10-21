# abstract-bitcoin-wallet

[![Build Status](https://travis-ci.org/olalonde/abstract-bitcoin-wallet.svg)](https://travis-ci.org/olalonde/abstract-bitcoin-wallet)

Interface and test suite for standardized bitcoin wallet libraries. For
creating your own compatible implementation, see [Tests](#tests).

## Implementations

- [mock-bitcoin-wallet](#mock-bitcoin-wallet)
- [bitgo-bitcoin-wallet](https://github.com/olalonde/bitgo-bitcoin-wallet)

## mock-bitcoin-wallet

This package exposes a mockWallet method that implements
the abstract-bitcoin-wallet interface and can be used
to for mocking in tests.

es6

```javascript
import { mockWallet } from 'abstract-bitcoin-wallet';
const wallet = mockWallet();
```

JavaScript

```javascript
var wallet = require('abstract-bitcoin-wallet').mockWallet();
```

## Interface

All methods must return promises.

### .summary()

Get wallet balance summary.

Example response:

```javascript
{
  balance:0,
  confirmedBalance:0,
}
```

### .send({ address, amount })

Send coins to an address.

`address` address to send amount to
`amount` amount to send in satoshis

Example response:

```javascript
{
  hash: 'txhash of the transaction',
}
```

### .createAddress({ label })

`label` (optional) label to assign address

Example response:

```javascript
{
  address: 'some bitcoin address',
}
```

### .address({ address })

Get information about address including balance

`address` address to query

## Tests

To test your own implementation of the abstract-bitcoin-wallet
interface, adapt the following code:

es6:

```javascript
import walletTests from 'abstract-bitcoin-wallet';
import yourCustomWallet from './';

const wallet = yourCustomWallet({
  someconfig: 'somevalue',
});

walletTests(wallet);
```

JavaScript:

```javascript
var walletTests = require('abstract-bitcoin-wallet');
var yourCustomWallet = require('./');
var wallet = yourCustomWallet({ someconfig: 'somevalue' });

walletTests(wallet);
```

