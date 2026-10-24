import React, { useState } from 'react';
import { UserQuizAnswer } from '../../types';
import { quizQuestions } from '../../data/quizQuestions';
import { playSound, speakText } from '../../utils/audio';

interface QuizSectionProps {
  isSlowMode: boolean;
}

export const QuizSection: React.FC<QuizSectionProps> = ({ isSlowMode }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserQuizAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const currentQ = quizQuestions[currentIndex];
  const progressPercent = ((currentIndex + 1) / quizQuestions.length) * 100;

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;

    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentQ.correctIndex;
    if (isCorrect) {
      playSound('correct');
    } else {
      playSound('wrong');
    }

    setUserAnswers((prev) => [
      ...prev,
      {
        questionIndex: currentIndex,
        selected: index,
        isCorrect,
      },
    ]);
  };

  const handleNext = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setUserAnswers([]);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCompleted(false);
  };

  const score = userAnswers.filter((a) => a.isCorrect).length;

  return (
    <section className="space-y-6">
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-slate-200">
        {/* Quiz Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">
              📝 COMPREHENSIVE QUIZ
            </span>
            <h2 className="text-2xl font-bold text-slate-800 mt-1">
              แบบทดสอบวัดความเข้าใจ (พร้อมเฉลยละเอียด)
            </h2>
            <p className="text-sm text-slate-500">
              ข้อสอบ 12 ข้อ ครอบคลุมทั้ง 8 ชนิดของคำ มีเสียงอ่านประโยคและคำอธิบายเหตุผลทุกข้อ
            </p>
          </div>
          <div className="flex items-center gap-3">
            {!isCompleted && (
              <span className="text-sm font-bold text-slate-600">
                ข้อที่ {currentIndex + 1} / {quizQuestions.length}
              </span>
            )}
            <button
              onClick={handleReset}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium transition cursor-pointer"
            >
              🔄 เริ่มทำใหม่
            </button>
          </div>
        </div>

        {!isCompleted && (
          <>
            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden my-4">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Quiz Active Container */}
            <div className="py-4 space-y-6 max-w-3xl mx-auto animate-pop">
              {/* Question Box */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold">
                    วิเคราะห์หน้าที่ของคำ
                  </span>
                  <button
                    onClick={() => speakText(currentQ.cleanSentence, isSlowMode)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-medium transition shadow-xs cursor-pointer"
                  >
                    🔊 ฟังประโยค
                  </button>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-800">
                  {currentQ.question}
                </h3>
                <div
                  className="p-4 bg-white rounded-xl border border-slate-200 text-lg md:text-xl en-font font-bold text-slate-800 text-center shadow-inner"
                  dangerouslySetInnerHTML={{ __html: currentQ.sentence }}
                />
                <p className="text-xs text-slate-500 text-center">คำแปล: &ldquo;{currentQ.thai}&rdquo;</p>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ.options.map((opt, idx) => {
                  const letters = ['A', 'B', 'C', 'D'];
                  let btnClasses =
                    'p-4 rounded-2xl border-2 text-left font-bold transition flex items-center gap-3 shadow-xs cursor-pointer ';

                  if (!isAnswered) {
                    btnClasses +=
                      'border-slate-200 bg-white hover:border-indigo-400 hover:bg-indigo-50/40 text-slate-700';
                  } else {
                    if (idx === currentQ.correctIndex) {
                      btnClasses += 'border-emerald-500 bg-emerald-50 text-emerald-900';
                    } else if (idx === selectedOption) {
                      btnClasses += 'border-rose-500 bg-rose-50 text-rose-900';
                    } else {
                      btnClasses +=
                        'border-slate-200 bg-slate-50 text-slate-400 opacity-60 cursor-not-allowed';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      className={btnClasses}
                    >
                      <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center text-sm font-extrabold shrink-0">
                        {letters[idx]}
                      </span>
                      <span className="text-sm md:text-base">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Detailed Explanation Box (Shown after answering) */}
              {isAnswered && (
                <div
                  className={`p-5 rounded-2xl border space-y-2 animate-pop ${
                    selectedOption === currentQ.correctIndex
                      ? 'border-emerald-300 bg-emerald-50/70'
                      : 'border-rose-300 bg-rose-50/70'
                  }`}
                >
                  <div className="font-bold text-base flex items-center gap-2">
                    {selectedOption === currentQ.correctIndex ? (
                      <span className="text-emerald-700">✅ ยอดเยี่ยม! ตอบถูกต้องครับ</span>
                    ) : (
                      <span className="text-rose-700">
                        ❌ ยังไม่ถูกนะ! คำตอบที่ถูกคือ: {currentQ.options[currentQ.correctIndex]}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <strong>💡 คำอธิบายเฉลย:</strong> {currentQ.explanation}
                  </p>
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={handleNext}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm shadow-xs transition cursor-pointer"
                    >
                      {currentIndex === quizQuestions.length - 1
                        ? 'ดูสรุปคะแนนรวม 🏆'
                        : 'ข้อต่อไป ➡️'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Final Summary Container */}
        {isCompleted && (
          <div className="py-8 space-y-6 animate-pop">
            <div className="text-center space-y-3">
              <div className="text-6xl">
                {score >= 10 ? '🏆' : score >= 7 ? '🌟' : '💪'}
              </div>
              <h3 className="text-2xl font-bold text-slate-800">ทำแบบทดสอบครบแล้ว!</h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                {score >= 10
                  ? 'เก่งมากๆ เลยครับ! คุณเข้าใจเรื่อง 8 Parts of Speech อย่างทะลุปรุโปร่งแล้ว!'
                  : score >= 7
                  ? 'ทำได้ดีมากครับ! ลองทบทวนข้อที่ผิดด้านล่างอีกนิด รับรองเต็มแน่นอน'
                  : 'ไม่ต้องท้อนะ! ลองกลับไปอ่านทฤษฎีพร้อมกดฟังเสียง แล้วมาลองทำใหม่อีกครั้งนะครับ'}
              </p>
              <div className="inline-block bg-indigo-50 border border-indigo-200 px-8 py-4 rounded-2xl">
                <div className="text-xs text-indigo-600 font-medium">คะแนนรวมของคุณ</div>
                <div className="text-4xl font-extrabold text-indigo-700 mt-1">
                  {score} / {quizQuestions.length}
                </div>
              </div>
              <div>
                <button
                  onClick={handleReset}
                  className="mt-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs transition cursor-pointer"
                >
                  🔄 ทำแบบทดสอบอีกครั้ง
                </button>
              </div>
            </div>

            {/* All Answers Review List */}
            <div className="border-t border-slate-200 pt-6">
              <h4 className="text-lg font-bold text-slate-800 mb-4">
                📋 สรุปเฉลยละเอียดครบทุกข้อ:
              </h4>
              <div className="space-y-3">
                {quizQuestions.map((q, idx) => {
                  const ua = userAnswers.find((a) => a.questionIndex === idx);
                  const isCorr = ua?.isCorrect ?? false;
                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border space-y-1.5 ${
                        isCorr ? 'border-emerald-200 bg-emerald-50/30' : 'border-rose-200 bg-rose-50/30'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                            isCorr
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          ข้อที่ {idx + 1}: {isCorr ? '✅ ตอบถูก' : '❌ ตอบผิด'}
                        </span>
                        <button
                          onClick={() => speakText(q.cleanSentence, isSlowMode)}
                          className="text-xs text-indigo-600 hover:underline font-medium cursor-pointer"
                        >
                          🔊 ฟังประโยค
                        </button>
                      </div>
                      <div
                        className="en-font font-bold text-base text-slate-800"
                        dangerouslySetInnerHTML={{ __html: q.sentence }}
                      />
                      <div className="text-xs text-slate-600">
                        <strong>คำตอบของคุณ:</strong> {ua ? q.options[ua.selected] : '-'} |{' '}
                        <strong className="text-emerald-700">
                          เฉลยที่ถูกต้อง: {q.options[q.correctIndex]}
                        </strong>
                      </div>
                      <div className="text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200/80">
                        💡 <strong>เหตุผล:</strong> {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
