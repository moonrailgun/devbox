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
    <div class="params">
      <div v-for="param in params" class="param">
        <el-input class="field" v-model="param.field" placeholder="请输入key"></el-input>
        <span>:</span>
        <el-input class="value" v-model="param.value" placeholder="请输入value"></el-input>
      </div>
      <div class="param">
        <el-input class="field" v-model="newField" placeholder="请输入key"></el-input>
        <span>:</span>
        <el-input class="value" v-model="newValue" placeholder="请输入value"></el-input>
      </div>
    </div>
    <div class="body">
      <el-input
        class="response"
        type="textarea"
        :rows="20"
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
        response: '',
        params: [],
        newField: '',
        newValue: ''
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

.http .params {
  margin-top: 10px;
}
.http .params .param {
  flex: 1;
  display: flex;
  align-items: center;
}
.http .params .field {
  width: 140px;
  margin: 0 2px;
}
.http .params .value {
  flex: 1;
  margin: 0 2px;
}

.http .body {
  margin-top: 10px;
  padding: 0 2px;
  padding-top: 10px;
  border-top: 1px dashed #ccc;
}
</style>
