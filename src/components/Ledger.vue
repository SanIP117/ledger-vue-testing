<template>
  <div class="d-flex align-center flex-column">
    <h4>Ledger: {{this.transport?'connected':'disconnect'}}</h4>
    <h4>Address:{{this.tokenSn}}</h4>
    <h4>Hash:{{this.hash}}</h4>
    <h4>Signature:{{this.signature}}</h4> 
    <br/><br/>


    <div width="400">
      <div>
        <button @click="connectDevice">
          Connect
        </button>
      </div>
      <br/>
      <div>
        <button @click="getToken">
          Token
        </button>
      </div>
      <br/>
      <div>
        <button @click="signBtc">
          Sign BTC
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import Btc from '@ledgerhq/hw-app-btc'
import sha256 from 'crypto-js/sha256'

export default {
  name: 'Ledger',
  data() {
    return {
      path: "44'/0'/0'/0/0",
      device: null,
      tokenSn: null,
      hash: null,
      signature: null,
      transport: null
    }
  },
  mounted() {
    console.log("init")
    console.log(Btc)
  },
  methods: {
    async connectDevice() {
      const device = await navigator.usb.requestDevice({
          filters: [{ vendorId: 11415 }]
        })
      if (device) this.transport = await TransportWebUSB.open(device)
      else this.transport = await TransportWebUSB.create()
    },
    async getToken() {
      const transport = this.transport
      const btc = new Btc({ transport, currency: 'bitcoin' })
      const { bitcoinAddress } = await btc.getWalletPublicKey(this.path, { format: 'legacy', verify: false })
      this.tokenSn = bitcoinAddress
      console.log(this.tokenSn)
    },
    async signBtc() {
      try {
        const transport = this.transport
        const btc = new Btc({ transport, currency: 'bitcoin' })

        
        const message = { tokenSn: "1FigxLFf8HkcmPirGWTDcmvoJ8Dh61ujir" }
        const signData = {
          ...message
        }
        // const signature = signData
        const hex = Buffer.from(JSON.stringify(signData)).toString('hex')
        const hash = sha256(JSON.stringify(signData)).toString()
        this.hash = hash
        // const hex = Buffer.from(data).toString('hex')
        console.log('message', JSON.stringify(signData))
        console.log('hex', hex)
        console.log('sha256', hash)
        //console.log('sha256 hex', sha256(hex).toString())
        let signature = null
        const result = await btc.signMessage(this.path, hex)
        console.log(result)
        var v = result['v'] + 27 + 4
        signature = Buffer.from(v.toString(16) + result['r'] + result['s'], 'hex').toString('base64')
        console.log('Signature : ' + signature)
        this.signature = signature
      } catch (e) {
        console.error(e)
        return null
      }
    }
  }
}
</script>