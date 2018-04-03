const { ipcMain } = require('electron')
const FtpSrv = require('ftp-srv')

let ftpServer = null

ipcMain.on('ftp-server-start', function (event, options = null, error = null) {
  if(ftpServer) {
    ftpServer = new FtpSrv('ftp://0.0.0.0:9876', {
      options
    });
    ftpServer.listen().then(() => {
      console.log('ftp server start');
    });
  }else {
    console.log('ftp 服务 已存在');
  }
})

ipcMain.on('ftp-server-stop', function (event) {
  if(ftpServer) {
    ftpServer.close().then(() => {
      console.log('ftp server stop');
    });
  }
  ftpServer = null;
})
