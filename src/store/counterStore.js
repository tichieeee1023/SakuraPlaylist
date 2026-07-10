import { create } from "zustand";

const useCounterStore = create((set) => ({
    // 1. 상태 데이터: 초기 숫자값 0
    count: 0,

    // 2. 액션: 숫자를 1씩 더하는 함수
    increase: () => {
        set((state) => ({
            count: state.count + 1
        }))
    },

    // 3. 액션: 숫자를 1씩 빼는 함수
    decrease: () => {
        set((state) => ({
            count: state.count - 1
        }))
    },

    reset: ()=>{
        set({
            count:0,
        })
    }
}))

export default useCounterStore; 