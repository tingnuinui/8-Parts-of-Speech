import React from 'react';
import { AppTab } from '../types';

interface HeaderProps {
  currentTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  isSlowMode: boolean;
  onToggleSlowMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  isSlowMode,
  onToggleSlowMode,
}) => {
  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-xs border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onTabChange('learn')}>
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center text-white text-2xl shadow-md transform hover:rotate-6 transition">
            🚀
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-700 to-purple-600 bg-clip-text text-transparent">
              8 Parts of Speech
            </h1>
            <p className="text-xs text-slate-500">ตะลุยด่านหน้าที่ของคำในภาษาอังกฤษ สำหรับนักเรียนไทย</p>
          </div>
        </div>

        {/* Controls & Navigation */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Slow Speech Toggle */}
          <button
            onClick={onToggleSlowMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition cursor-pointer ${
              isSlowMode
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200'
                : 'bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200'
            }`}
            title="สลับความเร็วเสียงพูด"
          >
            <span>{isSlowMode ? '🐢' : '🐇'}</span>
            <span>{isSlowMode ? 'โหมดพูดช้า (0.65x)' : 'ความเร็วปกติ (1.0x)'}</span>
          </button>

          {/* Mode Switch Tabs */}
          <nav className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => onTabChange('learn')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                currentTab === 'learn'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              📚 บทเรียน
            </button>
            <button
              onClick={() => onTabChange('game')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                currentTab === 'game'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              🎮 มินิเกม
            </button>
            <button
              onClick={() => onTabChange('quiz')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                currentTab === 'quiz'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              📝 แบบทดสอบ
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
