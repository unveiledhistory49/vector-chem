import React, { useRef } from 'react';
import type { HeatingCurveState } from '../types/figures';
import { CanvasToolbar } from '../components/CanvasToolbar';
import { Slider } from '../components/Controls/Slider';
import { Checkbox } from '../components/Controls/Checkbox';

interface HeatingCurveProps {
  state: HeatingCurveState;
  onChange: (newState: HeatingCurveState) => void;
}

export const defaultHeatingCurveState: HeatingCurveState = {
  curveType: 'heating',
  tm: 0,
  tb: 100,
  showPhaseLabels: true,
  showPlateauMarkers: true,
  tempLabel: { mode: 'text', text: 'Temperature (°C)' },
  heatLabel: { mode: 'text', text: 'Heat Added (kJ)' },
  color: true,
};

export const HeatingCurve: React.FC<HeatingCurveProps> = ({ state, onChange }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // Layout origin
  const originX = 90;
  const originY = 320;
  const axisW = 380;
  const axisH = 260;

  // Key coordinate milestones along the heating curve:
  // (x0, y0): start solid
  // (x1, y1): reaches Tm (solid -> melt)
  // (x2, y2): finishes melting (all liquid)
  // (x3, y3): reaches Tb (liquid -> boil)
  // (x4, y4): finishes boiling (all gas)
  // (x5, y5): superheated gas
  const x0 = originX;
  const y0 = originY - 20;

  const x1 = originX + 50;
  const y1 = originY - 80; // Tm

  const x2 = originX + 130;
  const y2 = y1;

  const x3 = originX + 200;
  const y3 = originY - 180; // Tb

  const x4 = originX + 320;
  const y4 = y3;

  const x5 = originX + 370;
  const y5 = originY - 240;

  return (
    <div className="flex flex-col lg:flex-row items-start gap-8 w-full max-w-7xl mx-auto">
      {/* Visual Canvas */}
      <div className="flex-1 w-full flex flex-col items-center">
        <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden p-6 flex flex-col items-center">
          <CanvasToolbar
            svgRef={svgRef}
            filename="heating-curve"
            onReset={() => onChange(defaultHeatingCurveState)}
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
                  id="hc-axis-arrow"
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

              {/* Axes */}
              {/* X Axis */}
              <line
                x1={originX}
                y1={originY}
                x2={originX + axisW}
                y2={originY}
                stroke="#1e293b"
                strokeWidth="2.5"
                markerEnd="url(#hc-axis-arrow)"
              />
              {/* Y Axis */}
              <line
                x1={originX}
                y1={originY}
                x2={originX}
                y2={originY - axisH}
                stroke="#1e293b"
                strokeWidth="2.5"
                markerEnd="url(#hc-axis-arrow)"
              />

              {/* Axis Labels */}
              <text
                x={originX + axisW / 2}
                y={originY + 36}
                textAnchor="middle"
                fontSize="15"
                fontFamily="sans-serif"
                fontWeight="bold"
                fill="#334155"
              >
                {state.heatLabel.text}
              </text>
              <text
                x={originX - 16}
                y={originY - axisH / 2}
                textAnchor="middle"
                fontSize="15"
                fontFamily="sans-serif"
                fontWeight="bold"
                fill="#334155"
                transform={`rotate(-90 ${originX - 16} ${originY - axisH / 2})`}
              >
                {state.tempLabel.text}
              </text>

              {/* Plateau Dotted Ticks on Y-axis */}
              {state.showPlateauMarkers && (
                <g stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,4">
                  {/* Tm guideline */}
                  <line x1={originX} y1={y1} x2={x2} y2={y1} />
                  <text
                    x={originX - 10}
                    y={y1 + 5}
                    fontSize="13"
                    fontFamily="sans-serif"
                    fontWeight="bold"
                    textAnchor="end"
                    fill="#2563eb"
                  >
                    T_m ({state.tm}°C)
                  </text>

                  {/* Tb guideline */}
                  <line x1={originX} y1={y3} x2={x4} y2={y3} />
                  <text
                    x={originX - 10}
                    y={y3 + 5}
                    fontSize="13"
                    fontFamily="sans-serif"
                    fontWeight="bold"
                    textAnchor="end"
                    fill="#dc2626"
                  >
                    T_b ({state.tb}°C)
                  </text>
                </g>
              )}

              {/* Heating Curve Segments */}
              <polyline
                points={`${x0},${y0} ${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4} ${x5},${y5}`}
                fill="none"
                stroke={state.color ? '#2563eb' : '#1e293b'}
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Phase Labels */}
              {state.showPhaseLabels && (
                <g fontSize="12" fontFamily="sans-serif" fontWeight="bold" fill="#475569" textAnchor="middle">
                  <text x={(x0 + x1) / 2 - 12} y={(y0 + y1) / 2 - 12}>
                    Solid
                  </text>
                  <text x={(x1 + x2) / 2} y={y1 - 10} fill="#2563eb">
                    Melting (S+L)
                  </text>
                  <text x={(x2 + x3) / 2 - 14} y={(y2 + y3) / 2 - 14}>
                    Liquid
                  </text>
                  <text x={(x3 + x4) / 2} y={y3 - 10} fill="#dc2626">
                    Boiling (L+G)
                  </text>
                  <text x={(x4 + x5) / 2 + 12} y={(y4 + y5) / 2 - 12}>
                    Gas
                  </text>
                </g>
              )}
            </svg>
          </div>
        </div>
      </div>

      {/* Control Sidebar */}
      <div className="w-full lg:w-96 flex flex-col gap-5 no-print">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4">
          <h3 className="font-semibold text-slate-900 text-sm border-b border-slate-100 pb-2">
            Temperature Milestones
          </h3>

          <Slider
            label="Melting Point (Tm)"
            value={state.tm}
            min={-50}
            max={80}
            step={5}
            unit="°C"
            onChange={(tm) => onChange({ ...state, tm })}
          />

          <Slider
            label="Boiling Point (Tb)"
            value={state.tb}
            min={state.tm + 20}
            max={200}
            step={5}
            unit="°C"
            onChange={(tb) => onChange({ ...state, tb })}
          />

          <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
            <Checkbox
              label="Show phase state annotations"
              checked={state.showPhaseLabels}
              onChange={(showPhaseLabels) =>
                onChange({ ...state, showPhaseLabels })
              }
            />
            <Checkbox
              label="Show Tm and Tb temperature guidelines"
              checked={state.showPlateauMarkers}
              onChange={(showPlateauMarkers) =>
                onChange({ ...state, showPlateauMarkers })
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
