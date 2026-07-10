import React from 'react'
import GuestbookForm from '../components/GuestbookForm'
import GuestbookList from '../components/GuestbookList'

const Guestbook = () => {
    return (
        <div className="cyworld-guestbook-container">
            {/* 상단 폼 영역 (이미지 미리보기 + 입력창 + 버튼들) */}
            <GuestbookForm />
            
            {/* 하단 리스트 영역 (방명록 카드들이 세로로 나열되는 곳) */}
            <GuestbookList />
        </div>
    )
}

export default Guestbook