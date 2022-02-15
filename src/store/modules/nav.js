const nav = {
    state: {
        isCollapse: false,
        tagsViewList:[]
    },
    mutations: {
        setCollapse(state, isCollapse) {
            console.log(isCollapse)
            state.isCollapse = isCollapse
        },
        setTagsViewList(state,tagsView){
            let arr = []
            arr = state.tagsViewList.filter(item=>{
                return item.path == tagsView.path
            })
            if(arr.length==0){
                state.tagsViewList = [...state.tagsViewList,tagsView]
            }
        },
        delTagsViewList(state,tagsView){
            state.tagsViewList = state.tagsViewList.filter(item=>{
                return item.path!=tagsView.path
            })
        }
    },
    actions:{
        setTagsViewListaction({commit},tagsView){
            commit('setTagsViewList',tagsView)
        },
        deleteTagsViewAction({commit},tagsView){
            commit('delTagsViewList',tagsView)
        }
    },
}
export default nav