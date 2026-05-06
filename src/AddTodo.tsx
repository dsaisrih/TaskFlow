import { useState } from 'react';
import { Plus } from 'lucide-react';

interface Props {
  onAdd: (title: string) => void;
}

export default function AddTodo({ onAdd }: Props) {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setValue('');
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder="Add a new task..."
        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-purple-500/60 focus:bg-white/8 transition-all"
      />
      <button
        onClick={handleSubmit}
        className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-3 rounded-xl transition-colors flex items-center gap-1.5 text-sm font-medium"
      >
        <Plus size={16} />
        Add
      </button>
    </div>
  );
}
