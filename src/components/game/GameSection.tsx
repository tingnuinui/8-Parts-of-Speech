import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GameWord, PartOfSpeechId } from '../../types';
import { gameWordBank } from '../../data/gameWords';
import { partsOfSpeechData } from '../../data/partsOfSpeech';
import { playSound, speakText } from '../../utils/audio';

interface GameSectionProps {
  isSlowMode: boolean;
}

export const GameSection: React.FC<GameSectionProps> = ({ isSlowMode }) => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start');
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [currentWord, setCurrentWord] = useState<GameWord>(gameWordBank[0]);
  const [feedback, setFeedback] = useState<{ text: string; isCorrect: boolean } | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const endGame = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setGameState('gameover');
  }, []);

  // Timer countdown
  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameState, endGame]);

  const pickNextWord = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * gameWordBank.length);
    const item = gameWordBank[randomIndex];
    setCurrentWord(item);
    setFeedback(null);
    setIsProcessing(false);
    speakText(item.word, isSlowMode);
  }, [isSlowMode]);

  const startGame = () => {
    setScore(0);
    setStreak(0);
    setCorrectCount(0);
    setTimeLeft(60);
    setFeedback(null);
    setGameState('playing');
    pickNextWord();
  };

  const handleSelectAnswer = (selectedPos: PartOfSpeechId) => {
    if (isProcessing || gameState !== 'playing') return;
    setIsProcessing(true);

    const isCorrect = selectedPos === currentWord.pos;
    const correctPosObj = partsOfSpeechData.find((p) => p.id === currentWord.pos)!;

    if (isCorrect) {
      playSound('correct');
      const newStreak = streak + 1;
      const pointsEarned = 10 + newStreak * 2;
      setStreak(newStreak);
      setCorrectCount((prev) => prev + 1);
      setScore((prev) => prev + pointsEarned);
      setFeedback({
        text: `✅ ถูกต้อง! +${pointsEarned} คะแนน (${currentWord.word} เป็น ${correctPosObj.nameEn})`,
        isCorrect: true,
      });
    } else {
      playSound('wrong');
      setStreak(0);
      setFeedback({
        text: `❌ ผิดจ้า! "${currentWord.word}" เป็น ${correctPosObj.nameEn} (${correctPosObj.nameTh})`,
        isCorrect: false,
      });
    }

    setTimeout(() => {
      if (timeLeft > 0) {
        pickNextWord();
      }
    }, 650);
  };

  return (
    <section className="space-y-6">
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-slate-200">
        {/* Game Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
              🎮 ARCADE MODE
            </span>
            <h2 className="text-2xl font-bold text-slate-800 mt-1">
              เกมคัดแยกคำศัพท์ (Word Sorter Challenge)
            </h2>
            <p className="text-sm text-slate-500">
              ดูคำศัพท์และประโยคใบ้ แล้วกดเลือกชนิดของคำ (Part of Speech) ให้ถูกต้อง!
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-amber-50 border border-amber-200 px-4 py-2 rounded-2xl text-center">
              <div className="text-xs text-amber-600 font-medium">🔥 คอมโบ (Streak)</div>
              <div className="text-xl font-extrabold text-amber-600">{streak}</div>
            </div>
            <div className="bg-indigo-50 border border-indigo-200 px-4 py-2 rounded-2xl text-center">
              <div className="text-xs text-indigo-600 font-medium">⭐ คะแนนรวม</div>
              <div className="text-xl font-extrabold text-indigo-600">{score}</div>
            </div>
            <div className="bg-rose-50 border border-rose-200 px-4 py-2 rounded-2xl text-center">
              <div className="text-xs text-rose-600 font-medium">⏱️ เวลา</div>
              <div className="text-xl font-extrabold text-rose-600">{timeLeft}s</div>
            </div>
          </div>
        </div>

        {/* Start Screen */}
        {gameState === 'start' && (
          <div className="py-12 text-center space-y-5 animate-pop">
            <div className="text-6xl animate-bounce">🕹️</div>
            <h3 className="text-2xl font-bold text-slate-800">พร้อมทดสอบความไวและแม่นยำหรือยัง?</h3>
            <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
              คุณมีเวลา <strong>60 วินาที</strong> ในการแยกประเภทคำศัพท์ให้ได้มากที่สุด
              ตอบถูกต่อเนื่องได้โบนัสคอมโบ พร้อมเสียงอ่านภาษาอังกฤษทุกข้อ!
            </p>
            <button
              onClick={startGame}
              className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-lg text-lg transition transform hover:scale-105 cursor-pointer"
            >
              🚀 เริ่มเล่นเกมเลย!
            </button>
          </div>
        )}

        {/* Play Area */}
        {gameState === 'playing' && (
          <div className="py-6 space-y-6 animate-pop">
            {/* Target Word Card */}
            <div className="max-w-xl mx-auto bg-gradient-to-br from-slate-800 to-indigo-950 text-white rounded-3xl p-6 text-center shadow-xl relative">
              <button
                onClick={() => speakText(currentWord.word, isSlowMode)}
                className="absolute top-4 right-4 bg-white/15 hover:bg-white/25 p-2.5 rounded-full text-white transition cursor-pointer"
                title="ฟังเสียงคำศัพท์"
              >
                🔊
              </button>
              <div className="text-5xl mb-2">{currentWord.emoji}</div>
              <div className="en-font text-4xl font-extrabold tracking-wide text-amber-300">
                {currentWord.word}
              </div>
              <div className="text-base text-indigo-200 mt-1">แปลว่า: {currentWord.meaning}</div>
              <div
                className="mt-4 inline-block bg-white/10 px-4 py-1.5 rounded-xl text-xs text-slate-200 en-font"
                dangerouslySetInnerHTML={{ __html: `"${currentWord.hint}"` }}
              />
            </div>

            {/* Feedback Message */}
            <div className="h-8 text-center font-bold text-base transition-all">
              {feedback && (
                <span className={feedback.isCorrect ? 'text-emerald-600' : 'text-rose-600'}>
                  {feedback.text}
                </span>
              )}
            </div>

            {/* 8 Buttons Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
              {partsOfSpeechData.map((pos) => (
                <button
                  key={pos.id}
                  onClick={() => handleSelectAnswer(pos.id)}
                  disabled={isProcessing}
                  className={`p-3.5 rounded-2xl border-2 ${pos.borderLight} ${pos.bgLight} hover:scale-105 active:scale-95 transition flex flex-col items-center shadow-xs cursor-pointer ${
                    isProcessing ? 'opacity-80' : ''
                  }`}
                >
                  <span className="text-2xl">{pos.emoji}</span>
                  <span className={`en-font font-extrabold text-sm ${pos.textMain}`}>
                    {pos.nameEn}
                  </span>
                  <span className="text-xs text-slate-600">{pos.nameTh}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Game Over Screen */}
        {gameState === 'gameover' && (
          <div className="py-10 text-center space-y-5 animate-pop">
            <div className="text-6xl">🏆</div>
            <h3 className="text-2xl font-bold text-slate-800">หมดเวลา! สรุปผลคะแนนของคุณ</h3>
            <div className="flex justify-center gap-4">
              <div className="bg-indigo-50 px-6 py-4 rounded-2xl border border-indigo-200">
                <div className="text-xs text-indigo-600">คะแนนที่ได้</div>
                <div className="text-3xl font-extrabold text-indigo-700">{score}</div>
              </div>
              <div className="bg-emerald-50 px-6 py-4 rounded-2xl border border-emerald-200">
                <div className="text-xs text-emerald-600">ตอบถูกทั้งหมด</div>
                <div className="text-3xl font-extrabold text-emerald-700">{correctCount} ข้อ</div>
              </div>
            </div>
            <div className="pt-2">
              <button
                onClick={startGame}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs transition cursor-pointer"
              >
                🔄 เล่นอีกครั้ง
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
