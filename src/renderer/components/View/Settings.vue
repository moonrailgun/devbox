<template>
  <el-form label-width="120px">
    <el-form-item label="菜单折叠">
      <el-switch v-model="menuCollapse"></el-switch>
    </el-form-item>
    <el-form-item label="日志最大行数">
      <el-input-number v-model="tailMaxLine" :min="100" :step="100" label="日志监控缓存最大显示行数"></el-input-number>
    </el-form-item>
    <el-form-item label="代理服务端口">
      <el-input class="inline-input" v-model="proxyServerPort" placeholder="代理服务器监听端口,默认为8001"></el-input>
      <el-input class="inline-input" v-model="proxyWebPort" placeholder="代理服务器网页端口,默认为8002"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="exportSettings">导出配置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
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
        console.log('TODO!')
      }
    }
  }
</script>

<style>
.inline-input {
  display: inline-block;
  width: 260px;
}
</style>
