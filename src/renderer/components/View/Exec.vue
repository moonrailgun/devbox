<template>
  <div class="exec">
    <el-dialog
      title="添加新的命令"
      :visible.sync="dialogVisible"
      width="70%">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addScript">确 定</el-button>
      </span>

      <el-tabs>
        <el-tab-pane label="基本配置">
          <el-form :model="editing" label-width="80px">
            <el-form-item label="工作空间">
              <el-input v-model="editing.cwd" placeholder="请输入工作空间"></el-input>
            </el-form-item>
            <el-form-item label="脚本代码">
              <el-input type="textarea" v-model="editing.script" placeholder="请输入脚本代码" :rows="3"></el-input>
              <p class="tip">可以使用${variable}形式插入变量</p>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="变量配置">
          <p>配置变量默认值, 可为空</p>
          <el-form label-width="80px">
            <el-form-item :label="evar" v-for="evar in editingVariables" :key="evar">
              <el-input v-model="editing.default[evar]" :placeholder="`请输入变量${evar}默认值`"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <el-dialog
      title="命令日志"
      :visible.sync="isShowShellLog"
      width="70%">
      <pre>{{shellLog}}</pre>
    </el-dialog>

    <el-row>
      <el-button type="primary" icon="el-icon-plus" plain @click="dialogVisible = true">添加命令</el-button>
    </el-row>
    <el-row class="scripts">
      <div class="item" v-for="(s, i) in scripts" :key="JSON.stringify(s)+i">
        <div class="code"><pre>{{s.script}}</pre></div>
        <div class="actions">
          <el-button type="success" size="mini" icon="el-icon-caret-right" round @click="runScript(s)">运行</el-button>
          <el-button
            size="mini"
            :icon="isShowPanelIndex === i ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"
            @click="isShowPanelIndex === i ? isShowPanelIndex = -1 : isShowPanelIndex = i"
            round
          >展开</el-button>
          <el-dropdown trigger="click" @command="(command) => command()">
            <span class="el-dropdown-link">
              <el-button type="primary" icon="el-icon-more" size="mini" circle></el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="() => removeScript(i)">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <el-collapse-transition>
          <div v-show="isShowPanelIndex === i">
            <div v-for="v in s.variables" :key="v">
              <div class="var-name">{{v}}</div>
              <el-input :placeholder="s.default[v]" size="mini" v-model="s.values[v]"></el-input>
            </div>
          </div>
        </el-collapse-transition>
      </div>
    </el-row>
  </div>

</template>

<script>
import log from 'electron-log'
import execa from 'execa'

export default {
  data () {
    return {
      dialogVisible: false,
      editing: {
        cwd: './',
        script: 'echo "Hello ${name}!"', // eslint-disable-line
        default: {
          name: 'World'
        }
      },
      // scripts: [],
      isShowPanelIndex: -1,
      isShowShellLog: false,
      shellLog: ''
    }
  },
  computed: {
    editingVariables: function () {
      const script = this.editing.script
      let vars = script.match(/\${.+?}/g) || []
      vars = vars.map(s => s.slice(2, -1))
      return vars
    },
    scripts: {
      get () {
        return this.$store.state.Exec.scripts || []
      },
      set (value) {
        this.$store.dispatch('modifyExecScripts', Object.assign([], value))
      }
    }
  },
  methods: {
    addScript () {
      let newScripts = this.scripts.concat(Object.assign({}, {
        variables: this.editingVariables,
        values: {}
      }, this.editing))
      this.scripts = newScripts
      this.dialogVisible = false
    },
    runScript (scriptData) {
      let script = scriptData.script
      script = script.replace(/\${.*?}/g, function (varText) {
        varText = varText.slice(2, -1)
        return scriptData.values[varText] || scriptData.default[varText] || ''
      })
      log.info('[exec shell]', script)
      this.showShellLog(script, scriptData.cwd)
      this.scripts = this.scripts // 更新一下vuex中的脚本内容(自动保存)
    },
    showShellLog (script, cwd) {
      this.isShowShellLog = true
      this.shellLog = `$ ${script}\n`
      execa.shell(script, { cwd }).then(result => {
        this.shellLog += result.stdout
      })
    },
    removeScript (i) {
      let scripts = JSON.parse(JSON.stringify(this.scripts))
      scripts.splice(i, 1)
      this.scripts = scripts
    }
  }
}
</script>

<style>
.exec .el-tabs {
  height: 300px;
}

.exec .el-dialog__body {
  padding-top: 0;
}

.exec .scripts {
  padding: 10px;
  padding-left: 0;
}

.exec .item {
  padding: 10px;
  padding-bottom: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  border-radius: 3px;
  background-color: white;
  transition: all 0.2s ease-in-out;
  cursor: default;
  position: relative;
}

.exec .item .code {
  margin-bottom: 30px;
}

.exec .item .actions {
  position: absolute;
  right: 10px;
  bottom: 10px;
}

.exec .item .actions .el-button--mini.is-circle{
  padding: 7px;
}

.exec .scripts .item:hover {
  box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.2);
}

.exec .scripts .item .var-name {
  width: 80px;
  line-height: 28px;
  height: 28px;
  display: inline-block;
  text-align: right;
}
.exec .scripts .item .var-name:after {
  content: ':';
}

.exec .scripts .item .el-input--mini {
  width: 180px;
}
</style>
