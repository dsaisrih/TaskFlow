import { useState } from 'react';
import { authState, addTodo } from '../store';
import { Plus, Calendar } from 'lucide-react';

export const AddTodo = () => {
  const [input, setInput] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || !authState.currentUser) {
      return;
    }

    setIsLoading(true);
    try {
      addTodo(authState.currentUser.uid, input.trim(), dueDate);
      setInput('');
      setDueDate('');
    } catch (error) {
      console.error('Error adding todo:', error);
      alert('Failed to add task.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleAddTodo} className="flex flex-col gap-3 mb-8">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 group">
          <div className="absolute inset-0 bg-indigo-500/20 rounded-xl blur-md group-hover:bg-indigo-500/30 transition-colors duration-300"></div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            disabled={isLoading}
            className="glass-input relative w-full h-12 text-base sm:text-lg font-mono tracking-tight"
          />
        </div>
        
        <div className="relative group sm:w-48 shrink-0">
          <div className="absolute inset-0 bg-purple-500/20 rounded-xl blur-md group-hover:bg-purple-500/30 transition-colors duration-300"></div>
          <div className="relative flex items-center h-12 glass-input px-3">
            <Calendar className="w-5 h-5 text-purple-400 mr-2 shrink-0" />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              disabled={isLoading}
              className="bg-transparent border-none text-gray-200 outline-none w-full text-sm font-mono focus:ring-0 p-0"
            />
          </div>
        </div>
      </div>
      
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="btn-primary w-full h-12 flex items-center justify-center gap-2 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed px-8 mt-1 sm:mt-0"
      >
        <Plus className="w-5 h-5" />
        <span className="font-semibold tracking-wider uppercase text-sm">Add Task</span>
      </button>
    </form>
  );
};
