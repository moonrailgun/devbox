<template>
  <div class="main-view">
    <CodeSnippet v-show="curNav === 'snippet'" />
    <Exec v-show="curNav === 'exec'" />
    <Tail v-show="curNav === 'tail'" />
    <AnyProxy v-show="curNav === 'proxy'" />
    <ColorCard v-show="curNav === 'color-card'" />
    <StrEncode v-show="curNav === 'str-encode'" />
    <StrDiff v-show="curNav === 'str-diff'" />
    <StrQrcode v-show="curNav === 'str-qrcode'" />
    <StrBejson v-show="curNav === 'str-bejson'" />
    <SysProcess v-show="curNav === 'sys-process'" />
    <SysPortScan v-show="curNav === 'sys-portscan'" />
    <HTTPServer v-show="curNav === 'sys-httpserver'" />
    <FTPServer v-show="curNav === 'sys-ftpserver'" />
    <Settings v-if="curNav === 'settings'" />
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import CodeSnippet from './View/CodeSnippet'
  import Exec from './View/Exec'
  import StrEncode from './View/Str/StrEncode'
  import StrDiff from './View/Str/StrDiff'
  import StrQrcode from './View/Str/StrQrcode'
  import StrBejson from './View/Str/StrBejson'
  import SysProcess from './View/Sys/SysProcess'
  import SysPortScan from './View/Sys/SysPortScan'
  import HTTPServer from './View/Sys/HTTPServer'
  import FTPServer from './View/Sys/FTPServer'
  import Tail from './View/Tail'
  import ColorCard from './View/ColorCard'
  import Settings from './View/Settings'
  import AnyProxy from './View/AnyProxy'

  export default {
    components: {
      CodeSnippet,
      Exec,
      StrEncode,
      StrDiff,
      StrQrcode,
      StrBejson,
      SysProcess,
      SysPortScan,
      HTTPServer,
      FTPServer,
      Tail,
      AnyProxy,
      ColorCard,
      Settings
    },
    computed: {
      ...mapState({
        curNav: state => state.Nav.curNav
      })
    }
  }
</script>

<style>
.main-view {
  width: 100%;
  min-height: 100%;
  overflow: hidden;
}
</style>
