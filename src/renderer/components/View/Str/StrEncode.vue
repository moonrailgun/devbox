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

  export default {
    data () {
      return {
        oriText: '',
        secretKey: ''
      }
    },
    computed: {
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
