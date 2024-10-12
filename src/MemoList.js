// src/MemoList.js
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import EditMemo from './EditMemo';

const MemoList = () => {
  const [memos, setMemos] = useState([]);
  const [editingMemo, setEditingMemo] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'memos'), orderBy('updatedAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const memosData = [];
      querySnapshot.forEach((doc) => {
        memosData.push({ id: doc.id, ...doc.data() });
      });
      setMemos(memosData);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm('本当にこのメモを削除しますか？');
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, 'memos', id));
      alert('メモが削除されました');
    } catch (error) {
      console.error('メモの削除中にエラーが発生しました:', error);
    }
  };

  return (
    <div>
      <h2>メモ一覧</h2>
      <ul>
        {memos.map((memo) => (
          <li key={memo.id}>
            <h3>{memo.title}</h3>
            <p>{memo.content}</p>
            <small>更新日: {memo.updatedAt.toDate().toLocaleString()}</small>
            <br />
            <button onClick={() => setEditingMemo(memo)}>編集</button>
            <button onClick={() => handleDelete(memo.id)}>削除</button>
          </li>
        ))}
      </ul>

      {editingMemo && (
        <EditMemo
          memo={editingMemo}
          onClose={() => setEditingMemo(null)}
        />
      )}
    </div>
  );
};

export default MemoList;
