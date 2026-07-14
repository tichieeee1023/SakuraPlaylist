import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import usePostStore from '../store/postStore'
import useAuthStore from '../store/authStore'

const PostList = () => { 
  const user = useAuthStore((state) => state.user)
  const posts = usePostStore((state) => state.posts)
  const deletePost = usePostStore((state) => state.deletePost)
  const fetchPosts = usePostStore((state) => state.fetchPosts)
  const loading = usePostStore((state) => state.loading)
  const error = usePostStore((state) => state.error)

  // 페이지가 열리면 파이어베이스 서버에서 글 목록을 자동으로 가져옵니다.
  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  return (
    <section className="board-container">
      <h3>게시판 목록</h3>

      {/* 로딩 및 에러 핸들링 피드백 */}
      {loading && <div style={{ textAlign: 'center', padding: '10px', color: '#ff99ad' }}>🌸 글 목록을 불러오는 중입니다...</div>}
      {error && <div style={{ color: 'red', padding: '10px' }}>{error}</div>}

      {!loading && posts.length === 0 ? (
        <h3>등록된 게시글이 없습니다</h3>
      ) : (
          <table className="modern-table">
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>비고</th>
              </tr>
            </thead>
            <tbody>
              {
                posts.map((item, index) => {
                  // 현재 로그인한 유저와 게시글 작성자의 uid 비교
                  const isOwner = user?.uid === item.uid

                  return (
                    <tr key={item.id}>
                      {/* 번호 깔끔하게 정돈 */}
                      <td>{index + 1}</td>
                      
                      {/* 🌸 [여기 수정!] 제목에 사라졌던 Link 태그를 백틱 구조로 다시 심어줍니다! */}
                      <td>
                        <Link to={`/detail/${item.id}`}>{item.title}</Link>
                      </td>
                      
                      <td>{item.writer}</td>
                      <td>
                        {/* 내가 쓴 글일 때만 수정/삭제 버튼 노출 */}
                        {isOwner ? (
                          <>
                            <Link to={`/detail/${item.id}`} style={{ marginRight: '8px' }}>수정</Link>
                            <button onClick={() => { deletePost(item.id) }}>삭제</button>
                          </>
                        ) : (
                          <span style={{ color: '#b59fa2', fontSize: '13px' }}>보기만 가능</span>
                        )}
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        )
      }
    </section>
  )
}

export default PostList