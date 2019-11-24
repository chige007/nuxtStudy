var state = {
    list: ['东莞银行', '平安银行']
}

const mutations = {
    add (state, text) {
        state.list.push(text)
    }
}

const actions = {
    add: ({commit}, text) => {
        commit('add', text)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}