<template>
  <div class="main-view">
    <div v-show="curNav === 'snippet'">
      代码片段
    </div>
    <div v-show="curNav === 'term'">
      终端
    </div>
    <StrEncode v-show="curNav === 'str-encode'" />
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import StrEncode from './View/Str/StrEncode'

  export default {
    components: { StrEncode },
    computed: {
      ...mapState({
        curNav: state => state.Nav.curNav
      })
    }
  }
</script>
