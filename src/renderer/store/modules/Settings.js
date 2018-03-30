const state = {
  settings: {
    tailMaxLine: 1000,
    menuCollapse: false
  }
}

const mutations = {
  MODIFY_SETTINGS (state, {data}) {
    state.settings = Object.assign({}, state.settings, data)
  }
}

const actions = {
  modifySettings ({ commit }, payload) {
    commit('MODIFY_SETTINGS', {data: payload})
  }
}

const getters = {
  asideWidth: state => state.settings.menuCollapse ? 64 : 201
}

export default {
  state,
  getters,
  mutations,
  actions
}
