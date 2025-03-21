import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 10 }),
  actions: {
    increment() {
      this.count++;
    },
  },
});
