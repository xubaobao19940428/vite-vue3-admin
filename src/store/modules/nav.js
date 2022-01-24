const nav = {
    state: {
        isCollapse: false,
    },
    mutations: {
        setCollapse(state, isCollapse) {
            console.log(isCollapse)
            state.isCollapse = isCollapse
        },
    },
}
export default nav