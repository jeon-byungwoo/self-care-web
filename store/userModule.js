let USERMODULE = {
    namespaced: true,
    anyValues: 0,
    expire: 12,
    state: () => ({
        userInfo: {},
        login: false,
        table: ''
    }),
    mutations: {
        loginRegist (state, param) {
            state.userInfo = { ...param }
            state.login = true
        },
        userInfoInit(state) {
            state = {
                userInfo: {},
                login: false
            }
        },
        logout (state) {
            Object.assign(state,{
                userInfo: {},
                login: false,
            })
        },
        setTable(state, table) {
            state.table = table
        }
    },
    actions: {
        logout(context) {
            context.commit('logout')
        },
        loginRegist(context, param) {
            context.commit('loginRegist', param)
        },
        setTable(context, table) {
            context.commit('setTable', table)
        }
    },
}
export default USERMODULE