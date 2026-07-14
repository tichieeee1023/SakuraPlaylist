<<<<<<< HEAD
import React, { useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import useAuthStore from './store/authStore'
import './App.scss'
import Board from './pages/Board' 
import Detail from './pages/Detail'       
import Guestbook from './pages/Guestbook'   
=======
import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import useAuthStore from './store/authStore'
import './App.scss'

import Board from './pages/Board'
import Detail from './pages/Detail'
import Counter from './count/Counter'
import ResetCounter from './count/ResetCounter'
>>>>>>> 7610373b1884168048a687b6f88d8b83a12af7d2
import AuthForm from './components/AuthForm'

const App = () => {
    const user = useAuthStore( (state) => state.user )
    const initialized = useAuthStore( (state) => state.initialized )
    const listenAuthState = useAuthStore( (state) => state.listenAuthState )
    const signOut = useAuthStore( (state) => state.signOut )
<<<<<<< HEAD
    const location = useLocation()

    useEffect( () => {
        const unsubscribe = listenAuthState()
=======

    useEffect( () => {
        const unsubscribe = listenAuthState()

>>>>>>> 7610373b1884168048a687b6f88d8b83a12af7d2
        return unsubscribe
    }, [listenAuthState])

    return (
        <div className="app-container">
<<<<<<< HEAD

            {!user ? (
                initialized ? <AuthForm /> : <div className="top-auth-bar loading-bar">로그인 상태 확인중...</div>
            ) : (
                <div className="top-auth-bar user-info-bar">
=======
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
>>>>>>> 7610373b1884168048a687b6f88d8b83a12af7d2
                    <p className="welcome-msg">🌸 <span>{user.displayName || user.email}</span>님 환영합니다.</p>
                    <button onClick={signOut} className="bar-logout-btn">로그아웃</button>
                </div>
            )}

<<<<<<< HEAD
            <div className="now-playing-badge">
                <div className="equalizer">
                    <span className="bar"></span><span className="bar"></span>
                    <span className="bar"></span><span className="bar"></span><span className="bar"></span>
=======
            {/* 🎵 [새로 추가] 상시 음악 재생 중인 느낌을 주는 실시간 오디오 웨이브 배지 */}
            <div className="now-playing-badge">
                <div className="equalizer">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
>>>>>>> 7610373b1884168048a687b6f88d8b83a12af7d2
                </div>
                <span className="track-info">NOW PLAYING: SAKURA PLAYLIST</span>
            </div>

<<<<<<< HEAD
           <div className="cherry-blossom-container">
                {/* 기존 벚꽃 span 태그들 */}
                <span className="petal"></span><span className="petal"></span>
                <span className="petal"></span><span className="petal"></span><span className="petal"></span>
=======
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
>>>>>>> 7610373b1884168048a687b6f88d8b83a12af7d2
            </div>

            {/* 3. 메인 콘텐츠 및 라우터 영역 */}
            <div className="main-content-wrapper">
<<<<<<< HEAD
                
                {/* ✨ [핵심 추가] 게시판 / 방명록 이동 네비게이션 바 */}
                <div className="global-nav-menu">
                    <Link 
                        to="/" 
                        className={location.pathname === '/' || location.pathname.includes('/detail') ? 'active' : ''}
                    >
                        게시판
                    </Link>
                    <Link 
                        to="/guestbook" 
                        className={location.pathname === '/guestbook' ? 'active' : ''}
                    >
                        방명록
                    </Link>
                </div>

                <div className="dashboard-wrapper">
                    <Routes>
                        {/* 기본 메인 화면(/)은 일반 게시판으로! */}
                        <Route path='/' element={ <Board /> } />
                        <Route path='/detail/:id' element={ <Detail /> } />
                        {/* 방명록은 /guestbook 주소로! */}
                        <Route path='/guestbook' element={ <Guestbook /> } />
                    </Routes>
                </div>
=======
                <Routes>
                    <Route path='/' element={ <Board /> } />
                    <Route path='/detail/:id' element={ <Detail /> } />
                </Routes>
>>>>>>> 7610373b1884168048a687b6f88d8b83a12af7d2
            </div>
        </div>
    )
}

export default App