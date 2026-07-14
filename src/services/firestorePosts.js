import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
} from 'firebase/firestore' 
import { db } from '../firebase.js'

// 컬렉션 지정
const postsRef = collection(db, 'posts')

// firestore가 가진 데이터를 react가 쓰기 쉬운 객체 형태로 변환
const mapDocumentToPost = (document) => {
    const data = document.data()
    return {
        id : document.id,
        title : data.title || '',
        writer : data.writer || '',       
        content : data.content || '',
        uid : data.uid || '',
        createdAt : data.createdAt?.toDate?.().toISOString?.() || '',
        updatedAt : data.updatedAt?.toDate?.().toISOString?.() || '', 
    }
}

// 게시글 목록 최신순으로 가져옴
export const fetchPostsFromFirestore = async () =>{ 
    const postsQuery = query(postsRef, orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(postsQuery) 

    return snapshot.docs.map(mapDocumentToPost)
}

// 새 게시글 추가
export const addPostToFirestore = async (post) => { 
    const docRef = await addDoc(postsRef, {
        ...post,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    })
    return docRef.id
}

// 게시글 삭제
export const deletePostFromFirestore = async (id) => {
    const postDocRef = doc(db, 'posts', id)
    await deleteDoc(postDocRef)
}

// 게시글 수정
export const updatePostInFirestore = async (updatedPost) => {
    const postDocRef = doc(db, 'posts', updatedPost.id)
    await updateDoc(postDocRef, {
        title: updatedPost.title,
        content: updatedPost.content,
        updatedAt: serverTimestamp()
    })
}