<template>
  <div class="sys-portscan">
    <el-input v-model="filter" placeholder="请输入过滤项" :disabled="isScanning" style="width: 280px;"></el-input>
    <el-button type="primary" @click="scan" :loading="isScanning">{{!isScanning?"开始扫描":"扫描中"}}</el-button>
    <el-table :data="filterResult" style="width: 100%">
      <el-table-column
        prop="name"
        label="进程名"
        width="180"
        sortable>
      </el-table-column>
      <el-table-column
        prop="pid"
        label="pid"
        width="80">
      </el-table-column>
      <el-table-column
        prop="cmd"
        label="命令">
      </el-table-column>
      <el-table-column
        prop="cpu"
        label="cpu占用"
        width="120"
        sortable>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import psList from 'ps-list'

  export default {
    data () {
      return {
        filter: '',
        isScanning: false,
        scanResult: []
      }
    },
    computed: {
      filterResult () {
        let res = this.scanResult
        if (this.filter) {
          res = this.scanResult.filter(p =>
            p.name.indexOf(this.filter) >= 0 ||
            p.pid.toString().indexOf(this.filter) >= 0 ||
            p.cmd.indexOf(this.filter) >= 0
          )
        }
        return res
      }
    },
    methods: {
      scan () {
        this.isScanning = true
        psList().then(data => {
          this.isScanning = false
          this.scanResult = data
        })
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
