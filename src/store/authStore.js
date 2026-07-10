import { create } from "zustand";
import { 
  signOutWithFirebase,
  signInWithEmail,
  signUpWithEmail,
  subscribeAuthState
} from '../services/firebaseAuth'

const mapUser = (user) => {
    if(!user){
        return null
    }

    return {
        uid : user.uid,
        email : user.email,
        displayName : user.displayName 
    }
}

const useAuthStore = create( (set) =>({
  user: null,
  initialized: false,
  loading: false,
  error: '',

  listenAuthState: () => {
    return subscribeAuthState( (user) => {
      set({
        user: mapUser(user),
        initialized: true,
      })
    })
  },

  signUp: async ({email, password, nickname}) => {
    set({ loading: true, error: '' })
    try {
      const user = await signUpWithEmail({email, password, nickname})
      
      // 💡 [핵심 수정] 리스너 타이밍 버그를 방지하기 위해 가입한 유저 정보와 닉네임을 즉시 수동 수선합니다!
      set({ 
        user: {
          uid: user.uid,
          email: user.email,
          displayName: nickname // 가입할 때 쓴 닉네임을 다이렉트로 주입!
        }, 
        loading: false 
      })
    } catch(err) {
      set({error: err.message, loading:false })
      throw err
    } 
  },

  signIn: async ({email, password}) => {
    set({loading : true, error:''})
    try{
        const user = await signInWithEmail({email, password})
        set({ user : mapUser(user), loading:false })
    }catch(err){
        set({error : err.message, loading:false})
        throw err
    }
  },

  signOut: async () => {
    try{
        await signOutWithFirebase()
        set({ user : null, error: '' })
    }catch(err){
        set({error : err.message})
    }
  }
}))

export default useAuthStore