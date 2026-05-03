import { CheckSquare } from 'lucide-react';

export const Logo = () => {
  return (
    <div className="flex items-center justify-center gap-4 group cursor-default">
      <div className="relative w-14 h-14 flex items-center justify-center">
        {/* Glow behind */}
        <div className="absolute inset-0 bg-indigo-500 rounded-full blur-[20px] opacity-40 group-hover:opacity-70 transition-opacity duration-700 animate-glow-pulse"></div>
        {/* Icon container */}
        <div className="relative z-10 w-12 h-12 bg-black/40 border border-white/10 rounded-xl backdrop-blur-md flex items-center justify-center transform group-hover:-rotate-6 transition-all duration-500 shadow-xl">
          <CheckSquare className="text-indigo-400 absolute" size={26} strokeWidth={2.5} />
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-indigo-200 to-purple-400 drop-shadow-sm">
          TaskFlow
        </h1>
        <div className="flex items-center gap-2 mt-0.5">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
          <p className="text-[10px] uppercase tracking-[0.3em] font-medium text-cyan-400/80 font-mono">
            Real-Time Sync
          </p>
        </div>
      </div>
    </div>
  );
};
