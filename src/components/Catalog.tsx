import React, { useState } from 'react';
import type { GeneratorKind, GeneratorMetadata } from '../types/figures';
import { Search, ArrowRight, Beaker } from 'lucide-react';
import { FigurePreview } from './CatalogPreviews';

interface CatalogProps {
  onSelectGenerator: (kind: GeneratorKind) => void;
}

export const GENERATORS: GeneratorMetadata[] = [
  {
    id: 'particle-diagram',
    title: 'Particulate Matter Diagram Generator',
    description: 'Solid, liquid, and gas particle arrangements, pure elements, diatomic molecules, compounds, and mixtures with velocity trails.',
    tags: ['Matter', 'Phases', 'Particles', 'AP Chem'],
  },
  {
    id: 'lewis-structure',
    title: 'Lewis Electron Dot Structure Generator',
    description: 'Central atoms, single/double/triple bonds, lone pairs, polyatomic ion brackets, and formal charge callouts.',
    tags: ['Bonding', 'Lewis Dot', 'Molecules'],
  },
  {
    id: 'bohr-model',
    title: 'Bohr-Rutherford Atomic Model Generator',
    description: 'Concentric electron energy shells (K, L, M, N), proton and neutron counts, and valence electron distributions.',
    tags: ['Atomic Structure', 'Bohr Model', 'Electrons'],
  },
  {
    id: 'heating-curve',
    title: 'Phase Change Heating & Cooling Curve',
    description: 'Temperature vs heat added curves with solid, liquid, gas regions, melting and boiling plateaus, and phase labels.',
    tags: ['Thermodynamics', 'Heating Curve', 'Phase Change'],
  },
  {
    id: 'titration-curve',
    title: 'Acid-Base Titration Curve Generator',
    description: 'Strong/weak acid-base titration curves, equivalence point marker, buffer region, half-equivalence pH, and indicators.',
    tags: ['Acids and Bases', 'Titration', 'pH'],
  },
  {
    id: 'glassware-reading',
    title: 'Lab Glassware Meniscus Reading Generator',
    description: 'Graduated cylinders, burets, and thermometers with calibrated tick subdivisions and realistic curved meniscus reading.',
    tags: ['Lab Skills', 'Measurement', 'Meniscus'],
  },
  {
    id: 'electrochem-cell',
    title: 'Galvanic & Voltaic Cell Generator',
    description: 'Two-half-cell electrochemical apparatus with anode/cathode electrodes, salt bridge, electron flow arrow, and voltmeter.',
    tags: ['Electrochemistry', 'Voltaic Cell', 'Redox'],
  },
];

export const Catalog: React.FC<CatalogProps> = ({ onSelectGenerator }) => {
  const [search, setSearch] = useState('');

  const filtered = GENERATORS.filter((gen) => {
    const q = search.toLowerCase();
    return (
      gen.title.toLowerCase().includes(q) ||
      gen.description.toLowerCase().includes(q) ||
      gen.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto flex flex-col gap-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold mx-auto">
          <Beaker className="w-3.5 h-3.5 text-blue-600" />
          Vector Chem Studio
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Chemistry figures for your tests and worksheets
        </h1>
        <p className="text-base sm:text-lg text-slate-600">
          Make clean, publication-grade particulate, bonding, atomic, and titration vector diagrams.
          Free, with high-DPI clipboard export and zero sign-up.
        </p>

        {/* Search Input */}
        <div className="mt-3 relative max-w-lg mx-auto w-full">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search figures, like “lewis structure”, “titration”..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white shadow-sm text-sm focus:outline-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
      </div>

      {/* Grid of Diagrams with Live Visual Previews */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {filtered.map((gen) => (
          <div
            key={gen.id}
            onClick={() => onSelectGenerator(gen.id)}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col hover:shadow-lg hover:border-blue-500/80 transition-all cursor-pointer group"
          >
            {/* Visual Figure SVG Preview */}
            <div className="w-full h-44 bg-slate-50/50 border-b border-slate-100 flex items-center justify-center p-3 group-hover:bg-white transition-colors relative">
              <FigurePreview kind={gen.id} />
              <span className="absolute top-3 right-3 text-[11px] font-semibold uppercase tracking-wider text-blue-900 bg-white/90 border border-blue-200 px-2 py-0.5 rounded-md shadow-xs">
                {gen.tags[0]}
              </span>
            </div>

            {/* Content & Metadata */}
            <div className="p-5 flex-1 flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {gen.title}
                  </h3>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all shrink-0" />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {gen.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                {gen.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md font-medium border border-slate-200/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center text-slate-500 text-sm">
            No chemistry figures found matching "{search}". Try searching for "lewis", "particles", or "titration".
          </div>
        )}
      </div>
    </div>
  );
};
