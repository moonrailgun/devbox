import { ipcMain } from 'electron'
import { Tail } from 'tail'

let tailfileList = []
let watchProcess = []
let isWatch = false

ipcMain.on('tail-file-update', function (event, logfiles) {
  console.log('更新日志文件列表:', logfiles)
  tailfileList = logfiles
})

ipcMain.on('tail-file-watch', function (event) {
  if (isWatch) {
    return '正在监听中'
  }
  console.log('监听列表:', tailfileList)

  for (let file of tailfileList) {
    let { name, path } = file
    let tail = new Tail(path)
    tail.on('line', function (data) {
      // console.log(data)
      event.sender.send('tail-file-log', name, data)
    })

    tail.on('error', function (error) {
      // console.log('ERROR: ', error)
      event.sender.send('tail-file-log', name, 'ERROR: ' + error)
    })

    watchProcess.push({
      name,
      path,
      tail
    })
  }
  isWatch = true
  console.log('开启文件监听成功')
})

ipcMain.on('tail-file-unwatch', function (event) {
  if (!isWatch) {
    return '已关闭文件监听'
  }

  for (let p of watchProcess) {
    p.tail.unwatch()
  }
  watchProcess = []
  isWatch = false
  console.log('停止文件监听成功')
})
