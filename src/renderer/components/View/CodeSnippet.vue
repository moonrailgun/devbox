<template>
  <div class="code-snippet">
    <el-dialog
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose">
      <span slot="title" class="snippet-editing-title">
        <el-input v-model="editingName" placeholder="请输入片段名"></el-input>
      </span>
      <codemirror class="container" v-model="editingCode" :options="cmOptions"></codemirror>
      <span slot="footer">
        <el-button type="primary" @click="save()">保 存</el-button>
      </span>
    </el-dialog>

    <el-row :gutter="5">
      <el-card :body-style="{ padding: '0px' }" v-for="snippet in snippets" :key="snippet.id">
        <div class="snippet-screenshot" :style="{backgroundImage: 'url(http://element-cn.eleme.io/static/hamburger.50e4091.png)'}">
          <span>{{snippet.language}}</span>
        </div>
        <div style="padding: 14px;">
          <p class="snippet-name">{{snippet.name}}</p>
          <div>
            <!-- <time class="time">{{snippet.time}}</time> -->
            <el-button type="text" class="button" @click="remove(snippet.id)">移除</el-button>
            <el-button type="text" class="button" @click="edit(snippet.id, snippet.name, snippet.code)">编辑</el-button>
            <el-button type="text" class="button" @click="copy(snippet.code)">复制</el-button>
          </div>
        </div>
      </el-card>

      <!-- 新增代码片段 -->
      <div @click="edit(null, '', '')">
        <el-card class="add-new-snippet">
          <i class="el-icon-circle-plus-outline"></i>
          <p>添加新的片段</p>
        </el-card>
      </div>
    </el-row>
  </div>
</template>

<script>
  import { clipboard } from 'electron'

  export default {
    data () {
      return {
        cmOptions: {
          tabSize: 2,
          lineNumbers: true,
          line: true,
          mode: {name: 'javascript', json: true}
        },
        snippets: [{
          id: 1,
          name: '简单代码示例',
          time: JSON.stringify(new Date()).substr(1, 10),
          code: 'var a = 1;\nvar b = 2;\nconsole.log(a, b);',
          language: 'javascript'
        }],
        snippetIndex: 1,
        editingId: null,
        editingCode: '',
        editingName: '',
        dialogVisible: false
      }
    },
    methods: {
      copy (code) {
        clipboard.writeText(code)
        this.$message({message: '已复制到剪切板', type: 'success', duration: 1000})
      },
      edit (id, name, code) {
        this.editingId = id
        this.editingCode = code
        this.editingName = name
        this.dialogVisible = true
      },
      save () {
        if (!this.editingName) {
          this.$message.error('请输入片段名')
          return
        }

        if (!this.editingId) {
          let pkg = {
            id: ++this.snippetIndex,
            name: this.editingName,
            time: JSON.stringify(new Date()).substr(1, 10),
            code: this.editingCode,
            language: 'javascript'// TODO
          }
          this.snippets.push(pkg)
        } else {
          let snippet = this.snippets.find(i => i.id === this.editingId)
          snippet.name = this.editingName
          snippet.code = this.editingCode
          snippet.time = JSON.stringify(new Date()).substr(1, 10)
        }
        this.dialogVisible = false
      },
      remove (id) {
        let index = this.snippets.findIndex(i => i.id === id)
        this.snippets.splice(index, 1)
      },
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      }
    }
  }
</script>

<style>
.code-snippet {

}

.code-snippet .snippet-name {
  line-height: 22px;
}

.code-snippet .snippet-screenshot {
  display: block;
  width: 100%;
  height: 240px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: left;
  background-position-y: center;
  position: relative;
}

.code-snippet .snippet-screenshot span {
  position: absolute;
  top: 0;
  right: 0;
  padding: 3px 6px;
  background: #67C23A;
  color: white;
  border-bottom-left-radius: 4px;
}

.code-snippet .el-card {
  width: 200px;
  float: left;
  margin: 2.5px;
}

.code-snippet .add-new-snippet .el-card__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  height: 330px;
}

.code-snippet .add-new-snippet .el-card__body i {
  font-size: 60px;
  margin-bottom: 30px;
}

.code-snippet .snippet-editing-title .el-input {
  width: 240px;
}
</style>
