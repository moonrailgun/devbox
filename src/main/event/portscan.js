import { ipcMain } from 'electron'
import net from 'net'

function scan (host, start, end, callback) {
  var count = end - start
  var result = []
  console.time('port scan time')

  for (var i = start; i <= end; i++) {
    var item = net.connect({
      host: host,
      port: i
    },(function (i) {
      return function () {
        result.push(i)
        this.destroy()
      }
    }(i)))

    item.on('error', function (err) {
      if (err.errno === 'ECONNREFUSED') {
        this.destroy()
      }
    })

    item.on('close', function () {
      if (!count--) {
        console.timeEnd('port scan time')
        callback(result)
      }
    })
  }
}

ipcMain.on('port-scan', function (event, host, start = 1, end = 65535) {
  console.log('开始扫描', host, ' | 开始:', start , '结束:', end)
  (function(host, start, end) {
    scan(host, start, end, function (result) {
      event.sender.send('port-scan-finished', host, result)
    })
  })(host, start, end)
})
