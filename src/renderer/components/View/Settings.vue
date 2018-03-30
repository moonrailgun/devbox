<template>
  <el-form label-width="80px">
    <el-form-item label="菜单折叠">
      <el-switch v-model="menuCollapse"></el-switch>
    </el-form-item>
    <el-form-item label="日志最大行数">
      <el-input-number v-model="tailMaxLine" :min="100" :step="100" label="描述文字"></el-input-number>
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
      }
    },
    methods: {
      exportSettings () {
        console.log('TODO!')
      }
    }
  }
</script>
