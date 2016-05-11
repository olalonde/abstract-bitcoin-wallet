import test from 'blue-tape'
import promiseRetry from 'promise-retry'
import { retryConfig, debug } from './_common'

export default (wallet) => {
  test('transaction', (t) => {
    const amount = 10000
    let hashMemo
    let addressMemo
    return wallet.createAddress({ label: 'abw-test-transaction' })
    .then(({ address }) => {
      addressMemo = address
      return address
    })
    .then((address) => wallet.send({ address, amount }))
    .then(({ hash }) => {
      t.comment(`sent ${amount} to ${addressMemo}`)
      t.comment(`tx hash: ${hash}`)
      hashMemo = hash
      return promiseRetry((retry, number) => {
        t.comment(`try ${number}`)
        return wallet.transaction({ hash }).catch((err) => {
          debug(err)
          retry(err)
        })
      }, retryConfig)
    })
    .then((txInfo) => {
      t.equal(typeof txInfo, 'object')
      t.equal(txInfo.hash, hashMemo)
      t.ok(Array.isArray(txInfo.outputs))
      t.ok(Array.isArray(txInfo.inputs))
      t.equal(typeof txInfo.fee, 'number')
      t.equal(typeof txInfo.hex, 'string')
    })
  })
}
