import React from 'react';
import { speakText } from '../../utils/audio';

interface MasterSentenceProps {
  isSlowMode: boolean;
}

export const MasterSentence: React.FC<MasterSentenceProps> = ({ isSlowMode }) => {
  const fullSentence = 'Wow! He ran quickly after the red bus, and caught it.';

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">
            🌟 ประโยคมหัศจรรย์: รวมครบทั้ง 8 ชนิดในประโยคเดียว!
          </h3>
          <p className="text-xs text-slate-500">
            ลองกดฟังเสียงทั้งประโยค หรือคลิกที่แต่ละคำเพื่อฟังเสียงแยกคำ
          </p>
        </div>
        <button
          onClick={() => speakText(fullSentence, isSlowMode)}
          className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium shadow-xs transition cursor-pointer"
        >
          🔊 ฟังทั้งประโยค
        </button>
      </div>

      <div className="flex flex-wrap gap-2.5 items-center justify-center bg-slate-50 p-5 rounded-2xl border border-slate-100">
        <div
          onClick={() => speakText('Wow', isSlowMode)}
          className="cursor-pointer group bg-pink-50 border border-pink-200 px-3 py-2 rounded-xl text-center hover:bg-pink-100 hover:scale-105 transition"
        >
          <div className="en-font font-bold text-lg text-pink-700">Wow! 🔊</div>
          <div className="text-[11px] font-medium text-pink-600">Interjection (คำอุทาน)</div>
        </div>

        <div
          onClick={() => speakText('He', isSlowMode)}
          className="cursor-pointer group bg-purple-50 border border-purple-200 px-3 py-2 rounded-xl text-center hover:bg-purple-100 hover:scale-105 transition"
        >
          <div className="en-font font-bold text-lg text-purple-700">He 🔊</div>
          <div className="text-[11px] font-medium text-purple-600">Pronoun (คำสรรพนาม)</div>
        </div>

        <div
          onClick={() => speakText('ran', isSlowMode)}
          className="cursor-pointer group bg-red-50 border border-red-200 px-3 py-2 rounded-xl text-center hover:bg-red-100 hover:scale-105 transition"
        >
          <div className="en-font font-bold text-lg text-red-700">ran 🔊</div>
          <div className="text-[11px] font-medium text-red-600">Verb (คำกริยา)</div>
        </div>

        <div
          onClick={() => speakText('quickly', isSlowMode)}
          className="cursor-pointer group bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl text-center hover:bg-emerald-100 hover:scale-105 transition"
        >
          <div className="en-font font-bold text-lg text-emerald-700">quickly 🔊</div>
          <div className="text-[11px] font-medium text-emerald-600">Adverb (กริยาวิเศษณ์)</div>
        </div>

        <div
          onClick={() => speakText('after', isSlowMode)}
          className="cursor-pointer group bg-cyan-50 border border-cyan-200 px-3 py-2 rounded-xl text-center hover:bg-cyan-100 hover:scale-105 transition"
        >
          <div className="en-font font-bold text-lg text-cyan-700">after 🔊</div>
          <div className="text-[11px] font-medium text-cyan-600">Preposition (คำบุพบท)</div>
        </div>

        <div
          onClick={() => speakText('the red', isSlowMode)}
          className="cursor-pointer group bg-amber-50 border border-amber-200 px-3 py-2 rounded-xl text-center hover:bg-amber-100 hover:scale-105 transition"
        >
          <div className="en-font font-bold text-lg text-amber-700">red 🔊</div>
          <div className="text-[11px] font-medium text-amber-600">Adjective (คำคุณศัพท์)</div>
        </div>

        <div
          onClick={() => speakText('bus', isSlowMode)}
          className="cursor-pointer group bg-blue-50 border border-blue-200 px-3 py-2 rounded-xl text-center hover:bg-blue-100 hover:scale-105 transition"
        >
          <div className="en-font font-bold text-lg text-blue-700">bus, 🔊</div>
          <div className="text-[11px] font-medium text-blue-600">Noun (คำนาม)</div>
        </div>

        <div
          onClick={() => speakText('and', isSlowMode)}
          className="cursor-pointer group bg-orange-50 border border-orange-200 px-3 py-2 rounded-xl text-center hover:bg-orange-100 hover:scale-105 transition"
        >
          <div className="en-font font-bold text-lg text-orange-700">and 🔊</div>
          <div className="text-[11px] font-medium text-orange-600">Conjunction (คำสันธาน)</div>
        </div>

        <div
          onClick={() => speakText('caught it', isSlowMode)}
          className="cursor-pointer group bg-slate-100 border border-slate-300 px-3 py-2 rounded-xl text-center hover:bg-slate-200 hover:scale-105 transition"
        >
          <div className="en-font font-bold text-lg text-slate-700">caught it. 🔊</div>
          <div className="text-[11px] font-medium text-slate-600">Verb + Pronoun</div>
        </div>
      </div>

      <p className="text-center text-sm text-slate-600 mt-3">
        <strong>คำแปล:</strong> &ldquo;ว้าว! เขาวิ่งตามรถบัสสีแดงไปอย่างรวดเร็ว และขึ้นรถได้ทัน&rdquo;
      </p>
    </div>
  );
};
