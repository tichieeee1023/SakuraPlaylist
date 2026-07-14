import { create } from 'zustand'
import { db } from '../firebase' // 파이어베이스 설정 파일 경로 (스토리지 제외)
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, deleteDoc, doc } from 'firebase/firestore'

const useGuestbookStore = create((set) => ({
    guestbooks: [],
    loading: false,

    // 1. 방명록 실시간 불러오기
    listenGuestbooks: () => {
        const q = query(collection(db, 'guestbooks'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                // 타임스탬프를 보기 좋은 날짜 문자열로 변환 (작성 직후 딜레이 에러 방지)
                date: doc.data().createdAt ? doc.data().createdAt.toDate().toLocaleDateString() : '방금 전'
            }));
            set({ guestbooks: data });
        });
        return unsubscribe; // 컴포넌트 언마운트 시 구독 해제용
    },

    // 2. 방명록 새 글 작성 (이미지 제외하고 텍스트만)
    addGuestbook: async ({ content, minimi, user }) => {
        set({ loading: true });
        try {
            // 파이어스토어에 데이터베이스 문서 생성
            await addDoc(collection(db, 'guestbooks'), {
                content,
                minimi,
                writer: user.displayName || user.email.split('@')[0], // 닉네임 없으면 이메일 앞자리
                uid: user.uid,
                createdAt: serverTimestamp()
            });
        } catch (error) {
            console.error("방명록 작성 에러:", error);
            throw error;
        } finally {
            set({ loading: false });
        }
    },

    // 3. 방명록 삭제 (작성자 본인만 가능하도록 UI에서 처리)
    deleteGuestbook: async (id) => {
        if(window.confirm('정말 이 방명록을 삭제하시겠습니까?')) {
            await deleteDoc(doc(db, 'guestbooks', id));
        }
    }
}))

export default useGuestbookStore;