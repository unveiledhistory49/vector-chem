import React, { useRef } from 'react';
import type { TitrationCurveState } from '../types/figures';
import { CanvasToolbar } from '../components/CanvasToolbar';
import { Slider } from '../components/Controls/Slider';
import { SegmentedControl } from '../components/Controls/SegmentedControl';
import { Checkbox } from '../components/Controls/Checkbox';

interface TitrationCurveProps {
  state: TitrationCurveState;
  onChange: (newState: TitrationCurveState) => void;
}

export const defaultTitrationCurveState: TitrationCurveState = {
  titrationType: 'weak-strong',
  initialPh: 2.8,
  eqVolume: 25,
  eqPh: 8.7,
  showEquivalencePoint: true,
  showBufferRegion: true,
  showHalfEqPoint: true,
  color: true,
};

export const TitrationCurve: React.FC<TitrationCurveProps> = ({ state, onChange }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // Canvas layout
  const originX = 80;
  const originY = 320;
  const plotW = 380;
  const plotH = 260;

  const maxVolume = 50;
  const maxPh = 14;

  const toPxX = (v: number) => originX + (v / maxVolume) * plotW;
  const toPxY = (ph: number) => originY - (ph / maxPh) * plotH;

  // Generate smooth sigmoid titration curve
  const steps = 60;
  const points: { x: number; y: number }[] = [];

  for (let i = 0; i <= steps; i++) {
    const vol = (maxVolume * i) / steps;
    // Logistic / tanh sigmoid model centered around eqVolume
    const diff = vol - state.eqVolume;
    let ph: number;

    if (state.titrationType === 'weak-strong') {
      // Weak acid titrated with strong base
      if (vol <= 0.1) {
        ph = state.initialPh;
      } else {
        const steepness = 0.55;
        const sigmoid = 1 / (1 + Math.exp(-steepness * diff));
        ph = state.initialPh + 1.2 + sigmoid * (12.5 - state.initialPh - 1.2);
        if (vol < state.eqVolume * 0.9) {
          // Flatten buffer region
          ph = 4.75 + Math.log10(Math.max(0.05, vol / (state.eqVolume - vol)));
        }
      }
    } else {
      // Strong acid / strong base
      const steepness = 0.8;
      const sigmoid = 1 / (1 + Math.exp(-steepness * diff));
      ph = 1.2 + sigmoid * (12.8 - 1.2);
    }

    ph = Math.max(0, Math.min(14, ph));
    points.push({ x: toPxX(vol), y: toPxY(ph) });
  }

  const pathD = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');

  const eqPxX = toPxX(state.eqVolume);
  const eqPxY = toPxY(state.eqPh);

  const halfEqV = state.eqVolume / 2;
  const halfEqPh = 4.75;
  const halfPxX = toPxX(halfEqV);
  const halfPxY = toPxY(halfEqPh);

  return (
    <div className="flex flex-col lg:flex-row items-start gap-8 w-full max-w-7xl mx-auto">
      {/* Visual Canvas - Sticky Studio Viewport */}
      <div className="flex-1 w-full flex flex-col items-center lg:sticky lg:top-24">
        <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden flex flex-col items-center">
          <CanvasToolbar
            svgRef={svgRef}
            filename="titration-curve"
            dimensions={{ width: 540, height: 380 }}
            onReset={() => onChange(defaultTitrationCurveState)}
          />

          <div className="w-full flex justify-center py-4 overflow-x-auto">
            <svg
              ref={svgRef}
              viewBox="0 0 540 380"
              className="w-full max-w-[540px] h-auto select-none"
              style={{ maxHeight: '400px' }}
            >
              <defs>
                <marker
                  id="tc-axis-arrow"
                  viewBox="0 0 10 10"
                  refX="5"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#1e293b" />
                </marker>
              </defs>

              {/* Buffer Region Shading */}
              {state.showBufferRegion && state.titrationType === 'weak-strong' && (
                <rect
                  x={toPxX(3)}
                  y={toPxY(6.5)}
                  width={toPxX(state.eqVolume * 0.85) - toPxX(3)}
                  height={toPxY(3.2) - toPxY(6.5)}
                  fill={state.color ? '#eff6ff' : '#f1f5f9'}
                  opacity="0.8"
                />
              )}

              {/* Axes */}
              {/* X Axis: Volume */}
              <line
                x1={originX}
                y1={originY}
                x2={originX + plotW}
                y2={originY}
                stroke="#1e293b"
                strokeWidth="2.5"
                markerEnd="url(#tc-axis-arrow)"
              />
              {/* Y Axis: pH */}
              <line
                x1={originX}
                y1={originY}
                x2={originX}
                y2={originY - plotH}
                stroke="#1e293b"
                strokeWidth="2.5"
                markerEnd="url(#tc-axis-arrow)"
              />

              {/* Axis Labels */}
              <text
                x={originX + plotW / 2}
                y={originY + 36}
                textAnchor="middle"
                fontSize="14"
                fontFamily="sans-serif"
                fontWeight="bold"
                fill="#334155"
              >
                Volume of Titrant (mL)
              </text>
              <text
                x={originX - 16}
                y={originY - plotH / 2}
                textAnchor="middle"
                fontSize="14"
                fontFamily="sans-serif"
                fontWeight="bold"
                fill="#334155"
                transform={`rotate(-90 ${originX - 16} ${originY - plotH / 2})`}
              >
                pH
              </text>

              {/* pH scale ticks: 0, 7, 14 */}
              {[0, 7, 14].map((ph) => (
                <g key={ph}>
                  <line
                    x1={originX - 5}
                    y1={toPxY(ph)}
                    x2={originX}
                    y2={toPxY(ph)}
                    stroke="#1e293b"
                    strokeWidth="1.5"
                  />
                  <text
                    x={originX - 10}
                    y={toPxY(ph) + 4}
                    fontSize="12"
                    fontFamily="sans-serif"
                    textAnchor="end"
                    fill="#64748b"
                  >
                    {ph}
                  </text>
                </g>
              ))}

              {/* Equivalence Point Guidelines */}
              {state.showEquivalencePoint && (
                <g stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,4">
                  <line x1={originX} y1={eqPxY} x2={eqPxX} y2={eqPxY} />
                  <line x1={eqPxX} y1={originY} x2={eqPxX} y2={eqPxY} />
                  <circle cx={eqPxX} cy={eqPxY} r="5" fill="#dc2626" stroke="#ffffff" strokeWidth="2" />
                  <text
                    x={eqPxX + 10}
                    y={eqPxY - 8}
                    fontSize="13"
                    fontFamily="sans-serif"
                    fontWeight="bold"
                    fill="#dc2626"
                  >
                    Equivalence Point (pH {state.eqPh})
                  </text>
                </g>
              )}

              {/* Half-Equivalence Point (pH = pKa) */}
              {state.showHalfEqPoint && state.titrationType === 'weak-strong' && (
                <g stroke="#2563eb" strokeWidth="1.5" strokeDasharray="3,3">
                  <line x1={originX} y1={halfPxY} x2={halfPxX} y2={halfPxY} />
                  <line x1={halfPxX} y1={originY} x2={halfPxX} y2={halfPxY} />
                  <circle cx={halfPxX} cy={halfPxY} r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
                  <text
                    x={halfPxX + 10}
                    y={halfPxY + 16}
                    fontSize="12"
                    fontFamily="sans-serif"
                    fontWeight="bold"
                    fill="#2563eb"
                  >
                    Half-Eq: pH = pKₐ ({halfEqPh})
                  </text>
                </g>
              )}

              {/* Titration Curve Line */}
              <path
                d={pathD}
                fill="none"
                stroke={state.color ? '#2563eb' : '#1e293b'}
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Control Sidebar */}
      <div className="w-full lg:w-96 flex flex-col gap-5 no-print">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4">
          <h3 className="font-semibold text-slate-900 text-sm border-b border-slate-100 pb-2">
            Titration System
          </h3>

          <SegmentedControl<TitrationCurveState['titrationType']>
            label="Acid-Base Pair"
            value={state.titrationType}
            options={[
              { value: 'weak-strong', label: 'Weak Acid + Strong Base' },
              { value: 'strong-strong', label: 'Strong Acid + Strong Base' },
            ]}
            onChange={(titrationType) =>
              onChange({
                ...state,
                titrationType,
                eqPh: titrationType === 'weak-strong' ? 8.7 : 7.0,
              })
            }
          />

          <Slider
            label="Equivalence Volume (V_eq)"
            value={state.eqVolume}
            min={15}
            max={35}
            step={1}
            unit="mL"
            onChange={(eqVolume) => onChange({ ...state, eqVolume })}
          />

          <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
            <Checkbox
              label="Highlight Equivalence Point"
              checked={state.showEquivalencePoint}
              onChange={(showEquivalencePoint) =>
                onChange({ ...state, showEquivalencePoint })
              }
            />
            {state.titrationType === 'weak-strong' && (
              <>
                <Checkbox
                  label="Show Half-Equivalence (pH = pKa)"
                  checked={state.showHalfEqPoint}
                  onChange={(showHalfEqPoint) =>
                    onChange({ ...state, showHalfEqPoint })
                  }
                />
                <Checkbox
                  label="Highlight Buffer Region"
                  checked={state.showBufferRegion}
                  onChange={(showBufferRegion) =>
                    onChange({ ...state, showBufferRegion })
                  }
                />
              </>
            )}
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
