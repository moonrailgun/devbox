<template>
  <div class="http">
    <div class="header">
      <el-select v-model="method" placeholder="请选择">
        <el-option label="GET" value="get" />
        <el-option label="POST" value="post" />
      </el-select>
      <el-input v-model="url" placeholder="请输入URL"></el-input>
      <el-button @click="sendRequest">提交</el-button>
    </div>
    <div class="body">
      <el-input
        class="response"
        type="textarea"
        rows="20"
        placeholder="响应结果"
        v-model="response">
      </el-input>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        method: 'get',
        url: '',
        response: ''
      }
    },
    methods: {
      async sendRequest () {
        let url = this.url
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
          url = 'http://' + url
        }

        try {
          let res = await this.$http[this.method](url)
          this.response = res.data
          console.log(res)
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
</script>

<style>
.http .header {
  display: flex;
}

.http .header > * {
  margin: 0 2px;
}

.http .body {
  margin-top: 10px;
  padding: 0 2px;
}
</style>
