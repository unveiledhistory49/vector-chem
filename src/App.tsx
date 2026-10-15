import React, { useState, useEffect } from 'react';
import type { GeneratorKind } from './types/figures';
import { Navbar } from './components/Navbar';
import { Catalog } from './components/Catalog';

import { ParticleDiagram, defaultParticleDiagramState } from './generators/ParticleDiagram';
import { LewisStructure, defaultLewisStructureState } from './generators/LewisStructure';
import { BohrModel, defaultBohrModelState } from './generators/BohrModel';
import { HeatingCurve, defaultHeatingCurveState } from './generators/HeatingCurve';
import { TitrationCurve, defaultTitrationCurveState } from './generators/TitrationCurve';
import { GlasswareReading, defaultGlasswareReadingState } from './generators/GlasswareReading';
import { ElectrochemCell, defaultElectrochemCellState } from './generators/ElectrochemCell';

export const App: React.FC = () => {
  const [activeGenerator, setActiveGenerator] = useState<GeneratorKind | null>(() => {
    const params = new URLSearchParams(window.location.search);
    const fig = params.get('figure') as GeneratorKind | null;
    return fig || null;
  });

  const [particleState, setParticleState] = useState(defaultParticleDiagramState);
  const [lewisState, setLewisState] = useState(defaultLewisStructureState);
  const [bohrState, setBohrState] = useState(defaultBohrModelState);
  const [heatingState, setHeatingState] = useState(defaultHeatingCurveState);
  const [titrationState, setTitrationState] = useState(defaultTitrationCurveState);
  const [glasswareState, setGlasswareState] = useState(defaultGlasswareReadingState);
  const [electrochemState, setElectrochemState] = useState(defaultElectrochemCellState);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (activeGenerator) {
      params.set('figure', activeGenerator);
    } else {
      params.delete('figure');
    }
    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState({}, '', newUrl);
  }, [activeGenerator]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar
        activeGenerator={activeGenerator}
        onSelectGenerator={setActiveGenerator}
      />

      <main className="flex-1 flex flex-col">
        {activeGenerator === null ? (
          <Catalog onSelectGenerator={setActiveGenerator} />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex flex-col gap-6">
            <div className="flex items-center justify-between no-print border-b border-slate-200/80 pb-3">
              <button
                type="button"
                onClick={() => setActiveGenerator(null)}
                className="text-xs font-semibold text-blue-900 hover:text-blue-950 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200/80"
              >
                <span>←</span>
                <span>Back to all figures</span>
              </button>
              <span className="text-xs font-mono text-slate-600 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/60 hidden sm:inline-block">
                Studio Active
              </span>
            </div>

            {activeGenerator === 'particle-diagram' && (
              <ParticleDiagram state={particleState} onChange={setParticleState} />
            )}
            {activeGenerator === 'lewis-structure' && (
              <LewisStructure state={lewisState} onChange={setLewisState} />
            )}
            {activeGenerator === 'bohr-model' && (
              <BohrModel state={bohrState} onChange={setBohrState} />
            )}
            {activeGenerator === 'heating-curve' && (
              <HeatingCurve state={heatingState} onChange={setHeatingState} />
            )}
            {activeGenerator === 'titration-curve' && (
              <TitrationCurve state={titrationState} onChange={setTitrationState} />
            )}
            {activeGenerator === 'glassware-reading' && (
              <GlasswareReading state={glasswareState} onChange={setGlasswareState} />
            )}
            {activeGenerator === 'electrochem-cell' && (
              <ElectrochemCell state={electrochemState} onChange={setElectrochemState} />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 no-print">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-900 inline-block" />
            <span className="font-medium text-slate-700">Vector Chem</span>
            <span>— Precision STEM vector diagram studio for tests and worksheets.</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <a
              href="https://vector-physics.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 hover:text-emerald-700 transition-colors"
            >
              Vector Physics
            </a>
            <span className="text-slate-300">·</span>
            <a
              href="https://vector-math.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 hover:text-amber-600 transition-colors"
            >
              Vector Math
            </a>
            <span className="text-slate-300">·</span>
            <a
              href="https://github.com/unveiledhistory49/vector-chem"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
