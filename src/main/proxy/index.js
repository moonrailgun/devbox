const { ipcMain } = require('electron')
const AnyProxy = require('anyproxy')
const options = {
  port: 8001,
  // rule: require('myRuleModule'),s
  webInterface: {
    enable: true,
    webPort: 8002
  },
  throttle: 10000,
  forceProxyHttps: false,
  wsIntercept: false, // 不开启websocket代理
  silent: false
}
const proxyServer = new AnyProxy.ProxyServer(options)
proxyServer.on('ready', () => {
  console.log('[AnyProxy]:', 'ready')
})
proxyServer.on('error', (e) => {
  console.log('[AnyProxy]:', e)
})

let isProxyStarted = false

ipcMain.on('proxy-server-start', function (event) {
  if (!isProxyStarted) {
    proxyServer.start()
  } else {
    console.log('proxy server has been started!')
  }
})

ipcMain.on('proxy-server-stop', function (event) {
  if (isProxyStarted) {
    proxyServer.close()
  } else {
    console.log('proxy server has been closed!')
  }
})
