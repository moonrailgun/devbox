<template>
  <div class="http-server">
    <el-button type="success" v-if="!isRun" @click="startHTTPServer">启动服务</el-button>
    <el-button type="danger" v-else @click="stopHTTPServer">停止服务</el-button>

    <el-form class="info" :model="info" label-width="80px">
      <el-form-item label="端口号">
        <el-input v-model="info.port" placeholder="端口号" :disabled="isRun"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="selectRootDir" :disabled="isRun">选择文件夹</el-button>
        <p>当前根目录:{{info.rootDir}}</p>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ipcRenderer, remote } from 'electron'

export default {
  data () {
    return {
      isRun: false,
      info: {
        rootDir: '',
        port: 8888
      }
    }
  },
  methods: {
    startHTTPServer () {
      if (!this.info.rootDir) {
        this.$notify({
          title: 'HTTPServer',
          message: 'HTTP服务器启动失败, 请选择目录'
        })
        return
      }

      if (!this.isRun) {
        ipcRenderer.send('http-server-start')
        this.$notify({
          title: 'HTTPServer',
          message: `HTTP服务器已开启, 端口号${this.info.port}`,
          duration: 10000
        })
      }
      this.isRun = true
    },
    stopHTTPServer () {
      if (this.isRun === true) {
        ipcRenderer.send('http-server-stop')
      }
      this.isRun = false
      this.$notify({
        title: 'HTTPServer',
        message: 'HTTP服务器已关闭'
      })
    },
    selectRootDir () {
      let rootDirPath = remote.dialog.showOpenDialog({
        properties: ['openDirectory']
      })
      this.info.rootDir = rootDirPath[0]
    }
  }
}
</script>

<style>
.info {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px dashed #ccc;
}
</style>
