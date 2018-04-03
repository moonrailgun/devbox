const { ipcMain, app } = require('electron')
const FtpSrv = require('ftp-srv')

let ftpServer = null
const homePath = app.getPath('home')

ipcMain.on('ftp-server-start', function (event, options = undefined, error = null) {
  if (!ftpServer) {
    ftpServer = new FtpSrv('ftp://0.0.0.0:9876', {
      options
    })
    ftpServer.on('login', (data, resolve, reject) => {
      resolve({
        root: homePath,
        cwd: homePath
      })
    })
    ftpServer.listen().then(() => {
      console.log('ftp server start')
    })
  } else {
    console.log('ftp 服务 已存在')
  }
})

ipcMain.on('ftp-server-stop', function (event) {
  if (ftpServer) {
    ftpServer.close().then(() => {
      console.log('ftp server stop')
    })
  }
  ftpServer = null
})
