<template>
  <div>
    <el-button type="success" v-if="!isRun" @click="startProxyServer">启动服务</el-button>
    <el-button type="danger" v-else @click="stopProxyServer">停止服务</el-button>
    <el-button v-if="isRun" @click="openWebUI">打开web界面</el-button>
  </div>
</template>

<script>
import { ipcRenderer, shell } from 'electron'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      isRun: false
    }
  },
  computed: {
    ...mapState({
      proxyServerPort: state => state.Settings.settings.proxyServerPort || 8001,
      proxyWebPort: state => state.Settings.settings.proxyWebPort || 8002
    })
  },
  methods: {
    startProxyServer () {
      if (this.isRun === false) {
        ipcRenderer.send('proxy-server-start', {
          port: this.proxyServerPort,
          webInterface: {
            enable: true,
            webPort: this.proxyWebPort
          }
        })
        this.$notify({
          title: 'AnyProxy',
          message: `代理服务器已开启, 代理服务器端口号${this.proxyServerPort}, 网页调试端口号${this.proxyWebPort}`,
          duration: 10000
        })
      }
      this.isRun = true
    },
    stopProxyServer () {
      if (this.isRun === true) {
        ipcRenderer.send('proxy-server-stop')
      }
      this.isRun = false
      this.$notify({
        title: 'AnyProxy',
        message: '代理服务器已关闭'
      })
    },
    openWebUI () {
      shell.openExternal(`http://localhost:${this.proxyWebPort}`)
    }
  }
}
</script>
