import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const options = {
  state: {
      isLogin: false,
      historyList: [{name: '首页', path: '/'}],
      activeIndex: 0,
  },
  mutations: {

      addHistory(state, item) {
         state.historyList.push(item);
         state.activeIndex = state.historyList.length - 1;
      },
      // 切换路由
      changeActive(state, {index, path}) {
        if (index) {
            state.activeIndex = index;
            return;
        }
        if (path) {
            state.historyList.find((history, n) => {
                if (history.path === path) {
                    state.activeIndex = n;
                }
            })
        }
      },
      // 删除缓存的路由
      deleteHistory(state, {index, vm}){
        if (index == 0) {
            return ;
        }
        state.historyList.splice(index, 1);

        if (state.activeIndex === index) {
            state.activeIndex = index - 1;
            vm.$router.push(state.historyList[index - 1].path);

        } else if (state.activeIndex > index) {
            state.activeIndex = state.activeIndex - 1;
        }
      },

  },
  actions: {

  },
  getters: {

  }

}

export default new Vuex.Store(options)