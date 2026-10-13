import React from 'react';
import { ExternalLink, Beaker, Sparkles } from 'lucide-react';
import type { GeneratorKind } from '../types/figures';

interface NavbarProps {
  activeGenerator: GeneratorKind | null;
  onSelectGenerator: (kind: GeneratorKind | null) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeGenerator,
  onSelectGenerator,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onSelectGenerator(null)}
            className="flex items-center gap-2.5 text-left group transition-all"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-sm group-hover:bg-emerald-700 transition-colors">
              <Beaker className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-slate-900 text-base tracking-tight block">
                Chemistry Figures
              </span>
              <span className="text-[11px] text-slate-500 font-medium tracking-wide block uppercase">
                Molecular & Lab Diagram Generator
              </span>
            </div>
          </button>

          {activeGenerator && (
            <div className="hidden sm:flex items-center gap-2 ml-4 pl-4 border-l border-slate-200">
              <span className="text-xs text-slate-400">/</span>
              <button
                type="button"
                onClick={() => onSelectGenerator(null)}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-800 transition-colors"
              >
                All Figures
              </button>
            </div>
          )}
        </div>

        {/* Network Family (STEM Figures) */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-600">
            <span className="text-slate-400 mr-1">Network:</span>
            <a
              href="https://physics-figures.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-medium transition-colors"
            >
              Physics Figures
              <Sparkles className="w-3 h-3 text-blue-500" />
            </a>
            <a
              href="https://math-figures.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-medium transition-colors"
            >
              Math Figures
              <Sparkles className="w-3 h-3 text-amber-500" />
            </a>
          </div>

          <a
            href="https://github.com/unveiledhistory49/chemistry-figures"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
          >
            GitHub
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>
    </header>
  );
};
