const state = {
  docTree: [{
    id: 0,
    label: '文档'
  }]
}

const mutations = {
  MODIFY_DOC_TREE (state, {data}) {
    state.docTree = Object.assign({}, state.docTree, data)
  }
}

const actions = {
  modifyDocTree ({ commit }, payload) {
    commit('MODIFY_DOC_TREE', {data: payload})
  }
}

export default {
  state,
  mutations,
  actions
}
