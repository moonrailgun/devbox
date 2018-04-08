const { ipcMain } = require('electron')
const AnyProxy = require('anyproxy')
const log = require('electron-log')
const defaultOptions = {
  port: 8001,
  // rule: require('myRuleModule'),
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

ipcMain.on('proxy-server-start', function (event, options = null) {
  if (!isProxyStarted) {
    proxyServer = new AnyProxy.ProxyServer(Object.assign({}, defaultOptions, options))
    proxyServer.on('ready', () => {
      log.info('[AnyProxy]:', 'ready')
    })
    proxyServer.on('error', (e) => {
      log.error('[AnyProxy]:', e)
    })
    proxyServer.start()
    isProxyStarted = true
  } else {
    log.info('[AnyProxy]:', 'proxy server has been started!')
  }
})

ipcMain.on('proxy-server-stop', function (event) {
  if (isProxyStarted) {
    proxyServer.close()
    isProxyStarted = false
  } else {
    log.info('[AnyProxy]:', 'proxy server has been closed!')
  }
})
