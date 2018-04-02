const { ipcMain } = require('electron')
const AnyProxy = require('anyproxy')
const defaultOptions = {
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

let isProxyStarted = false
let proxyServer = null

ipcMain.on('proxy-server-start', function (event, options = null, error = null) {
  if (!isProxyStarted) {
    proxyServer = new AnyProxy.ProxyServer(Object.assign({}, defaultOptions, options))
    proxyServer.on('ready', () => {
      console.log('[AnyProxy]:', 'ready')
    })
    proxyServer.on('error', (e) => {
      console.log('[AnyProxy]:', e)
      error && error(e)
    })
    proxyServer.start()
    isProxyStarted = true
  } else {
    console.log('[AnyProxy]:', 'proxy server has been started!')
  }
})

ipcMain.on('proxy-server-stop', function (event) {
  if (isProxyStarted) {
    proxyServer.close()
    isProxyStarted = false
  } else {
    console.log('[AnyProxy]:', 'proxy server has been closed!')
  }
})
