import React, { useState } from 'react'
import useAuthStore from '../store/authStore'

const AuthForm = () => {
    const [mode, setMode] = useState('signIn')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nickname, setNickname] = useState('') // ✨ [추가] 닉네임 상태 데이터

    const signIn = useAuthStore((state) => state.signIn)
    const signUp = useAuthStore((state) => state.signUp)
    const loading = useAuthStore((state) => state.loading)

    const isSignIn = mode === 'signIn'

    const submitAuth = async (e) => {
        e.preventDefault()
        
        // 🌸 회원가입(JOIN US)일 때는 닉네임 입력 여부도 필수 체크!
        if (email.trim() === '' || password.trim() === '' || (!isSignIn && nickname.trim() === '')) {
            alert('모든 정보를 정확히 입력해 주세요')
            return
        }
        
        try {
            if (isSignIn) { 
                await signIn({ email, password }) 
            } else { 
                // ✨ 회원가입할 때 스토어로 nickname도 함께 쏩니다!
                await signUp({ email, password, nickname }) 
            }
        } catch (err) {
            alert(err.message || '인증에 실패했습니다.')
        }
    }

    return (
        <div className="top-auth-bar">
            <form onSubmit={submitAuth} className="horizontal-form">
                <div className="auth-info-text">
                    🌸 {isSignIn ? 'LOGIN' : 'JOIN US'}
                </div>
                
                {/* 🌸 [핵심 추가] 회원가입 모드일 때만 가로 바 맨 앞에 닉네임 창이 짠! 나타납니다 */}
                {!isSignIn && (
                    <input 
                        type="text" 
                        placeholder="Nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        className="bar-input"
                    />
                )}

                <input 
                    type="email" 
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bar-input"
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bar-input"
                />
                <button type="submit" disabled={loading} className="bar-submit-btn">
                    {loading ? '...' : isSignIn ? '로그인' : '가입하기'}
                </button>
                <button 
                    onClick={() => {
                        setMode(isSignIn ? 'signUp' : 'signIn');
                        setNickname(''); // 모드 전환 시 닉네임 칸 청소
                    }} 
                    type="button" 
                    className="bar-toggle-btn"
                >
                    {isSignIn ? '회원가입으로 변경' : '로그인으로 변경'}
                </button>
            </form>
        </div>
    )
}

export default AuthForm