import React, { useState } from 'react'
import useAuthStore from '../store/authStore'
import useGuestbookStore from '../store/guestbookStore'

// ✨ 테마에 맞춰 더욱 다채로워진 미니미 리스트!
const MINIMI_LIST = [
    '😀', '😎', '😍', '😭', '❤️', '👋', '🌸', '🍀', '💗', 
    '✨', '🥰', '🥳', '🎶', '🎵', '🎧', '🎸', '🎹', '🎀', 
    '🎈', '🧸', '🍭', '🧁', '🦄', '💌'
];

const GuestbookForm = () => {
    const user = useAuthStore((state) => state.user);
    const addGuestbook = useGuestbookStore((state) => state.addGuestbook);
    const loading = useGuestbookStore((state) => state.loading);

    const [content, setContent] = useState('');
    const [minimi, setMinimi] = useState(MINIMI_LIST[0]); // 기본 이모티콘
    const [isModalOpen, setIsModalOpen] = useState(false); // 💡 모달 제어 상태

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
                    {/* 💡 누르면 모달을 열어주는 버튼 */}
                    <button 
                        type="button" 
                        className="cy-btn minimi-select-btn"
                        onClick={() => {
                            console.log("모달 열기 버튼 클릭됨!"); // 디버깅용 로그
                            setIsModalOpen(true);
                        }}
                        disabled={!user || loading}
                    >
                        <span>아이템 선택 {minimi}</span>
                    </button>

                    {/* 사진 첨부 버튼 */}
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

            {/* ==========================================================================
               🛍️ 싸이월드 미니미 선물가게 모달 (인라인 스타일 완벽 무장 버전)
               ========================================================================== */}
            {isModalOpen && (
                <div 
                    className="minimi-modal-overlay" 
                    onClick={() => setIsModalOpen(false)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 99999, // 어떤 요소보다 위에 뜨도록 설정
                        backdropFilter: 'blur(3px)'
                    }}
                >
                    {/* 모달 내부 클릭 시 닫히는 현상 방지 */}
                    <div 
                        className="minimi-modal-content" 
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            width: '90%',
                            maxWidth: '440px',
                            backgroundColor: '#ffffff',
                            border: '3px solid #ff9a9e', 
                            borderRadius: '12px',
                            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <div 
                            className="modal-header"
                            style={{
                                background: 'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
                                padding: '12px 18px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                color: '#ffffff'
                            }}
                        >
                            <span style={{ fontSize: '15px', fontWeight: 'bold', letterSpacing: '1px' }}>
                                💗 내 마음 선물가게
                            </span>
                            <button 
                                className="modal-close-x" 
                                onClick={() => setIsModalOpen(false)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#ffffff',
                                    fontSize: '24px',
                                    cursor: 'pointer',
                                    lineHeight: 1
                                }}
                            >
                                ×
                            </button>
                        </div>
                        
                        <div className="modal-body" style={{ padding: '20px', backgroundColor: '#fdfdfd' }}>
                            <p style={{ fontSize: '13px', color: '#201e1e', marginTop: 0, marginBottom: '15px', textAlign: 'center', borderBottom: '1px dashed #eee', paddingBottom: '10px' }}>
                                방명록에 장식할 마음에 드는 아이템을 골라보세요!
                            </p>
                            
                            <div 
                                className="minimi-grid"
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(4, 1fr)',
                                    gap: '10px',
                                    maxHeight: '260px',
                                    overflowY: 'auto',
                                    padding: '5px'
                                }}
                            >
                                {MINIMI_LIST.map((emo, idx) => (
                                    <button 
                                        key={idx}
                                        type="button"
                                        className={`minimi-item-btn ${minimi === emo ? 'selected' : ''}`}
                                        onClick={() => {
                                            setMinimi(emo);
                                            setIsModalOpen(false); // 선택 완료 후 모달 닫기
                                        }}
                                        style={{
                                            backgroundColor: minimi === emo ? '#fff3e6' : '#ffffff',
                                            border: minimi === emo ? '2px solid #ff7e00' : '1px solid #e2d5d7',
                                            borderRadius: '8px',
                                            padding: '10px 5px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '6px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <span style={{ fontSize: '28px' }}>{emo}</span>
                                        <span style={{ fontSize: '10px', color: minimi === emo ? '#ff7e00' : '#999', fontWeight: minimi === emo ? 'bold' : 'normal' }}>
                                            아이템-{idx + 1}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default GuestbookForm