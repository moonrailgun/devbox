<template>
  <div class="main-view">
    <CodeSnippet v-show="curNav === 'snippet'" />
    <SSHEmulator v-if="curNav === 'term'" />
    <Tail v-show="curNav === 'tail'" />
    <Doc v-show="curNav === 'doc'" />
    <ColorCard v-show="curNav === 'color-card'" />
    <StrEncode v-show="curNav === 'str-encode'" />
    <StrDiff v-show="curNav === 'str-diff'" />
    <StrQrcode v-show="curNav === 'str-qrcode'" />
    <StrBejson v-show="curNav === 'str-bejson'" />
    <SysPortScan v-show="curNav === 'sys-portscan'" />
    <Settings v-show="curNav === 'settings'" />
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import CodeSnippet from './View/CodeSnippet'
  import StrEncode from './View/Str/StrEncode'
  import StrDiff from './View/Str/StrDiff'
  import StrQrcode from './View/Str/StrQrcode'
  import StrBejson from './View/Str/StrBejson'
  import SysPortScan from './View/Sys/SysPortScan'
  import Tail from './View/Tail'
  import SSHEmulator from './View/SSHEmulator'
  import Doc from './View/Doc'
  import ColorCard from './View/ColorCard'
  import Settings from './View/Settings'

  export default {
    components: {
      CodeSnippet,
      StrEncode,
      StrDiff,
      StrQrcode,
      StrBejson,
      SysPortScan,
      Tail,
      SSHEmulator,
      Doc,
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
}
</style>
