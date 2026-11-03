import React from 'react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/75 p-3 sm:p-4 backdrop-blur-sm select-none">
      <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-fuchsia-500/40 bg-slate-900 shadow-2xl shadow-fuchsia-500/10">
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 p-4 sm:p-5 text-white">
          <div className="flex items-center gap-2.5">
            <span className="text-xl sm:text-2xl">ℹ️</span>
            <h2 className="text-lg sm:text-xl font-bold tracking-wide">Comment Confiserie de Minuit a été fait</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-800 p-2 text-slate-400 hover:bg-slate-700 hover:text-white transition cursor-pointer"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto p-4 sm:p-6 space-y-3.5 text-slate-300 text-xs sm:text-sm leading-relaxed">
          <p>
            <strong className="text-fuchsia-400">Stack :</strong> React 19, TypeScript 5.9, Tailwind CSS 4, Vite 7, Lucide Icons, compilation single-file.
          </p>
          <p>
            <strong className="text-fuchsia-400">Graphismes :</strong> UI chaleureuse et envoûtante avec étals de bonbons, bocaux magiques rétro-éclairés, modale de grimoire de recettes et clients monstres animés.
          </p>
          <p>
            <strong className="text-fuchsia-400">Musique &amp; sons :</strong> Moteur sonore Web Audio API avec bouillons de chaudron, tintements de clochettes et cris de joie monstrueux.
          </p>
          <p>
            <strong className="text-fuchsia-400">Interactions :</strong> Composition de plateaux de friandises au clic/tap, commandes de réapprovisionnement, consultation des formules magiques.
          </p>
          <p>
            <strong className="text-fuchsia-400">Architecture :</strong> Découpage modulaire poussé (CandyShelf, CounterWorkstation, CustomerStage, GrimoireModal, TopHud), typage strict des commandes et des créatures.
          </p>
          <p>
            <strong className="text-fuchsia-400">Algorithmes notables :</strong> Validation combinatoire des recettes magiques, gestion dynamique de la satisfaction client, simulation économique jour/nuit.
          </p>
        </div>

        <div className="bg-slate-950 p-3 sm:p-4 text-center border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl font-bold text-white bg-fuchsia-600 hover:bg-fuchsia-500 transition cursor-pointer text-sm shadow-md"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
