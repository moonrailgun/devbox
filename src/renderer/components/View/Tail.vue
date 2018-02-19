<template>
  <el-row :gutter="4" class="tail-container">
    <el-col :span="18">
      <table class="logs" cellspacing="0">
        <tbody ref="logs">

        </tbody>
      </table>
    </el-col>
    <el-col :span="6">
      <div>
        <p>日志文件监控</p>
        <el-upload
          action=""
          :on-preview="handlePreview"
          :on-change="handleChange"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :auto-upload="false"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :disabled="isWatching">
          <el-button size="small" type="primary">选择日志文件</el-button>
          <div slot="tip" class="el-upload__tip">请选择能使用文本形式能够正常打开的文件</div>
        </el-upload>
        <el-row style="margin-bottom: 10px;">
          <el-button size="small" type="primary" @click="watch()" :disabled="isWatching">开始监听</el-button>
        </el-row>
        <el-row>
          <el-button size="small" @click="unwatch()" :disabled="!isWatching">停止监听</el-button>
        </el-row>
        <div class="buffer-action">
          <el-button size="small" @click="clear()">清空</el-button>
          <span>行数:{{lines}}</span>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  data () {
    return {
      fileList: [],
      isWatching: false,
      lines: 0
    }
  },
  mounted () {
    let logsDOM = this.$refs.logs
    let tableDOM = logsDOM.parentNode
    ipcRenderer.on('tail-file-log', (event, name, message) => {
      this.$set(this.$data, 'lines', this.lines + 1)
      logsDOM.innerHTML += `<tr><td class="from" data-from='${name}'></td><td><pre>${message}</pre></td></tr>`
      tableDOM.scrollTop = tableDOM.scrollHeight
    })
  },
  methods: {
    watch () {
      console.log('开始监听')
      ipcRenderer.send('tail-file-watch', this.logfilePath)
      this.$set(this.$data, 'isWatching', true)
    },
    unwatch () {
      console.log('停止监听')
      ipcRenderer.send('tail-file-unwatch', this.logfilePath)
      this.$set(this.$data, 'isWatching', false)
    },
    clear () {
      this.$refs.logs.innerHTML = ''
      this.$set(this.$data, 'lines', 0)
    },
    handleChange (file, fileList) {
      ipcRenderer.send('tail-file-update', fileList.map(item => ({
        name: item.name,
        path: item.raw.path
      })))
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return !this.isWatching // this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>

<style>
.tail-container {
  min-height: 100%;
  overflow: auto;
}

.logs {
  width: 100%;
  height: calc(100vh - 40px);
  border-radius: 3px;
  overflow: auto;
  display: block;
  border: 1px solid #ccc;
  padding: 0 8px;
  background-color: #fff;
}

.logs tr th, .logs tr td {
  vertical-align: top;
  padding: 2px 4px;
}

.logs tr td.from {
  background-color: #ccc;
  color: rgba(27,31,35,0.3);
  user-select: none;
  font-size: 12px;
  padding-right: 10px;
  padding-left: 10px;
  line-height: 20px;
  font-family: "SFMono-Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace;
  text-align: right;
}

.logs tr td.from:before {
  content: attr(data-from);
}

.buffer-action {
  position: absolute;
  right: 0;
  bottom: 0;
  color: #999;
  width: 25%;
}
</style>
