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

### .transaction({ hash })

Get information about transaction

`hash` hash of the transaction

Example response:

```javascript
{ hash: '817845049ff457f6c52080ccb90705a8fbf64e7d683b841cdcb9607db207b929',
  fee: 1661,
  inputs:
   [ { previousHash: '06c56b92d608b309aa3f930d74a57e50b2d58994dffa90f8393755b82ae41508',
       previousOutputIndex: 0 } ],
  outputs:
   [ { vout: 0,
       account: '2NGKTqNQyct4wctAyo8Wwy4zoFWkWXseaRo',
       value: 74099,
       isMine: true,
       chain: 1,
       chainIndex: 70 },
     { vout: 1,
       account: '2MzaStGqVB4Qk4KJG8aA9Q2CLWHqBEr1euw',
       value: 10000,
       isMine: true,
       chain: 0,
       chainIndex: 1454 } ],
  entries: [ { account: '2N4VLa3xQn4ucSQ475gME26v1UUE6hgrFDr', value: -1661 } ],
  hex: '01000000010815e42ab8553739f890fadf9489d5b2507ea5740d933faa09b308d6926bc50600000000fdfd0000483045022100a473c9787d6bd87447fabb9067dc98d92e3d97c15ae9fb844d7dbdf4d4959b1c02205858f9a0aa7b7aa57295f5046c675f257106989194a086ffe67bd7a7e1b82d0d01473044022059210113a797174a4c5a4e465cd5855f68c990a8f2a446f8808b08d2827ac3fe02205695b023b33e3b85e81e80053b2481b09c4893978bb5f87e3392bcab4e887334014c695221028b2a45adfca1ddf2bbf2a3cb26749e11268877396867b95a41cc445aec52d6cf2103deb2c468cc3ef4e0bd444747ef842a7f2b735f837ca58947738f8fc438f9fc3c21027f071a58ac9987f2cf2b705638eeacd2196d226b6e126a5f42f341c2d100ef4c53aeffffffff02732101000000000017a914fd181d7d451b1762f63c8bdbc1fdceb69ff3ff6e87102700000000000017a914506b8c92c0ede36ccbd0cbd466e18e5d1ee86fc88700000000' }
```

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

For verbose output, set `DEBUG` to `abw`, e.g: `DEBUG=abw npm test`.
