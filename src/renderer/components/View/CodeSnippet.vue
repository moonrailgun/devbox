<template>
  <div class="code-snippet">
    <el-row :gutter="5">
      <el-col :span="8" v-for="snippet in snippets">
        <el-card :body-style="{ padding: '0px' }">
          <div class="snippet-screenshot" :style="{backgroundImage: 'url(http://element-cn.eleme.io/static/hamburger.50e4091.png)'}">
            <span>{{snippet.language}}</span>
          </div>
          <div style="padding: 14px;">
            <span>{{snippet.name}}</span>
            <div>
              <time class="time">{{snippet.time}}</time>
              <el-button type="text" class="button" @click="copy(snippet.code)">复制</el-button>
            </div>
          </div>
        </el-card>
      </el-col>

      <!-- 新增 -->
      <el-col :span="8">
        <el-card class="add-new-snippet">
          <i class="el-icon-circle-plus-outline"></i>
          <p>添加新的片段</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { clipboard } from 'electron'

  export default {
    data () {
      return {
        snippets: [{
          name: '简单代码示例',
          time: JSON.stringify(new Date()).substr(1, 10),
          code: 'var a = 1;\nvar b = 2;\nconsole.log(a, b);',
          language: 'javascript'
        }]
      }
    },
    methods: {
      copy (code) {
        clipboard.writeText(code)
        this.$message({message: '已复制到剪切板', type: 'success', duration: 1000})
      }
    }
  }
</script>

<style>
.code-snippet {

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
</style>
