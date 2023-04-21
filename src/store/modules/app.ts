function getDefaultState() {
    return {
        //展开收起菜单
        isCollapse: false,
    };
}

const state = getDefaultState();

const mutations = {
    // 设置展开收起菜单
    SET_COLLAPSE: (state: any, isCollapse: boolean) => {
        state.isCollapse = isCollapse;
    },
};
const actions = {};
const getters = {};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
