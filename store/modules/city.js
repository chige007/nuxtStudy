var state = {
    list: ['广东', '湖南']
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