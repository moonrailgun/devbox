<template>
  <div class="sys-portscan">
    <p>端口扫描</p>
    <el-input v-model="host" placeholder="请输入主机" :disabled="isScanning"></el-input>
    <p class="tip">输入address格式扫描该地址全端口，输入address:port扫描该地址固定端口</p>
    <el-button type="primary" @click="scan()" :loading="isScanning">{{!isScanning?"开始扫描":"扫描中"}}</el-button>
    <p v-if="scanResult.host" class="tip">扫描主机: {{scanResult.host}} 报告</p>
    <el-table :data="scanResult.data" style="width: 100%" v-if="scanResult.host">
      <el-table-column
        prop="port"
        label="端口号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="name"
        label="服务名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="desc"
        label="描述">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { ipcRenderer } from 'electron'
  import portNumbers from 'port-numbers'

  export default {
    data () {
      return {
        host: '127.0.0.1',
        isScanning: false,
        scanResult: {
          host: '',
          data: []
        }
      }
    },
    mounted () {
      ipcRenderer.on('port-scan-finished', (event, host, ports) => {
        console.log('扫描完成', host, ports)
        this.$message({
          message: '端口扫描完成',
          type: 'success'
        })
        this.isScanning = false
        this.scanResult = {
          host: host,
          data: ports.map(p => {
            let service = portNumbers.getService(p)
            return {
              port: p,
              name: service ? service.name : '-',
              desc: service ? service.description : '-'
            }
          })
        }
      })
    },
    methods: {
      scan () {
        if (!this.host) {
          this.$message({
            message: '请输入要扫描的主机',
            type: 'warning'
          })
          return
        }

        console.log('开始扫描', this.host)
        this.isScanning = true
        this.scanResult = {
          host: '',
          data: []
        }

        if (this.host.indexOf(':') >= 0) {
          let [ip, port] = this.host.split(':')
          ipcRenderer.send('port-scan', ip, Number(port), Number(port))
        } else {
          ipcRenderer.send('port-scan', this.host)
        }
      }
    }
  }
</script>

<style>
.sys-portscan > * {
  margin-bottom: 10px;
}
.sys-portscan > .tip {
  color: #737373;
  font-size: 14px;
}
</style>
