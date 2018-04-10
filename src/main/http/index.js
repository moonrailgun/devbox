const { ipcMain, app } = require('electron')
const { createServer } = require('http-server')
const log = require('electron-log')

let httpServer = null
const homePath = app.getPath('home')

const defaultOptions = {
  root: homePath,
  headers: {},
  cache: 3600,
  showDir: 'true',
  autoIndex: 'true',
  showDotfiles: false,
  gzip: true,
  contentType: 'application/octet-stream',
  ext: undefined,
  cors: undefined,
  proxy: undefined
}

ipcMain.on('http-server-start', function (event, port, options = undefined) {
  if (!httpServer) {
    httpServer = createServer(Object.assign({}, defaultOptions, options))
    httpServer.listen(port)
    log.info('http server start')
  } else {
    log.info('ftp server isrunning!')
  }
})

ipcMain.on('http-server-stop', function (event) {
  if (httpServer) {
    httpServer.close()
    log.info('http server stop')
  }
  httpServer = null
})
