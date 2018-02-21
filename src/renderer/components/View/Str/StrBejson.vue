<template>
  <div class="str-bejson">
    <codemirror class="container" v-model="jsonVal" :options="cmOptions"></codemirror>
    <el-button type="primary" plain @click="validate()">校验</el-button>
    <el-button plain @click="reset()">清空</el-button>
    <p :class="isSuccess?'success':'error'" v-if="!!resultText">
      <pre>{{resultText}}</pre>
    </p>
  </div>
</template>

<script>
  import Bejson from '../../../utils/bejson'

  export default {
    data () {
      return {
        cmOptions: {
          tabSize: 2,
          // theme: 'base16-dark',
          lineNumbers: true,
          line: true,
          lineWrapping: true,
          mode: {name: 'javascript', json: true}
        },
        jsonVal: '',
        resultText: '',
        isSuccess: true
      }
    },
    methods: {
      validate () {
        try {
          let result = Bejson.parser.parse(this.jsonVal)
          console.log(result)
          if (result) {
            this.isSuccess = true
            this.resultText = '正确的JSON'
            this.jsonVal = JSON.stringify(JSON.parse(this.jsonVal), null, 2)
          } else {
            // TODO 出现未知错误
          }
        } catch (parseException) {
          this.isSuccess = false
          this.resultText = parseException.toString()
          try {
            this.jsonVal = Bejson.format.formatJson(this.jsonVal)
            Bejson.parser.parse(this.jsonVal) // 重新定位format后的错误位置
          } catch (e) {
            this.resultText = e.toString()
          }
        }
      },
      reset () {
        this.jsonVal = ''
        this.resultText = ''
      }
    }
  }
</script>

<style>
.str-bejson > * {
  margin-bottom: 10px;
}

.str-bejson .container {
  border: 1px solid #ccc;
}
.str-bejson p {
  border-radius: 3px;
  width: 100%;
  padding: 8px 16px;
  margin: 0;
}
.str-bejson p.success {
  background-color: #f0f9eb;
  color: #67c23a;
}
.str-bejson p.error {
  background-color: #fef0f0;
  color: #f56c6c;
}
</style>
