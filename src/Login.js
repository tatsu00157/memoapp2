// src/Login.js
import React from 'react';
import { auth } from './firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const Login = () => {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert('ログイン成功');
    } catch (error) {
      console.error('ログイン中にエラーが発生しました:', error);
    }
  };

  return (
    <div>
      <h2>ログイン</h2>
      <button onClick={handleLogin}>Googleでログイン</button>
    </div>
  );
};

export default Login;
