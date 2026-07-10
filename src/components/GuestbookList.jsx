import React, { useEffect } from 'react'
import useGuestbookStore from '../store/guestbookStore'
import useAuthStore from '../store/authStore'

const GuestbookList = () => {
    const guestbooks = useGuestbookStore((state) => state.guestbooks);
    const listenGuestbooks = useGuestbookStore((state) => state.listenGuestbooks);
    const deleteGuestbook = useGuestbookStore((state) => state.deleteGuestbook);
    
    const user = useAuthStore((state) => state.user);

    // 컴포넌트 마운트 시 파이어베이스 실시간 연동 시작
    useEffect(() => {
        const unsubscribe = listenGuestbooks();
        return () => unsubscribe(); // 언마운트 시 연동 해제
    }, [listenGuestbooks]);

    if (guestbooks.length === 0) {
        return <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>첫 방명록을 남겨보세요!</div>
    }

    return (
        <div className="guestbook-list-wrapper">
            {guestbooks.map((item, index) => {
                // 역순 번호 계산 (총 갯수 - 현재 인덱스)
                const postNumber = guestbooks.length - index;

                return (
                    <div className="guestbook-card" key={item.id}>
                        {/* 카드 상단 정보 바 */}
                        <div className="card-header">
                            <span className="post-number">No. {postNumber}</span>
                            <span className="post-author">{item.writer}</span>
                            <span className="post-date" style={{ marginRight: 'auto' }}>({item.date})</span>
                            
                            {/* 본인이 쓴 글만 삭제 버튼 노출 */}
                            {user && user.uid === item.uid && (
                                <button 
                                    onClick={() => deleteGuestbook(item.id)}
                                    style={{ background:'none', border:'none', color:'#b59fa2', cursor:'pointer', fontSize:'12px', textDecoration:'underline' }}
                                >
                                    삭제
                                </button>
                            )}
                        </div>
                        
                        {/* 카드 본문 (미니미 + 내용) */}
                        <div className="card-body">
                            <div className="minimi-section">
                                <div className="minimi-placeholder" style={{ fontSize: '40px' }}>
                                    {item.minimi}
                                </div>
                            </div>
                            <div className="content-section">
                                <p className="post-text" style={{ whiteSpace: 'pre-wrap', margin: 0 }}>
                                    {item.content}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default GuestbookList