import Logo from './components/Logo';
import TodoList from './components/TodoList';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-['Outfit'] antialiased">
      <div className="max-w-lg mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <Logo />
          <p className="mt-2 text-sm text-white/40 ml-12">
            Real-time tasks, synced instantly
          </p>
        </div>

        {/* Main card */}
        <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-5 shadow-xl">
          <TodoList />
        </div>
      </div>
    </div>
  );
}
