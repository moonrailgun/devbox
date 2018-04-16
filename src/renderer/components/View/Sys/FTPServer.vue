<template>
  <div class="ftp-server">
    <el-button type="success" v-if="!isRun" @click="startFTPServer">启动服务</el-button>
    <el-button type="danger" v-else @click="stopFTPServer">停止服务</el-button>
    <el-input style="width: 200px;vertical-align: bottom;" v-model="port">
      <template slot="prepend">端口号</template>
    </el-input>
    <div class="summay" v-if="isRun">
      <p>
        地址: <code>ftp://0.0.0.0:8880</code>
      </p>
      <p class="tip">
        如果出现无法执行<code>LIST</code>命令的情况，请尝试手动切换到主动模式
      </p>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  data () {
    return {
      isRun: false,
      port: 8880
    }
  },
  methods: {
    startFTPServer () {
      if (!this.isRun) {
        ipcRenderer.send('ftp-server-start', {
          port: this.port
        })
        this.$notify({
          title: 'FTPServer',
          message: `FTP服务器已开启, 端口号${this.port}`,
          duration: 10000
        })
      }
      this.isRun = true
    },
    stopFTPServer () {
      if (this.isRun === true) {
        ipcRenderer.send('ftp-server-stop')
      }
      this.isRun = false
      this.$notify({
        title: 'FTPServer',
        message: 'FTP服务器已关闭'
      })
    }
  }
}
</script>

<style>
.ftp-server .summay {
  margin-top: 20px;
  line-height: 1.5em;
}
.ftp-server .summay .tip {
  color: #ababab;
  font-size: 14px;
}
</style>
