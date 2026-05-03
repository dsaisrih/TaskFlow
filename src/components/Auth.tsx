import React, { useState } from 'react';
import { signIn, register, signOut } from '../store';
import { LogIn, UserPlus, LogOut } from 'lucide-react';

export function Auth({ user }: { user: any }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isLogin) {
        await signIn(name, password);
      } else {
        await register(name, password);
      }
      setName('');
      setPassword('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (user) {
    return (
      <div className="glass-panel flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 rounded-2xl mb-8 animate-fade-in border border-indigo-500/20 gap-4 sm:gap-0">
        <div className="flex flex-col overflow-hidden w-full sm:w-auto">
          <span className="text-xs text-gray-400 uppercase tracking-wider mb-1">Logged In As</span>
          <span className="text-white font-medium text-base sm:text-lg font-mono truncate w-full">{user.username}</span>
        </div>
        <button
          onClick={() => signOut()}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-pink-400 bg-pink-500/10 hover:bg-pink-500/20 hover:text-pink-300 rounded-xl transition-all duration-300 border border-pink-500/20 shadow-[0_0_15px_rgba(236,72,153,0.1)] hover:shadow-[0_0_25px_rgba(236,72,153,0.2)] shrink-0"
        >
          <LogOut size={18} />
          <span className="font-medium text-sm tracking-wide">Sign Out</span>
        </button>
      </div>
    );
  }

  return (
    <div className="glass-panel p-8 rounded-3xl mb-8 animate-slide-up" style={{animationDelay: '0.15s'}}>
      <h2 className="text-2xl font-bold mb-6 text-white tracking-tight flex items-center gap-3">
        {isLogin ? <LogIn className="text-indigo-400" size={28} /> : <UserPlus className="text-indigo-400" size={28} />}
        {isLogin ? 'Sign In' : 'Create Account'}
      </h2>
      
      {error && (
        <div className="mb-6 p-4 bg-pink-500/10 border border-pink-500/30 text-pink-400 rounded-xl text-sm font-medium animate-fade-in shadow-[0_0_15px_rgba(236,72,153,0.1)]">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-gray-400 mb-2">Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="glass-input w-full"
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-gray-400 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="glass-input w-full"
            placeholder="••••••••"
            required
          />
        </div>
        
        <button
          type="submit"
          className="btn-primary w-full mt-4 flex justify-center items-center gap-2"
        >
          {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
          <span className="tracking-wide">{isLogin ? 'Sign In' : 'Register'}</span>
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors tracking-wide"
        >
          {isLogin ? "Don't have an account? Register" : 'Already have an account? Sign In'}
        </button>
      </div>
    </div>
  );
}
