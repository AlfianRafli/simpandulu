'use client';

import { useState } from 'react';
import { loginAdmin } from '../actions';

export default function LoginPage() {
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await loginAdmin(formData);
    if (res?.error) setError(res.error);
    else window.location.href = '/admin';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 antialiased p-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-black text-2xl shrink-0 mb-4 shadow-inner">SD</div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Login Admin</h1>
            <p className='text-gray-500'>Selamat datang kembali!</p>
        </div>
        
        {error && <p className="bg-red-50 border border-red-100 text-red-600 text-sm p-3 rounded-lg mb-6 text-center font-medium">{error}</p>}
        
        <form onSubmit={handleSubmit} className='space-y-5'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1.5'>Password Rahasia</label>
            <input 
              type="password" 
              name="password" 
              placeholder="Masukkan Password Rahasia" 
              className="w-full border border-gray-300 px-4 py-3 rounded-xl text-black placeholder:text-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition bg-white"
              required
            />
          </div>
          <button type="submit" className="w-full bg-black text-white p-3 rounded-lg font-extrabold text-lg hover:bg-gray-800 transition shadow-md">
            Masuk Sekarang →
          </button>
        </form>
      </div>
    </div>
  );
}

