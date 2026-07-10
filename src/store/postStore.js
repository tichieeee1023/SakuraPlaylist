import { create } from 'zustand'
import {
    updatePostInFirestore,
    deletePostFromFirestore,
    addPostToFirestore, 
    fetchPostsFromFirestore 
} from '../services/firestorePosts'

const getPostErrorMessage = (error) => {
    if (error.code === 'permission-denied') {
        return '게시글 목록을 읽을 권한이 없습니다 Firebase rules error'
    }
    return error.message || '인증요청에 실패했습니다'
}

const usePostStore = create((set) => ({
    posts: [],
    loading: false,
    error: '',

    // 게시글 목록 최신순으로 가져옴
    fetchPosts: async () => {
        set({ loading: true, error: '' })
        try {
            const posts = await fetchPostsFromFirestore() 
            set({ posts, loading: false })
        } catch (error) {
            set({ error: getPostErrorMessage(error), loading: false })
        }
    },

    // 새 게시글 추가
    addPost: async (newPost) => {
        set({ loading: true, error: '' })

        try {
            // 💡 서버에서 생성된 새 문서의 ID를 받아옵니다.
            const newId = await addPostToFirestore(newPost) 
            
            // 💡 입력했던 데이터(newPost)에 서버 ID(newId)를 합쳐 완전한 객체를 만듭니다.
            const completedPost = { ...newPost, id: newId }
            
            set((state) => ({
                posts: [completedPost, ...state.posts],
                loading: false,
            }))
        } catch (error) {
            set({ error: getPostErrorMessage(error), loading: false })
            throw error
        }
    },

    // 게시글 삭제 
    deletePost: async (id) => {
        set({ loading : true, error:''})
        try{
            await deletePostFromFirestore(id)
            set( (state) => ({
                posts: state.posts.filter((item) => item.id !== id),
                loading: false
            }))
        }catch(error){
            set({ error: getPostErrorMessage(error), loading: false})
            throw error
        }
    },

    // 게시글 수정
    updatePost: async (updatedPost) => { 
        set({ loading : true, error:''})

        try{
            await updatePostInFirestore(updatedPost)
            
            set((state) => ({
                posts: state.posts.map((item) => item.id === updatedPost.id ? updatedPost : item),
                loading: false
            }))
        }catch(error){
            set({ error: getPostErrorMessage(error), loading: false})
            throw error
        }
    }
}))

export default usePostStore