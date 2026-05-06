import { useEffect, useState } from 'react';
import { ref, onValue, push, update, remove, serverTimestamp } from 'firebase/database';
import { db } from '../firebase';
import TodoItem, { type Todo } from './TodoItem';
import AddTodo from './AddTodo';
import { Loader2 } from 'lucide-react';

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const todosRef = ref(db, 'todos');
    const unsubscribe = onValue(
      todosRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const list: Todo[] = Object.entries(data).map(([id, val]) => ({
            id,
            ...(val as Omit<Todo, 'id'>),
          }));
          list.sort((a, b) => b.createdAt - a.createdAt);
          setTodos(list);
        } else {
          setTodos([]);
        }
        setLoading(false);
      },
      (err) => {
        setError('Failed to load tasks. Check your Firebase config.');
        console.error(err);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleAdd = async (title: string) => {
    const todosRef = ref(db, 'todos');
    await push(todosRef, {
      title,
      completed: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  };

  const handleToggle = async (id: string, completed: boolean) => {
    const todoRef = ref(db, `todos/${id}`);
    await update(todoRef, { completed, updatedAt: serverTimestamp() });
  };

  const handleDelete = async (id: string) => {
    const todoRef = ref(db, `todos/${id}`);
    await remove(todoRef);
  };

  const pending = todos.filter((t) => !t.completed).length;
  const completed = todos.filter((t) => t.completed).length;

  return (
    <div className="space-y-4">
      <AddTodo onAdd={handleAdd} />

      {/* Stats */}
      <div className="flex gap-3">
        <div className="flex-1 bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-center">
          <div className="text-2xl font-bold text-white">{pending}</div>
          <div className="text-xs text-white/40 mt-0.5">Pending</div>
        </div>
        <div className="flex-1 bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-center">
          <div className="text-2xl font-bold text-purple-400">{completed}</div>
          <div className="text-xs text-white/40 mt-0.5">Completed</div>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-12 text-white/30">
          <Loader2 size={24} className="animate-spin mr-2" />
          <span className="text-sm">Connecting to Firebase...</span>
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4">
          {error}
        </div>
      ) : todos.length === 0 ? (
        <div className="text-center py-12 text-white/25 text-sm">
          No tasks yet — add one above!
        </div>
      ) : (
        <div className="space-y-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
