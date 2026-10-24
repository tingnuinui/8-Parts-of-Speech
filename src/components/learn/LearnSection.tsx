import React, { useState } from 'react';
import { PartOfSpeechId } from '../../types';
import { partsOfSpeechData } from '../../data/partsOfSpeech';
import { PosDetailCard } from './PosDetailCard';
import { MasterSentence } from './MasterSentence';

interface LearnSectionProps {
  isSlowMode: boolean;
}

export const LearnSection: React.FC<LearnSectionProps> = ({ isSlowMode }) => {
  const [selectedPosId, setSelectedPosId] = useState<PartOfSpeechId>('noun');

  const currentPos =
    partsOfSpeechData.find((p) => p.id === selectedPosId) || partsOfSpeechData[0];

  return (
    <section className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-3xl p-6 md:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-medium backdrop-blur-xs">
            💡 ปูพื้นฐานไวยากรณ์อังกฤษแบบเข้าใจง่าย
          </span>
          <h2 className="text-2xl md:text-3xl font-bold">ทำไมต้องเรียน 8 Parts of Speech?</h2>
          <p className="text-indigo-100 text-sm md:text-base leading-relaxed">
            ในภาษาอังกฤษ คำทุกคำในประโยคจะมี <strong>&ldquo;หน้าที่&rdquo;</strong> ของตัวเองเหมือนสมาชิกในทีมฟุตบอล
            หากเรารู้ว่าคำไหนทำหน้าที่อะไร เราจะแต่งประโยคได้ถูกต้อง อ่านเข้าใจเร็ว
            และทำข้อสอบได้สบายมาก!
          </p>
        </div>
        <div className="flex flex-col items-center bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center min-w-[200px]">
          <div className="text-4xl mb-1">🔊</div>
          <p className="text-xs font-medium text-white">
            คลิกที่ปุ่มลำโพงหรือคำศัพท์
            <br />
            เพื่อฝึกฟังเสียงเจ้าของภาษา!
          </p>
        </div>
      </div>

      {/* 8 Parts Selection Grid */}
      <div>
        <h3 className="text-lg font-bold text-slate-700 mb-3 flex items-center gap-2">
          <span>📌 เลือกชนิดของคำที่ต้องการศึกษา:</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {partsOfSpeechData.map((pos) => {
            const isActive = pos.id === selectedPosId;
            return (
              <button
                key={pos.id}
                onClick={() => setSelectedPosId(pos.id)}
                className={`card-hover p-3 rounded-2xl border text-left transition flex flex-col items-center text-center gap-1 cursor-pointer ${
                  isActive
                    ? `${pos.badgeBg} text-white border-transparent shadow-md scale-105`
                    : `bg-white hover:${pos.bgLight} border-slate-200 text-slate-700`
                }`}
              >
                <span className="text-2xl">{pos.emoji}</span>
                <span className="en-font font-extrabold text-sm">{pos.nameEn}</span>
                <span className={`text-[11px] ${isActive ? 'text-white/90' : 'text-slate-500'}`}>
                  {pos.nameTh}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detailed Lesson Display Card */}
      <PosDetailCard key={currentPos.id} pos={currentPos} isSlowMode={isSlowMode} />

      {/* Master Summary Sentence */}
      <MasterSentence isSlowMode={isSlowMode} />
    </section>
  );
};
