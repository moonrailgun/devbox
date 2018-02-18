const state = {
  curNav: 'snippet'
}

const mutations = {
  SET_NAV (state, {navName}) {
    state.curNav = navName
  }
}

const actions = {
  setNav ({ commit }, name) {
    commit('SET_NAV', {navName: name})
  }
}

export default {
  state,
  mutations,
  actions
}
