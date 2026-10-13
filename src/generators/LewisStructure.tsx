import React, { useRef } from 'react';
import type { LewisStructureState } from '../types/figures';
import { CanvasToolbar } from '../components/CanvasToolbar';
import { SegmentedControl } from '../components/Controls/SegmentedControl';
import { Checkbox } from '../components/Controls/Checkbox';

interface LewisStructureProps {
  state: LewisStructureState;
  onChange: (newState: LewisStructureState) => void;
}

export const defaultLewisStructureState: LewisStructureState = {
  centralAtom: 'O',
  centralLonePairs: 2,
  bonds: [
    { position: 'bottom', atom: 'H', type: 'single', lonePairs: 0 },
    { position: 'right', atom: 'H', type: 'single', lonePairs: 0 },
  ],
  charge: '',
  showBrackets: false,
  color: true,
};

export const PRESETS: { [name: string]: LewisStructureState } = {
  water: {
    centralAtom: 'O',
    centralLonePairs: 2,
    bonds: [
      { position: 'left', atom: 'H', type: 'single', lonePairs: 0 },
      { position: 'bottom', atom: 'H', type: 'single', lonePairs: 0 },
    ],
    charge: '',
    showBrackets: false,
    color: true,
  },
  carbonDioxide: {
    centralAtom: 'C',
    centralLonePairs: 0,
    bonds: [
      { position: 'left', atom: 'O', type: 'double', lonePairs: 2 },
      { position: 'right', atom: 'O', type: 'double', lonePairs: 2 },
    ],
    charge: '',
    showBrackets: false,
    color: true,
  },
  ammonia: {
    centralAtom: 'N',
    centralLonePairs: 1,
    bonds: [
      { position: 'left', atom: 'H', type: 'single', lonePairs: 0 },
      { position: 'bottom', atom: 'H', type: 'single', lonePairs: 0 },
      { position: 'right', atom: 'H', type: 'single', lonePairs: 0 },
    ],
    charge: '',
    showBrackets: false,
    color: true,
  },
  methane: {
    centralAtom: 'C',
    centralLonePairs: 0,
    bonds: [
      { position: 'top', atom: 'H', type: 'single', lonePairs: 0 },
      { position: 'right', atom: 'H', type: 'single', lonePairs: 0 },
      { position: 'bottom', atom: 'H', type: 'single', lonePairs: 0 },
      { position: 'left', atom: 'H', type: 'single', lonePairs: 0 },
    ],
    charge: '',
    showBrackets: false,
    color: true,
  },
  ammonium: {
    centralAtom: 'N',
    centralLonePairs: 0,
    bonds: [
      { position: 'top', atom: 'H', type: 'single', lonePairs: 0 },
      { position: 'right', atom: 'H', type: 'single', lonePairs: 0 },
      { position: 'bottom', atom: 'H', type: 'single', lonePairs: 0 },
      { position: 'left', atom: 'H', type: 'single', lonePairs: 0 },
    ],
    charge: '+',
    showBrackets: true,
    color: true,
  },
};

export const LewisStructure: React.FC<LewisStructureProps> = ({ state, onChange }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const cx = 270;
  const cy = 200;
  const bondLength = 65;

  // Render a bond between (x1, y1) and (x2, y2)
  const renderBond = (
    pos: 'top' | 'right' | 'bottom' | 'left',
    type: 'single' | 'double' | 'triple'
  ) => {
    let x1 = cx;
    let y1 = cy;
    let x2 = cx;
    let y2 = cy;

    const offsetAtom = 22;
    const endAtom = bondLength - 20;

    if (pos === 'top') {
      y1 -= offsetAtom;
      y2 -= endAtom;
    } else if (pos === 'bottom') {
      y1 += offsetAtom;
      y2 += endAtom;
    } else if (pos === 'right') {
      x1 += offsetAtom;
      x2 += endAtom;
    } else if (pos === 'left') {
      x1 -= offsetAtom;
      x2 -= endAtom;
    }

    if (type === 'single') {
      return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1e293b" strokeWidth="2.5" />;
    } else if (type === 'double') {
      const isVert = pos === 'top' || pos === 'bottom';
      const dx = isVert ? 3.5 : 0;
      const dy = isVert ? 0 : 3.5;
      return (
        <g stroke="#1e293b" strokeWidth="2">
          <line x1={x1 - dx} y1={y1 - dy} x2={x2 - dx} y2={y2 - dy} />
          <line x1={x1 + dx} y1={y1 + dy} x2={x2 + dx} y2={y2 + dy} />
        </g>
      );
    } else {
      const isVert = pos === 'top' || pos === 'bottom';
      const dx = isVert ? 5 : 0;
      const dy = isVert ? 0 : 5;
      return (
        <g stroke="#1e293b" strokeWidth="2">
          <line x1={x1 - dx} y1={y1 - dy} x2={x2 - dx} y2={y2 - dy} />
          <line x1={x1} y1={y1} x2={x2} y2={y2} />
          <line x1={x1 + dx} y1={y1 + dy} x2={x2 + dx} y2={y2 + dy} />
        </g>
      );
    }
  };

  // Get terminal atom coordinate
  const getAtomPos = (pos: 'top' | 'right' | 'bottom' | 'left') => {
    switch (pos) {
      case 'top':
        return { x: cx, y: cy - bondLength };
      case 'bottom':
        return { x: cx, y: cy + bondLength };
      case 'right':
        return { x: cx + bondLength, y: cy };
      case 'left':
        return { x: cx - bondLength, y: cy };
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-start gap-8 w-full max-w-7xl mx-auto">
      {/* Visual Canvas */}
      <div className="flex-1 w-full flex flex-col items-center">
        <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden p-6 flex flex-col items-center">
          <CanvasToolbar
            svgRef={svgRef}
            filename={`lewis-${state.centralAtom.toLowerCase()}`}
            onReset={() => onChange(defaultLewisStructureState)}
          />

          <div className="w-full flex justify-center py-4 overflow-x-auto">
            <svg
              ref={svgRef}
              viewBox="0 0 540 400"
              className="w-full max-w-[540px] h-auto select-none"
              style={{ maxHeight: '420px' }}
            >
              {/* Bracket Notation for Polyatomic Ions */}
              {state.showBrackets && (
                <g stroke="#1e293b" strokeWidth="2.5" fill="none">
                  {/* Left bracket [ */}
                  <path d="M 170 100 L 150 100 L 150 300 L 170 300" />
                  {/* Right bracket ] */}
                  <path d="M 370 100 L 390 100 L 390 300 L 370 300" />
                  {/* Charge superscript */}
                  {state.charge && (
                    <text
                      x="400"
                      y="110"
                      fontSize="22"
                      fontWeight="bold"
                      fontFamily="sans-serif"
                      fill="#1e293b"
                    >
                      {state.charge}
                    </text>
                  )}
                </g>
              )}

              {/* Central Atom */}
              <text
                x={cx}
                y={cy + 8}
                textAnchor="middle"
                fontSize="28"
                fontFamily="sans-serif"
                fontWeight="bold"
                fill={state.color ? '#1e293b' : '#000000'}
              >
                {state.centralAtom}
              </text>

              {/* Central Atom Lone Pairs */}
              {state.centralLonePairs >= 1 && (
                <g fill="#1e293b">
                  {/* Top lone pair */}
                  <circle cx={cx - 5} cy={cy - 22} r="2.5" />
                  <circle cx={cx + 5} cy={cy - 22} r="2.5" />
                </g>
              )}
              {state.centralLonePairs >= 2 && (
                <g fill="#1e293b">
                  {/* Left or bottom lone pair */}
                  <circle cx={cx - 24} cy={cy - 5} r="2.5" />
                  <circle cx={cx - 24} cy={cy + 5} r="2.5" />
                </g>
              )}

              {/* Bond Lines and Terminal Atoms */}
              {state.bonds.map((b, idx) => {
                const atomCoord = getAtomPos(b.position);
                return (
                  <g key={idx}>
                    {renderBond(b.position, b.type)}
                    <text
                      x={atomCoord.x}
                      y={atomCoord.y + 8}
                      textAnchor="middle"
                      fontSize="28"
                      fontFamily="sans-serif"
                      fontWeight="bold"
                      fill={state.color ? '#2563eb' : '#000000'}
                    >
                      {b.atom}
                    </text>
                    {/* Terminal Atom Lone Pairs */}
                    {b.lonePairs >= 2 && (
                      <g fill="#1e293b">
                        <circle cx={atomCoord.x + 18} cy={atomCoord.y - 4} r="2" />
                        <circle cx={atomCoord.x + 18} cy={atomCoord.y + 6} r="2" />
                        <circle cx={atomCoord.x} cy={atomCoord.y - 18} r="2" />
                        <circle cx={atomCoord.x} cy={atomCoord.y + 20} r="2" />
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* Control Sidebar */}
      <div className="w-full lg:w-96 flex flex-col gap-5 no-print">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4">
          <h3 className="font-semibold text-slate-900 text-sm border-b border-slate-100 pb-2">
            Molecules & Ions
          </h3>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onChange(PRESETS.water)}
              className="px-3 py-1.5 text-xs font-semibold bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
            >
              H₂O
            </button>
            <button
              type="button"
              onClick={() => onChange(PRESETS.carbonDioxide)}
              className="px-3 py-1.5 text-xs font-semibold bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
            >
              CO₂
            </button>
            <button
              type="button"
              onClick={() => onChange(PRESETS.ammonia)}
              className="px-3 py-1.5 text-xs font-semibold bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
            >
              NH₃
            </button>
            <button
              type="button"
              onClick={() => onChange(PRESETS.methane)}
              className="px-3 py-1.5 text-xs font-semibold bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
            >
              CH₄
            </button>
            <button
              type="button"
              onClick={() => onChange(PRESETS.ammonium)}
              className="px-3 py-1.5 text-xs font-semibold bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
            >
              [NH₄]⁺
            </button>
          </div>

          <SegmentedControl<number>
            label="Central Lone Pairs"
            value={state.centralLonePairs}
            options={[
              { value: 0, label: '0 pairs' },
              { value: 1, label: '1 pair' },
              { value: 2, label: '2 pairs' },
            ]}
            onChange={(centralLonePairs) => onChange({ ...state, centralLonePairs })}
          />

          <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
            <Checkbox
              label="Polyatomic bracket notation [ ... ]"
              checked={state.showBrackets}
              onChange={(showBrackets) => onChange({ ...state, showBrackets })}
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
