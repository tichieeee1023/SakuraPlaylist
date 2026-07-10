import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import useAuthStore from './store/authStore'
import './App.scss'

import Board from './pages/Board'
import Detail from './pages/Detail'
import Counter from './count/Counter'
import ResetCounter from './count/ResetCounter'
import AuthForm from './components/AuthForm'

const App = () => {
    const user = useAuthStore( (state) => state.user )
    const initialized = useAuthStore( (state) => state.initialized )
    const listenAuthState = useAuthStore( (state) => state.listenAuthState )
    const signOut = useAuthStore( (state) => state.signOut )

    useEffect( () => {
        const unsubscribe = listenAuthState()

        return unsubscribe
    }, [listenAuthState])

    return (
        <div className="app-container">
            {/* 1. 최상단 가로형 인증/유저 바 영역 */}
            {!user ? (
                initialized ? (
                    <AuthForm />
                ) : (
                    <div className="top-auth-bar loading-bar">로그인 상태 확인중...</div>
                )
            ) : (
                <div className="top-auth-bar user-info-bar">
                    {/* 💡 닉네임 기능 대응을 위해 displayName이 있으면 닉네임이 뜨도록 보완 */}
                    <p className="welcome-msg">🌸 <span>{user.displayName || user.email}</span>님 환영합니다.</p>
                    <button onClick={signOut} className="bar-logout-btn">로그아웃</button>
                </div>
            )}

            {/* 🎵 [새로 추가] 상시 음악 재생 중인 느낌을 주는 실시간 오디오 웨이브 배지 */}
            <div className="now-playing-badge">
                <div className="equalizer">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
                <span className="track-info">NOW PLAYING: SAKURA PLAYLIST</span>
            </div>

            {/* 2. 벚꽃 배경 애니메이션 컨테이너 */}
            <div className="cherry-blossom-container">
                <span className="petal"></span>
                <span className="petal"></span>
                <span className="petal"></span>
                <span className="petal"></span>
                <span className="petal"></span>
                <span className="petal"></span>
                <span className="petal"></span>
                <span className="petal"></span>
                <span className="petal"></span>
                <span className="petal"></span>
            </div>

            {/* 3. 메인 콘텐츠 및 라우터 영역 */}
            <div className="main-content-wrapper">
                <Routes>
                    <Route path='/' element={ <Board /> } />
                    <Route path='/detail/:id' element={ <Detail /> } />
                </Routes>
            </div>
        </div>
    )
}

export default App