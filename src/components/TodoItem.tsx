import { useState } from 'react';
import { authState, updateTodo, deleteTodo } from '../store';
import { Trash2, CheckCircle2, Circle, Calendar } from 'lucide-react';

interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

export const TodoItem = ({ id, title, completed, dueDate }: TodoItemProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleComplete = async () => {
    if (!authState.currentUser) return;
    setIsUpdating(true);
    try {
      updateTodo(authState.currentUser.uid, id, {
        completed: !completed,
        updatedAt: Date.now(),
      });
    } catch (error) {
      console.error('Error updating todo:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!authState.currentUser) return;
    setIsDeleting(true);
    try {
      deleteTodo(authState.currentUser.uid, id);
    } catch (error) {
      console.error('Error deleting todo:', error);
      setIsDeleting(false);
    }
  };

  if (isDeleting) return null;

  const isOverdue = dueDate && new Date(dueDate) < new Date(new Date().setHours(0, 0, 0, 0)) && !completed;

  return (
    <li className={`flex items-start sm:items-center gap-3 sm:gap-4 p-4 md:p-5 glass-panel rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${completed ? 'opacity-60 grayscale-[50%]' : ''} animate-scale-in`}>
      <button
        onClick={toggleComplete}
        disabled={isUpdating}
        className="flex-shrink-0 mt-1 sm:mt-0 text-indigo-400/50 hover:text-cyan-400 transition-colors disabled:opacity-50 relative"
      >
        <div className={`absolute inset-0 bg-cyan-400 rounded-full blur-md transition-opacity duration-300 ${completed ? 'opacity-100' : 'opacity-0'}`}></div>
        {completed ? (
          <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400 relative z-10" />
        ) : (
          <Circle className="w-6 h-6 sm:w-7 sm:h-7 relative z-10" />
        )}
      </button>

      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <span
          className={`text-base sm:text-lg tracking-wide break-words transition-all duration-300 ${
            completed
              ? 'line-through text-gray-500'
              : 'text-gray-100 font-medium'
          }`}
        >
          {title}
        </span>
        
        {dueDate && (
          <div className={`flex items-center mt-1 text-xs sm:text-sm font-mono ${isOverdue ? 'text-red-400' : 'text-gray-400'}`}>
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
            <span>{new Date(dueDate).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</span>
            {isOverdue && <span className="ml-2 px-1.5 py-0.5 rounded-full bg-red-500/20 text-[10px] uppercase tracking-wider">Overdue</span>}
          </div>
        )}
      </div>

      <button
        onClick={handleDelete}
        className="flex-shrink-0 text-gray-500 hover:text-pink-500 transition-colors hover:scale-110 transform duration-300 p-2 sm:p-2.5 hover:bg-pink-500/10 rounded-lg self-center"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </li>
  );
};
