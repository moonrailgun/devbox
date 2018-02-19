<template>
  <div class="main-view">
    <div v-show="curNav === 'snippet'">
      代码片段
    </div>
    <div v-show="curNav === 'term'">
      终端
    </div>
    <Tail v-show="curNav === 'tail'" />
    <StrEncode v-show="curNav === 'str-encode'" />
    <StrDiff v-show="curNav === 'str-diff'" />
    <Settings v-show="curNav === 'settings'" />
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import StrEncode from './View/Str/StrEncode'
  import StrDiff from './View/Str/StrDiff'
  import Tail from './View/Tail'
  import Settings from './View/Settings'

  export default {
    components: { StrEncode, StrDiff, Tail, Settings },
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
}
</style>
