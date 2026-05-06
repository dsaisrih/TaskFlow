import { Trash2, CheckCircle2, Circle } from 'lucide-react';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
}

interface Props {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <div className="flex items-center gap-3 bg-white/5 border border-white/8 rounded-xl px-4 py-3 group hover:bg-white/8 transition-all">
      <button
        onClick={() => onToggle(todo.id, !todo.completed)}
        className="text-white/40 hover:text-purple-400 transition-colors flex-shrink-0"
      >
        {todo.completed
          ? <CheckCircle2 size={20} className="text-purple-400" />
          : <Circle size={20} />}
      </button>
      <span className={`flex-1 text-sm ${todo.completed ? 'line-through text-white/30' : 'text-white/80'}`}>
        {todo.title}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-white/20 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
