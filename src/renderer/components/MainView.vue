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
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import StrEncode from './View/Str/StrEncode'
  import StrDiff from './View/Str/StrDiff'
  import Tail from './View/Tail'

  export default {
    components: { StrEncode, StrDiff, Tail },
    computed: {
      ...mapState({
        curNav: state => state.Nav.curNav
      })
    }
  }
</script>

<style>
.main-view {
  min-height: 100%;
  width: 100%;
}
</style>
