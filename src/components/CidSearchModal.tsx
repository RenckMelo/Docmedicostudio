import React, { useState } from 'react';
import { CID10 } from '../types';
import { MOCK_CID10_LIST } from '../data/mockData';
import { Search, X, Check, BookOpen } from 'lucide-react';

interface CidSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCid: (cid: CID10) => void;
}

export const CidSearchModal: React.FC<CidSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectCid,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  if (!isOpen) return null;

  const categories = ['Todos', ...Array.from(new Set(MOCK_CID10_LIST.map(c => c.category || 'Geral')))];

  const filtered = MOCK_CID10_LIST.filter(item => {
    const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
    const matchesQuery =
      item.code.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 print:hidden">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl text-slate-100">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">Busca e Seleção de CID-10 Oficial</h2>
              <p className="text-xs text-slate-400">Pesquise o código CID-10 por nome ou diagnóstico médico.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar & Category Filters */}
        <div className="p-4 border-b border-slate-800 space-y-3 bg-slate-900/50">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Digite o código (ex: E11.9, J06, M54) ou nome da patologia..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-teal-500"
              autoFocus
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-teal-500 text-slate-950 shadow'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto flex-grow space-y-2 max-h-[50vh]">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-sm">
              Nenhum código CID-10 encontrado para "{query}".
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => {
                  onSelectCid(item);
                  onClose();
                }}
                className="w-full text-left bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 hover:border-teal-500/50 p-3 rounded-xl transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-xs bg-slate-950 text-teal-400 px-2.5 py-1 rounded border border-slate-800 group-hover:border-teal-500/30">
                    {item.code}
                  </span>
                  <div>
                    <h3 className="font-semibold text-sm text-slate-200 group-hover:text-white">
                      {item.description}
                    </h3>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {item.category}
                    </span>
                  </div>
                </div>

                <span className="text-xs font-bold text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  <Check className="w-4 h-4" /> Selecionar
                </span>
              </button>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
