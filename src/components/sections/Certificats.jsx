import React, { useState } from 'react';
import SectionTitle from '@/components/ui/SectionTitle';

const certificats = [
  { src: '/certificat/baccalauréat22.jpg', type: 'image', title: 'Baccalauréat 2022', desc: 'Diplôme obtenu en 2022 avec mention.' },
  { src: '/certificat/baccalauréat2.pdf', type: 'pdf', title: 'Baccalauréat 2022 (PDF)', desc: 'Version PDF officielle du diplôme.' },
  { src: '/certificat/Certificate five guys.pdf.png', type: 'image', title: 'Certificate Five Guys', desc: 'Formation en restauration rapide.' },
  { src: '/certificat/Certificate.pdf.svg', type: 'image', title: 'Certificate (SVG)', desc: 'Certification design vectoriel.' },
  { src: '/certificat/sql_basic certificate.pdf', type: 'pdf', title: 'SQL Basic Certificate', desc: 'Certification SQL de base.' },
  { src: '/certificat/r_basic certificate.pdf', type: 'pdf', title: 'R Basic Certificate', desc: 'Certification R pour l’analyse de données.' },
  { src: '/certificat/java_basic certificate.pdf', type: 'pdf', title: 'Java Basic Certificate', desc: 'Certification Java débutant.' },
  { src: '/certificat/asgnmt-01-java-fr-16.pdf', type: 'pdf', title: 'Assignment Java', desc: 'Projet Java universitaire.' },
];

const Certificats = () => {
  const [zoomed, setZoomed] = useState(null);
  const [zoomedIdx, setZoomedIdx] = useState(null);

  React.useEffect(() => {
    if (zoomedIdx === null) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setZoomedIdx(null);
      if (e.key === 'ArrowLeft') setZoomedIdx((i) => (i > 0 ? i - 1 : certificats.length - 1));
      if (e.key === 'ArrowRight') setZoomedIdx((i) => (i < certificats.length - 1 ? i + 1 : 0));
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [zoomedIdx]);

  return (
    <section id="certificats" className="relative py-24 bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Fond décoratif SVG */}
      <svg className="absolute left-0 top-0 w-full h-full pointer-events-none opacity-20" aria-hidden="true">
        <defs>
          <radialGradient id="certif-grad" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="60%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle cx="80%" cy="20%" r="300" fill="url(#certif-grad)" />
        <circle cx="20%" cy="80%" r="200" fill="url(#certif-grad)" />
      </svg>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <SectionTitle
          title="Certificats & Diplômes"
          subtitle="Mes attestations, diplômes et certifications."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-12">
          {certificats.map((cert, idx) => (
            <div
              key={idx}
              className="relative group rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 p-5 flex flex-col items-center glass-effect-premium transition-transform duration-300 hover:scale-105 hover:shadow-[0_8px_32px_0_rgba(251,191,36,0.25)] hover:border-yellow-400 dark:hover:border-pink-400 hover:z-20"
              style={{ backdropFilter: 'blur(16px)', background: 'rgba(255,255,255,0.25)' }}
            >
              {cert.type === 'image' ? (
                <button onClick={() => { setZoomedIdx(idx); }} className="w-full">
                  <img src={cert.src} alt={cert.title} className="object-contain w-full h-48 mb-4 rounded-xl group-hover:scale-110 transition-transform duration-500 bg-gray-50 dark:bg-gray-900 shadow-md" />
                </button>
              ) : (
                <a href={cert.src} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center w-full h-48 mb-4 bg-gray-100 dark:bg-gray-900 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900 transition">
                  <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="12" fill="#3B82F6"/><path d="M8 16h8M8 12h8M8 8h8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                  <span className="mt-2 text-blue-600 dark:text-blue-300 font-semibold">Voir PDF</span>
                </a>
              )}
              <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold shadow-md ${cert.type === 'pdf' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'} drop-shadow-lg`}>{cert.type === 'pdf' ? 'PDF' : 'Image'}</span>
              <div className="mt-2 text-base font-bold text-gray-800 dark:text-gray-100 gradient-text-premium">{cert.title}</div>
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-300 italic">{cert.desc}</div>
            </div>
          ))}
        </div>
        {/* Modale de zoom premium */}
        {zoomedIdx !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in" onClick={() => setZoomedIdx(null)}>
            <div className="relative flex flex-col items-center">
              <div className="mb-4 text-xl font-bold text-white drop-shadow-lg">{certificats[zoomedIdx].title}</div>
              {certificats[zoomedIdx].type === 'image' ? (
                <img src={certificats[zoomedIdx].src} alt="Certificat zoomé" className="max-w-3xl max-h-[80vh] rounded-2xl shadow-2xl border-4 border-white dark:border-gray-800 animate-zoom-in" onClick={e => e.stopPropagation()} />
              ) : (
                <a href={certificats[zoomedIdx].src} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center w-80 h-80 bg-gray-100 dark:bg-gray-900 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900 transition" onClick={e => e.stopPropagation()}>
                  <svg width="80" height="80" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="12" fill="#3B82F6"/><path d="M8 16h8M8 12h8M8 8h8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                  <span className="mt-4 text-blue-600 dark:text-blue-300 font-semibold text-lg">Voir PDF</span>
                </a>
              )}
              <div className="mt-2 text-base text-gray-200 italic text-center max-w-md">{certificats[zoomedIdx].desc}</div>
              <div className="flex gap-4 mt-6">
                <button onClick={e => { e.stopPropagation(); setZoomedIdx(i => (i > 0 ? i - 1 : certificats.length - 1)); }} className="text-white bg-black/40 hover:bg-black/70 rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold transition">&#8592;</button>
                <button onClick={e => { e.stopPropagation(); setZoomedIdx(i => (i < certificats.length - 1 ? i + 1 : 0)); }} className="text-white bg-black/40 hover:bg-black/70 rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold transition">&#8594;</button>
              </div>
              <button onClick={() => setZoomedIdx(null)} className="absolute top-4 right-4 text-white text-3xl font-bold bg-black/50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/80 transition">&times;</button>
            </div>
          </div>
        )}
      </div>
      {/* Styles premium */}
      <style>{`
        .glass-effect-premium {
          background: rgba(255,255,255,0.25);
          box-shadow: 0 8px 32px 0 rgba(251,191,36,0.15);
          backdrop-filter: blur(16px);
          border: 1.5px solid rgba(255,255,255,0.18);
        }
        .gradient-text-premium {
          background: linear-gradient(90deg, #fbbf24 0%, #f472b6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .animate-fade-in {
          animation: fadeInCertif 0.3s;
        }
        .animate-zoom-in {
          animation: zoomInCertif 0.3s;
        }
        @keyframes fadeInCertif {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoomInCertif {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default Certificats; 