import {
    browserLocalPersistence,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    setPersistence,
    signInWithEmailAndPassword,
    signOut as FirebaseSignOut,
    updateProfile, 
}from 'firebase/auth' 
import {auth} from '../firebase.js'

const getAuthMessage = (code) => {
    const message = {
    'auth/email-already-in-use': '이미 가입된 이메일입니다.',
    'auth/invalid-email': '이메일 형식이 올바르지 않습니다.',
    'auth/invalid-credential': '이메일 또는 비밀번호가 올바르지 않습니다.',
    'auth/weak-password': '비밀번호는 6자 이상으로 입력해 주세요.',
    'auth/user-disabled': '비활성화된 계정입니다.',
    }
    return message[code] || '인증요청에 실패했습니다'
}

const handleAuthError = (error) => {
    throw new Error(getAuthMessage(error.code))
}

setPersistence(auth, browserLocalPersistence)

export const subscribeAuthState = (callback) => {
    return onAuthStateChanged(auth, callback)
}

export const signUpWithEmail = async ({email, password, nickname}) => {
    try{
        const credential = await createUserWithEmailAndPassword( auth, email, password)
        
        // 1. 프로필에 닉네임 저장
        await updateProfile(credential.user, {
            displayName: nickname
        })
        
        // 💡 [핵심 추가] 파이어베이스 내부에 저장된 유저 프로필 상태를 강제로 새로고침합니다!
        await credential.user.reload()
        
        return auth.currentUser
    }catch(err){
        handleAuthError(err)
    }
}

export const signInWithEmail = async ({email, password}) => {
    try{
        const credential = await signInWithEmailAndPassword(auth, email, password)
        return credential.user
    }catch(err){
        handleAuthError(err)
    }
}

export const signOutWithFirebase = async () => {
    try {
        await FirebaseSignOut(auth)
    } catch(err) {
        handleAuthError(err)
    }
}