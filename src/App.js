// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import CreateMemo from './CreateMemo';
import MemoList from './MemoList';
import Login from './Login';
import EditMemo from './EditMemo';

const App = () => {
  const [user, setUser] = useState(null);
  const [editingMemo, setEditingMemo] = useState(null); // 編集中のメモ

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('ログアウトしました');
    } catch (error) {
      console.error('ログアウト中にエラーが発生しました:', error);
    }
  };

  const handleEdit = (memo) => {
    setEditingMemo(memo); // 編集するメモを設定
  };

  const handleCloseEdit = () => {
    setEditingMemo(null); // 編集終了時にリセット
  };

  return (
    <div className="container">
      <h1>メモ帳アプリ</h1>
      {user ? (
        <>
          <p>ログイン中: {user.displayName}</p>
          <button onClick={handleLogout}>ログアウト</button>

          <CreateMemo />

          {/* 編集フォームを表示（メモ追加とメモ一覧の間に配置） */}
          {editingMemo && (
            <EditMemo memo={editingMemo} onClose={handleCloseEdit} />
          )}

          <MemoList onEdit={handleEdit} />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
