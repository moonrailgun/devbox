<template>
  <div class="str-encode">
    <el-form :label-position="'top'" label-width="80px">
      <el-row :gutter="10">
        <el-col :span="18">
          <el-form-item label="原文本">
            <i class="copy-btn el-icon-document" @click="copy(oriText)"></i>
            <el-input type="textarea" v-model="oriText"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="秘钥(非必须)">
            <el-input type="textarea" v-model="secretKey"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="Unicode编码">
            <i class="copy-btn el-icon-document" @click="copy(unicodeEncodeText)"></i>
            <el-input type="textarea" v-model="unicodeEncodeText" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Unicode解码">
            <i class="copy-btn el-icon-document" @click="copy(unicodeDecodeText)"></i>
            <el-input type="textarea" v-model="unicodeDecodeText" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="UTF-8编码">
            <i class="copy-btn el-icon-document" @click="copy(utf8EncodeText)"></i>
            <el-input type="textarea" v-model="utf8EncodeText" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="UTF-8解码">
            <i class="copy-btn el-icon-document" @click="copy(utf8DecodeText)"></i>
            <el-input type="textarea" v-model="utf8DecodeText" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="Base64编码">
            <i class="copy-btn el-icon-document" @click="copy(base64EncodeText)"></i>
            <el-input type="textarea" v-model="base64EncodeText" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Base64解码">
            <i class="copy-btn el-icon-document" @click="copy(base64DecodeText)"></i>
            <el-input type="textarea" v-model="base64DecodeText" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="MD5">
            <i class="copy-btn el-icon-document" @click="copy(md5Text)"></i>
            <el-input type="textarea" v-model="md5Text" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="SHA1">
            <i class="copy-btn el-icon-document" @click="copy(sha1Text)"></i>
            <el-input type="textarea" v-model="sha1Text" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="AES加密">
            <i class="copy-btn el-icon-document" @click="copy(aesEncryptText)"></i>
            <el-input type="textarea" v-model="aesEncryptText" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="AES解密">
            <i class="copy-btn el-icon-document" @click="copy(aesDecryptText)"></i>
            <el-input type="textarea" v-model="aesDecryptText" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import CryptoJS from 'crypto-js'
  import { clipboard } from 'electron'

  let encodeUnicode = function (str) {
    var res = []
    for (var i = 0; i < str.length; i++) {
      res[i] = ('00' + str.charCodeAt(i).toString(16)).slice(-4)
    }
    return '\\u' + res.join('\\u')
  }

  let decodeUnicode = function (str) {
    return str.replace(/(\\u)(\w{4}|\w{2})/gi, function ($0, $1, $2) {
      return String.fromCharCode(parseInt($2, 16))
    })
  }

  let encodeUtf8 = function encodeUtf8 (str) {
    let temp = ''
    let rs = ''
    for (let i = 0, len = str.length; i < len; i++) {
      temp = str.charCodeAt(i).toString(16)
      rs += '&#x' + new Array(5 - temp.length).join('0') + temp + ';'
    }
    return rs
  }

  let decodeUtf8 = function decodeUtf8 (str) {
    return str.replace(/(&#x)(\w{4}|\w{2});/gi, function ($0, $1, $2) {
      return String.fromCharCode(parseInt($2, 16))
    })
  }

  export default {
    data () {
      return {
        oriText: '',
        secretKey: ''
      }
    },
    computed: {
      unicodeEncodeText () {
        return this.oriText && encodeUnicode(this.oriText)
      },
      unicodeDecodeText () {
        return this.oriText && decodeUnicode(this.oriText)
      },
      utf8EncodeText () {
        return this.oriText && encodeUtf8(this.oriText).toString()
      },
      utf8DecodeText () {
        return this.oriText && decodeUtf8(this.oriText).toString()
      },
      base64EncodeText () {
        return this.oriText && Buffer.from(this.oriText).toString('base64')
      },
      base64DecodeText () {
        return this.oriText && Buffer.from(this.oriText, 'base64').toString()
      },
      md5Text () {
        return this.oriText && CryptoJS.MD5(this.oriText).toString()
      },
      sha1Text () {
        return this.oriText && CryptoJS.SHA1(this.oriText).toString()
      },
      aesEncryptText () {
        return this.oriText && this.secretKey && CryptoJS.AES.encrypt(this.oriText, this.secretKey).toString()
      },
      aesDecryptText () {
        return this.oriText && this.secretKey && CryptoJS.AES.decrypt(this.oriText, this.secretKey).toString(CryptoJS.enc.Utf8)
      }
    },
    methods: {
      copy (str) {
        if (str) {
          clipboard.writeText(str)
          this.$message({message: '已复制到剪切板', type: 'success', duration: 1000})
        }
      }
    }
  }
</script>

<style>
.el-form--label-top .el-form-item__label {
  line-height: initial;
}

.copy-btn {
  position: absolute;
  right: 6px;
  top: -24px;
  color: #606266;
  cursor: pointer;
}
</style>
