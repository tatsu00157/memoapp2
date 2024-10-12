// MemoList.js
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

const MemoList = ({ onEdit }) => {
  const [memos, setMemos] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // 検索用のステート

  useEffect(() => {
    // メモを取得
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

  // メモをフィルタリングする
  const filteredMemos = memos.filter((memo) =>
    memo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    memo.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // メモを削除する関数
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
    <div className="memo-list">
      <h2>メモ一覧</h2>
      <input
        type="text"
        placeholder="検索..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // 検索語句を設定
      />
      <ul>
        {filteredMemos.map((memo) => (
          <li key={memo.id} className="memo-item">
            <h3>{memo.title}</h3>
            {/* CSSのwhite-spaceプロパティで改行を保持 */}
            <p style={{ whiteSpace: 'pre-wrap' }}>{memo.content}</p>
            <small>更新日: {memo.updatedAt.toDate().toLocaleString()}</small>
            <br />
            <button onClick={() => onEdit(memo)}>編集</button> {/* 編集ボタン */}
            <button onClick={() => handleDelete(memo.id)}>削除</button> {/* 削除ボタン */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemoList;
