import { useState, useEffect } from 'react'
import { onAuthStateChanged } from './store'
import { Logo } from './components/Logo'
import { AddTodo } from './components/AddTodo'
import { TodoList } from './components/TodoList'
import { Auth } from './components/Auth'
import './App.css'

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((currentUser: any) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-12 relative overflow-hidden">
      {/* Premium ambient light spots */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/20 blur-[120px] pointer-events-none"></div>

      <div className="max-w-3xl mx-auto relative z-10 animate-fade-in">
        {/* Header */}
        <div className="mb-10 sm:mb-14 flex flex-col items-center animate-slide-up">
          <Logo />
          <p className="text-center text-gray-400 mt-4 text-sm sm:text-base font-light tracking-wide max-w-md">
            Real-time task synchronization powered by Firebase Engine
          </p>
        </div>

        <Auth user={user} />

        {/* Main Content */}
        {user ? (
          <div className="glass-panel rounded-3xl p-6 sm:p-10 animate-slide-up" style={{animationDelay: '0.1s'}}>
            <AddTodo />
            <div className="mt-8">
              <TodoList />
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-12 text-sm uppercase tracking-[0.2em] animate-slide-up" style={{animationDelay: '0.2s'}}>
            Please Log In To Manage Tasks
          </div>
        )}
      </div>
    </div>
  )
}

export default App
