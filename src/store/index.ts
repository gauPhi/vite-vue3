import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => {
    return {
      count: 0,
      name: "high fly",
    };
  },
  getters: {
    count20(state) {
      console.log("调用了count20");
      return state.count + 20;
    },
  },
  // 在 actions 中接受参数并使用
  actions: {
    // 注意：此处定义不能使用箭头函数，因为箭头函数本身并无 this
    changeState(step: number) {
      // 相当于此时的 actions是 Vue模板中的 methos，state是 vue模板中的data
      this.count += step;
    },
  },
});
