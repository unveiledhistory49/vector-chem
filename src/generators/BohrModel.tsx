import React, { useRef } from 'react';
import type { BohrModelState } from '../types/figures';
import { CanvasToolbar } from '../components/CanvasToolbar';
import { Checkbox } from '../components/Controls/Checkbox';
import { polarToCartesian } from '../engine/math';

interface BohrModelProps {
  state: BohrModelState;
  onChange: (newState: BohrModelState) => void;
}

export const defaultBohrModelState: BohrModelState = {
  elementSymbol: 'Na',
  elementName: 'Sodium',
  protons: 11,
  neutrons: 12,
  shells: [2, 8, 1],
  showNucleusCounts: true,
  showShellLabels: true,
  color: true,
};

export const ELEMENTS_PRESETS: { [sym: string]: BohrModelState } = {
  H: {
    elementSymbol: 'H',
    elementName: 'Hydrogen',
    protons: 1,
    neutrons: 0,
    shells: [1],
    showNucleusCounts: true,
    showShellLabels: true,
    color: true,
  },
  C: {
    elementSymbol: 'C',
    elementName: 'Carbon',
    protons: 6,
    neutrons: 6,
    shells: [2, 4],
    showNucleusCounts: true,
    showShellLabels: true,
    color: true,
  },
  O: {
    elementSymbol: 'O',
    elementName: 'Oxygen',
    protons: 8,
    neutrons: 8,
    shells: [2, 6],
    showNucleusCounts: true,
    showShellLabels: true,
    color: true,
  },
  Na: {
    elementSymbol: 'Na',
    elementName: 'Sodium',
    protons: 11,
    neutrons: 12,
    shells: [2, 8, 1],
    showNucleusCounts: true,
    showShellLabels: true,
    color: true,
  },
  Cl: {
    elementSymbol: 'Cl',
    elementName: 'Chlorine',
    protons: 17,
    neutrons: 18,
    shells: [2, 8, 7],
    showNucleusCounts: true,
    showShellLabels: true,
    color: true,
  },
};

export const BohrModel: React.FC<BohrModelProps> = ({ state, onChange }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const cx = 270;
  const cy = 200;
  const nucleusRadius = 38;
  const baseShellRadius = 65;
  const shellStep = 38;

  return (
    <div className="flex flex-col lg:flex-row items-start gap-8 w-full max-w-7xl mx-auto">
      {/* Visual Canvas - Sticky Studio Viewport */}
      <div className="flex-1 w-full flex flex-col items-center lg:sticky lg:top-24">
        <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden flex flex-col items-center">
          <CanvasToolbar
            svgRef={svgRef}
            filename={`bohr-${state.elementSymbol.toLowerCase()}`}
            dimensions={{ width: 540, height: 400 }}
            onReset={() => onChange(defaultBohrModelState)}
          />

          <div className="w-full flex justify-center py-4 overflow-x-auto">
            <svg
              ref={svgRef}
              viewBox="0 0 540 400"
              className="w-full max-w-[540px] h-auto select-none"
              style={{ maxHeight: '420px' }}
            >
              {/* Concentric Electron Orbit Shells */}
              {state.shells.map((count, shellIdx) => {
                const r = baseShellRadius + shellIdx * shellStep;
                const shellLabels = ['n=1 (K)', 'n=2 (L)', 'n=3 (M)', 'n=4 (N)'];

                return (
                  <g key={shellIdx}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={r}
                      fill="none"
                      stroke="#94a3b8"
                      strokeWidth="1.5"
                      strokeDasharray="4,4"
                    />

                    {/* Shell Label */}
                    {state.showShellLabels && (
                      <text
                        x={cx + r + 4}
                        y={cy - 4}
                        fontSize="11"
                        fontFamily="sans-serif"
                        fill="#64748b"
                      >
                        {shellLabels[shellIdx] || `n=${shellIdx + 1}`}
                      </text>
                    )}

                    {/* Electrons on Shell */}
                    {Array.from({ length: count }).map((_, eIdx) => {
                      const angle = (360 / count) * eIdx;
                      const pt = polarToCartesian(cx, cy, r, angle);

                      return (
                        <g key={eIdx}>
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r="5"
                            fill={state.color ? '#1e3a8a' : '#1e293b'}
                            stroke="#ffffff"
                            strokeWidth="1.5"
                          />
                        </g>
                      );
                    })}
                  </g>
                );
              })}

              {/* Central Nucleus */}
              <circle
                cx={cx}
                cy={cy}
                r={nucleusRadius}
                fill={state.color ? '#fee2e2' : '#f1f5f9'}
                stroke="#1e293b"
                strokeWidth="2.5"
              />

              {/* Nucleus Content: Symbol & Counts */}
              <text
                x={cx}
                y={state.showNucleusCounts ? cy - 8 : cy + 8}
                textAnchor="middle"
                fontSize="22"
                fontFamily="sans-serif"
                fontWeight="bold"
                fill="#1e293b"
              >
                {state.elementSymbol}
              </text>

              {state.showNucleusCounts && (
                <g fontSize="11" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">
                  <text x={cx} y={cy + 8} fill="#dc2626">
                    {state.protons}p⁺
                  </text>
                  <text x={cx} y={cy + 22} fill="#475569">
                    {state.neutrons}n⁰
                  </text>
                </g>
              )}

              {/* Title / Caption */}
              <text
                x={cx}
                y="380"
                textAnchor="middle"
                fontSize="15"
                fontFamily="sans-serif"
                fontWeight="bold"
                fill="#334155"
              >
                {state.elementName} Atom ({state.elementSymbol}) — Shells: [
                {state.shells.join(', ')}]
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* Control Sidebar */}
      <div className="w-full lg:w-96 flex flex-col gap-5 no-print">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4">
          <h3 className="font-semibold text-slate-900 text-sm border-b border-slate-100 pb-2">
            Element Selection
          </h3>

          <div className="flex flex-wrap gap-2">
            {Object.entries(ELEMENTS_PRESETS).map(([sym, preset]) => (
              <button
                key={sym}
                type="button"
                onClick={() => onChange(preset)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  state.elementSymbol === sym
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {preset.elementName} ({sym})
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
            <Checkbox
              label="Show proton/neutron counts in nucleus"
              checked={state.showNucleusCounts}
              onChange={(showNucleusCounts) =>
                onChange({ ...state, showNucleusCounts })
              }
            />
            <Checkbox
              label="Show energy level shell labels (n=1, n=2...)"
              checked={state.showShellLabels}
              onChange={(showShellLabels) =>
                onChange({ ...state, showShellLabels })
              }
            />
            <Checkbox
              label="Enable textbook color accents"
              checked={state.color}
              onChange={(color) => onChange({ ...state, color })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
