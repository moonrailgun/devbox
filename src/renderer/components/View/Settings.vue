<template>
  <el-form label-width="80px">
    <el-form-item label="菜单折叠">
      <el-switch v-model="menuCollapse"></el-switch>
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
      }
    },
    methods: {
      exportSettings () {
        console.log('TODO!')
      }
    }
  }
</script>
