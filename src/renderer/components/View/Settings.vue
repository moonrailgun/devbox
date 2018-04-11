<template>
  <el-form label-width="120px">
    <el-form-item label="菜单折叠">
      <el-switch v-model="menuCollapse"></el-switch>
    </el-form-item>
    <el-form-item label="日志最大行数">
      <el-input-number v-model="tailMaxLine" :min="100" :step="100" label="日志监控缓存最大显示行数"></el-input-number>
    </el-form-item>
    <el-form-item label="代理服务端口">
      <el-input class="inline-input" v-model="proxyServerPort" placeholder="代理服务器监听端口,默认为8001">
        <template slot="prepend">代理服务</template>
      </el-input>
      <el-input class="inline-input" v-model="proxyWebPort" placeholder="代理服务器网页端口,默认为8002">
        <template slot="prepend">网页服务</template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="exportSettings">导出配置</el-button>
      <el-button @click="importSettings">导入配置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { remote } from 'electron'
  import fs from 'fs-extra'
  import log from 'electron-log'

  export default {
    computed: {
      menuCollapse: {
        get () {
          return this.$store.state.Settings.settings.menuCollapse
        },
        set (value) {
          this.$store.dispatch('modifySettings', { menuCollapse: value })
        }
      },
      tailMaxLine: {
        get () {
          return this.$store.state.Settings.settings.tailMaxLine || 1000
        },
        set (value) {
          this.$store.dispatch('modifySettings', { tailMaxLine: value })
        }
      },
      proxyServerPort: {
        get () {
          return this.$store.state.Settings.settings.proxyServerPort || 8001
        },
        set (value) {
          this.$store.dispatch('modifySettings', { proxyServerPort: value })
        }
      },
      proxyWebPort: {
        get () {
          return this.$store.state.Settings.settings.proxyWebPort || 8002
        },
        set (value) {
          this.$store.dispatch('modifySettings', { proxyWebPort: value })
        }
      }
    },
    methods: {
      exportSettings () {
        let settings = JSON.parse(JSON.stringify(this.$store.state.Settings.settings))
        let filepath = remote.dialog.showSaveDialog({
          defaultPath: 'devbox.settings.json'
        })
        if (filepath) {
          log.info('[Settings]', 'Export settings:', settings)
          fs.writeJson(filepath, settings)
        }
      },
      importSettings () {
        let filepath = remote.dialog.showOpenDialog({
          filters: [
            {name: '配置文件', extensions: ['json']}
          ],
          properties: ['openFile']
        })
        filepath = filepath[0]
        if (filepath) {
          fs.readJson(filepath)
            .then(packageObj => {
              log.info('[Settings]', 'Import settings:', packageObj)
              this.$store.dispatch('modifySettings', packageObj)
            })
            .catch(err => {
              log.error('[Settings]', 'Import settings error:', err)
              this.$message.error(err)
            })
        }
      }
    }
  }
</script>

<style>
.inline-input {
  /* display: inline-block; */
  width: 260px;
}
</style>
