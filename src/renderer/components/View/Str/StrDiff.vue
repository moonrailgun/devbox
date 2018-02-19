<template>
  <el-form :label-position="'top'" label-width="80px">
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="原文本">
          <el-input :rows="14" type="textarea" v-model="oriText"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="新文本">
          <el-input :rows="14" type="textarea" size="medium" v-model="newText"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row style="text-align: right">
      <el-button @click="updateDiffText()">进行比较</el-button>
    </el-row>
    <el-row>
      <div class="diff-container" v-html="diffText"></div>
    </el-row>
  </el-form>
</template>

<script>
import diffview from '../../../../../static/lib/diffview'
import difflib from '../../../../../static/lib/difflib'

export default {
  data () {
    return {
      oriText: '',
      newText: '',
      diffText: ''
    }
  },
  methods: {
    updateDiffText () {
      let base = difflib.stringAsLines(this.oriText)
      let newtxt = difflib.stringAsLines(this.newText)
      let sm = new difflib.SequenceMatcher(base, newtxt)
      let opcodes = sm.get_opcodes()
      let html = diffview.buildView({
        baseTextLines: base,
        newTextLines: newtxt,
        opcodes: opcodes,
        baseTextName: '原文本',
        newTextName: '新文本',
        contextSize: null,
        viewType: 0 // inline, 1或0
      })
      this.$set(this.$data, 'diffText', html)
      let temp = document.createElement('div')
      html.setAttribute('cellspacing', '0')
      temp.appendChild(html)
      html = temp.innerHTML
      this.$set(this.$data, 'diffText', html)
    }
  }
}
</script>

<style>
.diff-container {
  margin-top: 10px;
}

table.diff {
  width: 100%;
}

table.diff th {
  color: rgba(27,31,35,0.3);
  background-color: #f3f3f3;
  width: 5%;
}
table.diff thead th {
  color: rgba(27,31,35,0.3);
  background-color: transparent;
}

table.diff td {
  color: #032f62;
  width: 45%;
}
table.diff td.empty {
  background-color: #e2e2e2;
}
table.diff td.equal {
  background-color: #fff;
}
table.diff td.replace:nth-of-type(1) {
  background-color: #ffeef0;
}
table.diff td.replace:nth-of-type(2) {
  background-color: #e6ffed;
}
</style>
