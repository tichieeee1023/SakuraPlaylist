import React, { useState } from 'react'
import usePostStore from '../store/postStore'
import useAuthStore from '../store/authStore'

const PostForm = (props) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    // 💡 Auth 스토어에서 로그인한 유저 정보 가져오기
    const user = useAuthStore((state) => state.user)
    
    // 💡 Post 스토어에서 글쓰기 함수와 '로딩 상태' 함께 가져오기
    const addPost = usePostStore((state) => state.addPost)
    const loading = usePostStore((state) => state.loading) 

    // 입력값을 확인 후 새 게시글 데이터를 전송한다. (등록)
    const submitB = async () => {
        if(!user){
            alert('로그인후 글을 작성할 수 있습니다')
            return
        }
        if(title.trim() === '' || content.trim() === ''){
            alert('모든 내용을 다 입력하셔야 합니다')
            return
        }

       try {
            const newPost = {
                title : title,
                writer : user.displayName || '이름없음', 
                content : content,
                uid: user.uid 
            }

            // 게시글 추가 (비동기 처리)
            await addPost(newPost)

            // 등록 성공 후 입력칸 깔끔하게 비워주기
            setTitle('')
            setContent('')
        } catch(error) {
            alert(error.message || '글 등록에 실패했습니다.')
        }
    }

    return (
        <div className="modern-form">
            <h3>글쓰기</h3>
            
            <input type='text' placeholder='제목입력' value={title}
                onChange={(e)=>{
                    setTitle(e.target.value)
                }}
            />

            <input type='text' value={user?.displayName ? `${user.displayName} 님` : '로그인이 필요합니다'} readOnly />

            <textarea type='text' placeholder='글내용입력' value={content}
                onChange={(e)=>{
                   setContent(e.target.value)
                }}
            />

            <button onClick={submitB} disabled={loading}>
                { loading ? '등록중...' : '등록' }
            </button>
        </div>
    )
}

export default PostForm