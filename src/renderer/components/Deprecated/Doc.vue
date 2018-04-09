<template>
  <el-row class="doc-container">
    <el-col :span="9">
      <el-tree
      :data="docTree"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-button
              type="text"
              size="mini"
              @click="() => append(data)">
              添加
            </el-button>
            <el-button
              type="text"
              size="mini"
              v-if="node.id!==0"
              @click="() => remove(node, data)">
              移除
            </el-button>
          </span>
        </span>
      </el-tree>
    </el-col>
    <el-col :span="15">
      2
    </el-col>
  </el-row>
</template>

<script>
export default {
  computed: {
    docTree: {
      get () {
        return this.$store.state.View.docTree
      },
      set (value) {
        this.$store.dispatch('modifyDocTree', value)
      }
    }
  }
}
</script>

<style>
.doc-container {
  width: 100%;
  height: 100%;
}
</style>
