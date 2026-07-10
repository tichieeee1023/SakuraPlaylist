import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import useAuthStore from './store/authStore'
import './App.scss'

import Guestbook from './pages/Guestbook'
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

            {!user ? (
                initialized ? <AuthForm /> : <div className="top-auth-bar loading-bar">로그인 상태 확인중...</div>
            ) : (
                <div className="top-auth-bar user-info-bar">
                    <p className="welcome-msg">🌸 <span>{user.displayName || user.email}</span>님 환영합니다.</p>
                    <button onClick={signOut} className="bar-logout-btn">로그아웃</button>
                </div>
            )}

            <div className="now-playing-badge">
                <div className="equalizer">
                    <span className="bar"></span><span className="bar"></span>
                    <span className="bar"></span><span className="bar"></span><span className="bar"></span>
                </div>
                <span className="track-info">NOW PLAYING: SAKURA PLAYLIST</span>
            </div>

            <div className="cherry-blossom-container">
                {/* 기존 벚꽃 span 태그들 */}
                <span className="petal"></span><span className="petal"></span>
                <span className="petal"></span><span className="petal"></span><span className="petal"></span>
            </div>

            {/* 3. 메인 콘텐츠 및 라우터 영역 */}
            <div className="main-content-wrapper dashboard-wrapper">
                <Routes>
                    <Route path='/' element={ <Guestbook /> } />
                </Routes>
            </div>
        </div>
    )
}

export default App