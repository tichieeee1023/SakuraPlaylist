import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import usePostStore from '../store/postStore'
import useAuthStore from '../store/authStore'

const Detail = () => {
    const { id } = useParams()
    const posts = usePostStore((state) => state.posts)
    const updatePost = usePostStore((state) => state.updatePost)
    
    // ✨ [추가] 현재 로그인한 유저의 정보를 스토어에서 쏙 꺼내옵니다.
    const user = useAuthStore((state) => state.user)

    // 1. 현재 주소창 ID와 일치하는 게시글 찾기
    const post = posts.find((item) => item.id === id)

    // 목록이랑 번호를 똑같이 맞추기 위해 몇 번째 글인지 인덱스 순서(+1)를 구합니다.
    const postIndex = posts.findIndex((item) => item.id === id) + 1

    // 수정모드 상태 관리
    const [isEdit, setIsEdit] = useState(false)
    const [title, setTitle] = useState(post ? post.title : '')
    const [writer, setWriter] = useState(post ? post.writer : '')
    const [content, setContent] = useState(post ? post.content : '')

    // 예외 처리 (글을 못 찾았을 때 화면 깨짐 방지)
    if (!post) {
        return <div style={{ padding: '40px', color: '#fff', textAlign: 'center' }}>🌸 게시글을 불러오는 중입니다...</div>
    }

    // 수정 완료 후 저장하는 함수
    const updatefunc = async () => {
        if (title.trim() === '' || content.trim() === '') {
            alert("내용을 모두 입력해주세요.")
            return
        }

        try {
            await updatePost({
                id: post.id,
                title: title,
                writer: writer,
                content: content,
                uid: post.uid 
            })
            setIsEdit(false)
        } catch (err) {
            alert("수정 실패: " + err.message)
        }
    }

    return (
        <div className="board-container detail-container">
            <h2>게시글 상세보기</h2>
            {
                isEdit ? (
                    /* 1. 수정 모드 화면 */
                    <div className="modern-form detail-edit">
                        <div className="input-group">
                            <div className="info-row" style={{ marginBottom: '15px' }}>
                                <span className="label">글 번호</span>
                                <span className="value font-num">{postIndex}</span> 
                            </div>
                            <label>제목 수정</label>
                            <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>

                        <div className="input-group">
                            <label>작성자 수정</label>
                            <input type='text' value={writer} readOnly />
                        </div>

                        <div className="input-group">
                            <label>내용 수정</label>
                            <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                        </div>

                        <div className="btn-group">
                            <button onClick={updatefunc}>저장</button>
                            <button className="cancel-btn" onClick={() => {
                                setTitle(post.title)
                                setWriter(post.writer)
                                setContent(post.content)
                                setIsEdit(false)
                            }}>취소</button>
                        </div>
                    </div>
                ) : (
                    /* 2. 일반 보기 모드 화면 */
                    <div className="detail-view">
                        <div className="info-header">
                            <div className="info-row">
                                <span className="label">글 번호</span>
                                <span className="value font-num">{postIndex}</span>
                            </div>
                            <div className="info-row">
                                <span className="label">작성자</span>
                                <span className="value">{post.writer}</span>
                            </div>
                        </div>

                        <div className="detail-title">
                            <h3>{post.title}</h3>
                        </div>

                        <div className="content-box">
                            {post.content}
                        </div>

                        <div className="btn-group">
                            {/* 🌸 [핵심 보안 포인트!] 
                                로그인된 유저가 존재하고(&&), 그 유저의 uid와 게시글을 작성한 uid가 완벽히 일치할 때만!
                                [수정하기] 버튼이 화면에 뾰로롱 나타납니다. 비로그인이나 타인은 버튼 구경도 못 해요! */}
                            {user && post.uid === user.uid && (
                                <button onClick={() => setIsEdit(true)}>수정하기</button>
                            )}
                            <Link to='/' className="back-btn">목록으로</Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Detail