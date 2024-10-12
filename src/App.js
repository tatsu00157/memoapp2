// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';  // ここでCSSファイルをインポート
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import CreateMemo from './CreateMemo';
import MemoList from './MemoList';
import Login from './Login';

const App = () => {
  const [user, setUser] = useState(null);

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

  return (
    <div>
      <h1>メモ帳アプリ</h1>
      {user ? (
        <>
          <p>ログイン中: {user.displayName}</p>
          <button onClick={handleLogout}>ログアウト</button>
          <CreateMemo />
          <MemoList />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
