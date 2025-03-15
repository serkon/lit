import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0, doubleCount: 0 }),
  actions: {
    increment() {
      this.count++;
    },
  },
});
