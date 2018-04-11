const state = {
  scripts: []
}

const mutations = {
  MODIFY_EXEC_SCRIPTS (state, {data}) {
    state.scripts = data
  }
}

const actions = {
  modifyExecScripts ({ commit }, payload) {
    commit('MODIFY_EXEC_SCRIPTS', {data: payload})
  }
}

export default {
  state,
  mutations,
  actions
}
