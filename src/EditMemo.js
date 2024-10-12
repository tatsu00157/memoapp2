// src/EditMemo.js
import React, { useState } from 'react';
import { db } from './firebase';
import { doc, updateDoc, Timestamp } from 'firebase/firestore';

const EditMemo = ({ memo, onClose }) => {
  const [title, setTitle] = useState(memo.title);
  const [content, setContent] = useState(memo.content);

  const handleUpdate = async () => {
    if (title.trim() === '' || content.trim() === '') {
      alert('タイトルと内容を入力してください');
      return;
    }

    try {
      const memoRef = doc(db, 'memos', memo.id);
      await updateDoc(memoRef, {
        title: title,
        content: content,
        updatedAt: Timestamp.now(),
      });
      alert('メモが更新されました');
      onClose();
    } catch (error) {
      console.error('メモの更新中にエラーが発生しました:', error);
    }
  };

  return (
    <div>
      <h3>メモを編集</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <br />
      <button onClick={handleUpdate}>更新</button>
      <button onClick={onClose}>キャンセル</button>
    </div>
  );
};

export default EditMemo;
