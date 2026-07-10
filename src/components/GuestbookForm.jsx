import React, { useState, useRef } from 'react'
import useAuthStore from '../store/authStore'
import useGuestbookStore from '../store/guestbookStore'

const MINIMI_LIST = ['😀', '😎', '😍', '😭', '❤️', '👋', '🌸', '🍀', '🖥️',]; 

const GuestbookForm = () => {
    const user = useAuthStore((state) => state.user);
    const addGuestbook = useGuestbookStore((state) => state.addGuestbook);
    const loading = useGuestbookStore((state) => state.loading);

    const [content, setContent] = useState('');
    const [minimi, setMinimi] = useState(MINIMI_LIST[0]); // 기본 이모티콘

    // 방명록 게시 함수
    const handleSubmit = async () => {
        if (!user) {
            alert("로그인 후 이용해주세요!");
            return;
        }
        if (content.trim() === '') {
            alert("방명록 내용을 입력해주세요!");
            return;
        }

        try {
            await addGuestbook({ content, minimi, user });
            // 성공 후 입력창 초기화
            setContent('');
        } catch (error) {
            alert("게시 실패: " + error.message);
        }
    };

    return (
        <div className="guestbook-form-box">
            {/* 좌측 사진 미리보기 칸을 삭제하고, 입력 상자 영역만 남깁니다 */}
            <div className="input-section">
                <div className="user-inputs">
                    {/* 닉네임은 로그인한 유저 정보를 고정으로 보여줍니다 */}
                    <input 
                        type="text" 
                        value={user ? (user.displayName || user.email.split('@')[0]) : '로그인 필요'} 
                        disabled 
                        className="nick-input" 
                        style={{ background: '#eee', color: '#888' }}
                    />
                    <textarea 
                        placeholder={user ? "다녀간 흔적을 남겨주세요..." : "로그인 후 작성할 수 있습니다."}
                        className="content-input"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        disabled={!user || loading}
                    ></textarea>
                </div>
                
                <div className="action-buttons">
                    {/* 이모티콘 선택 드롭다운 */}
                    <select 
                        className="cy-btn" 
                        value={minimi} 
                        onChange={(e) => setMinimi(e.target.value)}
                        disabled={!user || loading}
                    >
                        {MINIMI_LIST.map((emo, idx) => (
                            <option key={idx} value={emo}>이모티콘: {emo}</option>
                        ))}
                    </select>

                    {/* 사진 첨부 버튼 (클릭 시 준비중 알림) */}
                    <button 
                        className="cy-btn" 
                        onClick={() => alert("아직 준비중입니다!")}
                        type="button"
                    >
                        사진 첨부
                    </button>
                    
                    <button 
                        className="cy-btn submit-btn" 
                        onClick={handleSubmit}
                        disabled={!user || loading}
                    >
                        {loading ? "작성 중..." : "확인"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GuestbookForm