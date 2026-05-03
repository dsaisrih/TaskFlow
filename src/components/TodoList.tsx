import { useEffect, useState } from 'react';
import { authState, subscribeTodos } from '../store';
import { TodoItem } from './TodoItem';

interface TodoData {
  id: string;
  title: string;
  completed: boolean;
  createdAt?: number;
}

export const TodoList = () => {
  const [todos, setTodos] = useState<TodoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authState.currentUser) return;
    
    try {
      const unsubscribe = subscribeTodos(authState.currentUser.uid, (data: any) => {
        if (data) {
          const todoList: TodoData[] = Object.entries(data).map(([key, value]: [string, any]) => ({
            id: key,
            ...value,
          }));
          // Sort by creation date (newest first)
          todoList.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
          setTodos(todoList);
        } else {
          setTodos([]);
        }
        setIsLoading(false);
        setError(null);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error('Error setting up listener:', error);
      setError('Failed to establish connection.');
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12 animate-fade-in">
        <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5 bg-pink-500/10 border border-pink-500/30 rounded-2xl text-pink-400 font-medium animate-fade-in text-center shadow-[0_0_15px_rgba(236,72,153,0.1)]">
        {error}
      </div>
    );
  }

  const completedCount = todos.filter((t) => t.completed).length;
  const pendingCount = todos.filter((t) => !t.completed).length;

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-8">
        <div className="relative group overflow-hidden rounded-2xl p-5 border border-indigo-500/20 bg-indigo-500/5 hover:bg-indigo-500/10 transition-colors duration-300">
          <div className="absolute top-[-20%] right-[-10%] w-20 h-20 bg-indigo-500/20 rounded-full blur-xl group-hover:bg-indigo-500/40 transition-colors duration-500"></div>
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-indigo-300 mb-1">Pending Tasks</p>
          <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-white">{pendingCount}</p>
        </div>
        <div className="relative group overflow-hidden rounded-2xl p-5 border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 transition-colors duration-300">
          <div className="absolute top-[-20%] right-[-10%] w-20 h-20 bg-cyan-500/20 rounded-full blur-xl group-hover:bg-cyan-500/40 transition-colors duration-500"></div>
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-cyan-300 mb-1">Completed Tasks</p>
          <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-white">{completedCount}</p>
        </div>
      </div>

      {todos.length === 0 ? (
        <div className="text-center py-16 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <span className="text-2xl">⚡</span>
          </div>
          <p className="text-gray-400 text-lg font-light tracking-wide">No tasks yet. Add one above.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              title={todo.title}
              completed={todo.completed}
              dueDate={todo.dueDate}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
