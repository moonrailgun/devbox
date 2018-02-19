<template>
  <div class="sys-qrcode">
    <p>生成二维码</p>
    <el-input v-model="str" placeholder="请输入网址或者字符串"></el-input>
    <el-button type="primary" @click="generateQRcode()">生成二维码</el-button>
    <el-button @click="clear()">清除</el-button>
    <p v-if="qrcode">二维码内容: {{qrcodeStr}}</p>
    <img v-if="qrcode" :src="qrcode" />
  </div>
</template>

<script>
  import QRCode from 'qrcode'

  export default {
    data () {
      return {
        str: '',
        qrcode: '',
        qrcodeStr: ''
      }
    },
    methods: {
      generateQRcode () {
        QRCode.toDataURL(this.str)
          .then(url => {
            this.$set(this.$data, 'qrcodeStr', this.str)
            this.$set(this.$data, 'qrcode', url)
          })
          .catch(err => {
            console.error(err)
            this.$set(this.$data, 'qrcodeStr', err.toString())
          })
      },
      clear () {
        this.$set(this.$data, 'qrcodeStr', '')
        this.$set(this.$data, 'qrcode', '')
      }
    }
  }
</script>

<style>
.sys-qrcode > * {
  margin-bottom: 10px;
}
.sys-qrcode img {
  min-width: 200px;
  min-height: 200px;
}
</style>
