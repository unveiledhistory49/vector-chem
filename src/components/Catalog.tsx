import React, { useState } from 'react';
import type { GeneratorKind, GeneratorMetadata } from '../types/figures';
import { Search, ArrowRight } from 'lucide-react';

interface CatalogProps {
  onSelectGenerator: (kind: GeneratorKind) => void;
}

export const GENERATORS: GeneratorMetadata[] = [
  {
    id: 'particle-diagram',
    title: 'Particulate Matter Diagram Generator',
    description: 'Solid, liquid, and gas particle arrangements, pure elements, diatomic molecules, compounds, and mixtures with velocity trails.',
    tags: ['Matter', 'Phases', 'Particles', 'States of Matter', 'AP Chem'],
  },
  {
    id: 'lewis-structure',
    title: 'Lewis Electron Dot Structure Generator',
    description: 'Central atoms, single/double/triple bonds, lone pairs, polyatomic ion brackets, and formal charge callouts.',
    tags: ['Bonding', 'Lewis Dot', 'Valence', 'Molecules'],
  },
  {
    id: 'bohr-model',
    title: 'Bohr-Rutherford Atomic Model Generator',
    description: 'Concentric electron energy shells (K, L, M, N), proton and neutron counts, and valence electron distributions.',
    tags: ['Atomic Structure', 'Bohr Model', 'Electrons', 'Periodic Table'],
  },
  {
    id: 'heating-curve',
    title: 'Phase Change Heating & Cooling Curve',
    description: 'Temperature vs heat added curves with solid, liquid, gas regions, melting and boiling plateaus, and phase labels.',
    tags: ['Thermodynamics', 'Heating Curve', 'Latent Heat', 'Phase Change'],
  },
  {
    id: 'titration-curve',
    title: 'Acid-Base Titration Curve Generator',
    description: 'Strong/weak acid-base titration curves, equivalence point marker, buffer region, half-equivalence pH, and indicators.',
    tags: ['Acids and Bases', 'Titration', 'pH', 'Buffer', 'Equilibrium'],
  },
  {
    id: 'glassware-reading',
    title: 'Lab Glassware Meniscus Reading Generator',
    description: 'Graduated cylinders, burets, and thermometers with calibrated tick subdivisions and realistic curved meniscus reading.',
    tags: ['Lab Skills', 'Measurement', 'Meniscus', 'Significant Figures'],
  },
  {
    id: 'electrochem-cell',
    title: 'Galvanic & Voltaic Cell Generator',
    description: 'Two-half-cell electrochemical apparatus with anode/cathode electrodes, salt bridge, electron flow arrow, and voltmeter.',
    tags: ['Electrochemistry', 'Voltaic Cell', 'Redox', 'Anode', 'Cathode'],
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
    <div className="flex flex-col gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto flex flex-col gap-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Chemistry figures for your tests and worksheets
        </h1>
        <p className="text-base sm:text-lg text-slate-600">
          Make clean, publication-grade chemistry and laboratory vector diagrams.
          Free, with high-DPI PNG clipboard copying and clean SVG downloads.
        </p>

        {/* Search Input */}
        <div className="mt-4 relative max-w-lg mx-auto w-full">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search figures, e.g. “lewis”, “particle”, “titration”, “meniscus”..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white shadow-sm text-sm focus:outline-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all"
          />
        </div>
      </div>

      {/* Grid of Diagrams */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((gen) => (
          <div
            key={gen.id}
            onClick={() => onSelectGenerator(gen.id)}
            className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md hover:border-emerald-400 transition-all cursor-pointer group"
          >
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-slate-900 text-lg group-hover:text-emerald-600 transition-colors">
                {gen.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {gen.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {gen.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-2 py-0.5 text-[11px] font-medium bg-slate-100 text-slate-600 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 group-hover:translate-x-0.5 transition-transform">
                <span>Open</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
