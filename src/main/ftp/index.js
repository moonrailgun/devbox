const { ipcMain, app } = require('electron')
const FtpSrv = require('ftp-srv')
const log = require('electron-log')

let ftpServer = null
const homePath = app.getPath('home')

ipcMain.on('ftp-server-start', function (event, options = undefined, error = null) {
  if (!ftpServer) {
    ftpServer = new FtpSrv('ftp://0.0.0.0:8880', {
      pasv_range: 8881,
      greeting: ['hello', 'world'],
      anonymous: true,
      file_format: 'ep'
    })
    ftpServer.on('login', (data, resolve, reject) => {
      resolve({
        root: homePath
      })
    })
    ftpServer.listen().then(() => {
      log.info('ftp server start')
    })
  } else {
    log.info('ftp server isrunning!')
  }
})

ipcMain.on('ftp-server-stop', function (event) {
  if (ftpServer) {
    ftpServer.close().then(() => {
      log.info('ftp server stop')
    })
  }
  ftpServer = null
})
