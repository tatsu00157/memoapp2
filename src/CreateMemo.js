// src/CreateMemo.js
import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const CreateMemo = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAddMemo = async () => {
    if (title.trim() === '' || content.trim() === '') {
      alert('タイトルと内容を入力してください');
      return;
    }

    try {
      await addDoc(collection(db, 'memos'), {
        title: title,
        content: content,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      setTitle('');
      setContent('');
      alert('メモが追加されました');
    } catch (error) {
      console.error('メモの追加中にエラーが発生しました:', error);
    }
  };

  return (
    <div>
      <h2>メモを作成</h2>
      <input
        type="text"
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <textarea
        placeholder="メモ内容"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <br />
      <button onClick={handleAddMemo}>メモを追加</button>
    </div>
  );
};

export default CreateMemo;
