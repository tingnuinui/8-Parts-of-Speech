import React from 'react';
import { PartOfSpeech } from '../../types';
import { speakText } from '../../utils/audio';

interface PosDetailCardProps {
  pos: PartOfSpeech;
  isSlowMode: boolean;
}

export const PosDetailCard: React.FC<PosDetailCardProps> = ({ pos, isSlowMode }) => {
  return (
    <div className="bg-white rounded-3xl shadow-md border border-slate-200 overflow-hidden animate-pop">
      {/* Top Colored Header */}
      <div
        className={`${pos.bgLight} border-b ${pos.borderLight} p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4`}
      >
        <div className="flex items-start sm:items-center gap-4">
          <div
            className={`w-16 h-16 rounded-2xl bg-white shadow-xs flex items-center justify-center text-4xl border ${pos.borderLight} shrink-0`}
          >
            {pos.emoji}
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className={`en-font text-2xl md:text-3xl font-extrabold ${pos.textMain}`}>
                {pos.nameEn}
              </h2>
              <span className={`px-3 py-0.5 rounded-full text-sm font-bold text-white ${pos.badgeBg}`}>
                {pos.nameTh}
              </span>
              <button
                onClick={() => speakText(pos.nameEn, isSlowMode)}
                className={`p-1.5 rounded-lg bg-white hover:bg-slate-100 border ${pos.borderLight} text-xs font-medium shadow-xs transition flex items-center gap-1 cursor-pointer`}
                title="ฟังการออกเสียง"
              >
                <span>🔊</span>
                <span>ออกเสียงชื่อ</span>
              </button>
            </div>
            <p className="text-slate-700 mt-1 text-sm md:text-base font-medium">{pos.definition}</p>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 md:p-8 space-y-6">
        {/* Memory Trick & Subtypes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4">
            <h4 className="font-bold text-amber-800 text-sm flex items-center gap-1.5 mb-1">
              💡 เทคนิคการจำ (Memory Trick)
            </h4>
            <p className="text-sm text-amber-900">{pos.trick}</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5 mb-1">
              📂 ประเภทย่อยที่พบบ่อย
            </h4>
            <ul className="text-xs md:text-sm text-slate-600 space-y-1 list-disc list-inside">
              {pos.subtypes.map((sub, idx) => (
                <li key={idx}>{sub}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Vocabulary Cards with Audio */}
        <div>
          <h4 className="font-bold text-slate-800 text-base mb-3 flex items-center gap-2">
            <span>🗣️ ตัวอย่างคำศัพท์ (คลิกที่การ์ดเพื่อฟังเสียงอ่าน):</span>
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {pos.vocab.map((v, idx) => (
              <div
                key={idx}
                onClick={() => speakText(v.word, isSlowMode)}
                className={`card-hover cursor-pointer bg-white border border-slate-200 hover:${pos.borderLight} rounded-2xl p-3 text-center shadow-xs group`}
              >
                <div className="text-3xl mb-1 group-hover:scale-110 transition">{v.icon}</div>
                <div className={`en-font font-bold text-base ${pos.textMain} flex items-center justify-center gap-1`}>
                  <span>{v.word}</span>
                  <span className="text-xs opacity-70">🔊</span>
                </div>
                <div className="text-[11px] text-slate-400">({v.pron})</div>
                <div className="text-xs font-medium text-slate-700 mt-1">{v.meaning}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Example Sentences */}
        <div>
          <h4 className="font-bold text-slate-800 text-base mb-3 flex items-center gap-2">
            <span>📝 ตัวอย่างการใช้ในประโยค:</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {pos.sentences.map((s, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3"
              >
                <div>
                  <div
                    className="en-font font-bold text-base md:text-lg text-slate-800"
                    dangerouslySetInnerHTML={{ __html: s.en }}
                  />
                  <div className="text-xs text-slate-500 mt-1">{s.th}</div>
                </div>
                <button
                  onClick={() => speakText(s.clean, isSlowMode)}
                  className={`shrink-0 w-10 h-10 rounded-xl ${pos.badgeBg} hover:opacity-90 text-white flex items-center justify-center shadow-xs transition cursor-pointer`}
                  title="ฟังประโยค"
                >
                  🔊
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
