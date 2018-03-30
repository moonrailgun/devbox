<template>
  <el-row :gutter="4" class="tail-container">
    <el-col :span="isCollapse ? 24 : 18" style="position: relative;">
      <table class="logs" cellspacing="0" ref="logs">
        <tbody>
          <tr v-for="(log, index) in logs">
            <td class="from" :data-from="log.name"></td>
            <td><pre>{{log.message}}</pre></td>
          </tr>
        </tbody>
      </table>
      <div
        :class="'tail-collapse-btn' + (isCollapse ? ' collapse' : '')"
        @click="switchCollapse"
      >
        <i class="el-icon-caret-right" v-if="!isCollapse"></i>
        <i class="el-icon-caret-left" v-else></i>
      </div>
    </el-col>
    <el-col :span="isCollapse ? 0 : 6">
      <div>
        <p>日志文件监控</p>
        <el-upload
          action=""
          :on-preview="handlePreview"
          :on-change="handleChange"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :auto-upload="false"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :disabled="isWatching">
          <el-button size="small" type="primary">选择日志文件</el-button>
          <div slot="tip" class="el-upload__tip">请选择能使用文本形式能够正常打开的文件</div>
        </el-upload>
        <el-row style="margin-top: 10px;">
          <el-button size="small" type="primary" @click="watch()" :disabled="isWatching">开始监听</el-button>
        </el-row>
        <el-row style="margin-top: 10px;">
          <el-button size="small" @click="unwatch()" :disabled="!isWatching">停止监听</el-button>
        </el-row>
        <div class="buffer-action">
          <el-button size="small" @click="clear()">清空</el-button>
          <span>行数:{{lines}}</span>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import { Tail } from 'tail'
  import debounce from 'lodash.debounce'
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        fileList: [],
        isWatching: false,
        logs: [],
        watchProcess: [],
        isCollapse: false
      }
    },
    computed: {
      ...mapState({
        tailMaxLine: state => state.Settings.settings.tailMaxLine || 1000
      }),
      lines: function () {
        return this.logs.length
      }
    },
    updated () {
      debounce(() => {
        this.$refs.logs.scrollTop = this.$refs.logs.scrollHeight
        console.log('scroll to bottom')
      }, 1000)()
    },
    beforeDestroy () {
      this.unwatch()
      this.clear()
    },
    methods: {
      watch () {
        console.log('开始监听...')
        this.isWatching = true
        for (let file of this.fileList) {
          let { name, path } = file
          let tail = new Tail(path)
          tail.on('line', (data) => {
            if (this.lines >= this.tailMaxLine) {
              this.logs.shift()
            }
            this.logs.push({
              name: name,
              message: data
            })
          })

          tail.on('error', (error) => {
            console.error(error)
            this.logs.push({
              name: name,
              message: 'ERROR: ' + error
            })
          })

          this.watchProcess.push({
            name,
            path,
            tail
          })
        }
      },
      unwatch () {
        console.log('停止监听所有文件')
        for (let p of this.watchProcess) {
          p.tail.unwatch()
        }
        this.watchProcess = []
        this.isWatching = false
      },
      clear () {
        console.log('清空日志')
        this.logs = []
      },
      handleChange (file, fileList) {
        this.fileList = fileList.map(item => ({
          name: item.name,
          path: item.raw.path
        }))
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      },
      handleExceed (files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      beforeRemove (file, fileList) {
        return !this.isWatching // this.$confirm(`确定移除 ${file.name}？`)
      },
      switchCollapse () {
        this.isCollapse = !this.isCollapse
      }
    }
  }
</script>

<style>
.tail-container {
  min-height: 100%;
  overflow: auto;
}

.logs {
  width: 100%;
  height: calc(100vh - 40px);
  border-radius: 3px;
  overflow: auto;
  display: block;
  border: 1px solid #ccc;
  padding: 0 8px;
  background-color: #fff;
}

.logs tr th, .logs tr td {
  vertical-align: top;
  padding: 2px 4px;
}

.logs tr td.from {
  background-color: #ccc;
  color: rgba(27,31,35,0.3);
  user-select: none;
  font-size: 12px;
  padding-right: 10px;
  padding-left: 10px;
  line-height: 20px;
  font-family: "SFMono-Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace;
  text-align: right;
}

.logs tr td.from:before {
  content: attr(data-from);
}

.buffer-action {
  position: absolute;
  right: 0;
  bottom: 0;
  color: #999;
  width: 25%;
}

.tail-collapse-btn {
  position: absolute;
  top: 50%;
  margin-top: -50px;
  height: 100px;
  line-height: 100px;
  border: 1px solid #ccc;
  right: -15px;
  width: 18px;
  cursor: pointer;
  color: #666;
}

.tail-collapse-btn:hover {
  box-shadow: 1px 0 1px 0 #ccc;
}

.tail-collapse-btn.collapse {
  right: 2px;
}

.tail-collapse-btn.collapse:hover{
  box-shadow: -1px 0 1px 0 #ccc;
}
</style>
