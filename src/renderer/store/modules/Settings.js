const state = {
  settings: {}
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

export default {
  state,
  mutations,
  actions
}
