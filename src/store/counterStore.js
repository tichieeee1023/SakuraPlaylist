import { create } from 'zustand'

const useCounterStore = create((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count > 0 ? state.count - 1 : 0 })),
  reset: () => set({ count: 0 })
}))

export default useCounterStore