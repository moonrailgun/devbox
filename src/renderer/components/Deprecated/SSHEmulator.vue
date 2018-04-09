<template>
  <div class="terminal-container">
    <div class="server-info">
      终端名
    </div>
    <div ref="terminal" class="ssh-terminal"></div>
  </div>
</template>

<script>
  import { Terminal } from 'xterm'
  import * as fit from 'xterm/lib/addons/fit/fit'
  import * as pty from 'node-pty'
  import { ipcRenderer } from 'electron'
  import os from 'os'

  export default {
    data () {
      return {
        term: null,
        ptyProcess: null
      }
    },
    methods: {
      resize () {
        if (this.term) {
          let { cols, rows } = fit.proposeGeometry(this.term)
          this.term.fit()
          this.ptyProcess && this.ptyProcess.resize(cols, rows)
        } else {
          console.warn('no term!')
        }
      },
      init () {
        Terminal.applyAddon(fit)
        this.term = new Terminal({})
        this.term.open(this.$refs.terminal)

        let shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash'
        this.ptyProcess = pty.fork(shell, [], {
          name: 'xterm-color',
          cols: 80,
          rows: 10,
          cwd: process.env.HOME,
          env: process.env
        })

        this.ptyProcess.on('data', (data) => {
          this.term.write(data)
        })

        this.term.on('data', (data) => {
          this.ptyProcess.write(data)
        })

        this.resize()
      }
    },
    mounted () {
      // console.log(Terminal)
      console.log('init ssh emulator')
      ipcRenderer.on('resize', () => {
        this.resize()
      })

      this.init()
    }
  }
</script>

<style>
.terminal-container{
  min-height: calc(100vh - 40px);
  max-height: calc(100vh - 40px);
  overflow: auto;
  /* min-height: 100%; */
  display: flex;
  flex-direction: column;
}

.terminal.xterm {
  padding: 10px;
  flex: 1;
}

.ssh-terminal {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
