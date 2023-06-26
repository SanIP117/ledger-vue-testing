module.exports = {
  configureWebpack: {
    name: 'VVV',
    resolve: {
      alias: {
        '@ledgerhq/devices': '@ledgerhq/devices/lib-es',
        '@ledgerhq/cryptoassets': '@ledgerhq/cryptoassets/lib-es',
        '@ledgerhq/domain-service': '@ledgerhq/domain-service/lib-es'
      }
    },
    performance: {
      hints: false
    }
  }
}
