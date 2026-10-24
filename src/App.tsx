/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AppTab } from './types';
import { Header } from './components/Header';
import { LearnSection } from './components/learn/LearnSection';
import { GameSection } from './components/game/GameSection';
import { QuizSection } from './components/quiz/QuizSection';
import { Footer } from './components/Footer';

export default function App() {
  const [currentTab, setCurrentTab] = useState<AppTab>('learn');
  const [isSlowMode, setIsSlowMode] = useState<boolean>(false);

  useEffect(() => {
    // Warm up voices on startup for instant speech synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      const onVoicesChanged = () => {
        window.speechSynthesis.getVoices();
      };
      window.speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);
      return () => {
        window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
      };
    }
  }, []);

  const handleToggleSlowMode = () => {
    setIsSlowMode((prev) => !prev);
  };

  return (
    <div className="min-h-screen text-slate-800 pb-16">
      {/* Navbar / Header */}
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        isSlowMode={isSlowMode}
        onToggleSlowMode={handleToggleSlowMode}
      />

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 mt-6">
        {currentTab === 'learn' && <LearnSection isSlowMode={isSlowMode} />}
        {currentTab === 'game' && <GameSection isSlowMode={isSlowMode} />}
        {currentTab === 'quiz' && <QuizSection isSlowMode={isSlowMode} />}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
