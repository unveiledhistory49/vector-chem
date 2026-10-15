import React, { useRef } from 'react';
import type { ElectrochemCellState } from '../types/figures';
import { CanvasToolbar } from '../components/CanvasToolbar';
import { Checkbox } from '../components/Controls/Checkbox';

interface ElectrochemCellProps {
  state: ElectrochemCellState;
  onChange: (newState: ElectrochemCellState) => void;
}

export const defaultElectrochemCellState: ElectrochemCellState = {
  anodeMetal: 'Zn',
  cathodeMetal: 'Cu',
  anodeIon: 'Zn²⁺',
  cathodeIon: 'Cu²⁺',
  showElectronFlow: true,
  showSaltBridge: true,
  voltage: '+1.10 V',
  color: true,
};

export const ElectrochemCell: React.FC<ElectrochemCellProps> = ({ state, onChange }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // Beaker dimensions
  const beakerW = 120;
  const beakerH = 140;
  const beakerY = 170;

  const anodeX = 90;
  const cathodeX = 330;

  // Electrode dimensions
  const elW = 24;
  const elH = 120;
  const elTopY = 130;

  return (
    <div className="flex flex-col lg:flex-row items-start gap-8 w-full max-w-7xl mx-auto">
      {/* Visual Canvas - Sticky Studio Viewport */}
      <div className="flex-1 w-full flex flex-col items-center lg:sticky lg:top-24">
        <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden flex flex-col items-center">
          <CanvasToolbar
            svgRef={svgRef}
            filename="galvanic-cell"
            dimensions={{ width: 540, height: 380 }}
            onReset={() => onChange(defaultElectrochemCellState)}
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
                  id="ec-arrow"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#dc2626" />
                </marker>
              </defs>

              {/* Anode Beaker Solution */}
              <rect
                x={anodeX}
                y={beakerY + 30}
                width={beakerW}
                height={beakerH - 30}
                fill={state.color ? '#f1f5f9' : '#ffffff'}
              />
              {/* Anode Beaker Glass Outline */}
              <path
                d={`M ${anodeX} ${beakerY} L ${anodeX} ${beakerY + beakerH} L ${anodeX + beakerW} ${beakerY + beakerH} L ${anodeX + beakerW} ${beakerY}`}
                fill="none"
                stroke="#1e293b"
                strokeWidth="2.5"
              />

              {/* Cathode Beaker Solution */}
              <rect
                x={cathodeX}
                y={beakerY + 30}
                width={beakerW}
                height={beakerH - 30}
                fill={state.color ? '#dbeafe' : '#ffffff'}
              />
              {/* Cathode Beaker Glass Outline */}
              <path
                d={`M ${cathodeX} ${beakerY} L ${cathodeX} ${beakerY + beakerH} L ${cathodeX + beakerW} ${beakerY + beakerH} L ${cathodeX + beakerW} ${beakerY}`}
                fill="none"
                stroke="#1e293b"
                strokeWidth="2.5"
              />

              {/* Anode Electrode (Zn) */}
              <rect
                x={anodeX + 30}
                y={elTopY}
                width={elW}
                height={elH}
                fill={state.color ? '#cbd5e1' : '#e2e8f0'}
                stroke="#1e293b"
                strokeWidth="2"
              />
              <text
                x={anodeX + 42}
                y={elTopY - 10}
                textAnchor="middle"
                fontSize="15"
                fontWeight="bold"
                fill="#1e293b"
              >
                {state.anodeMetal}
              </text>

              {/* Cathode Electrode (Cu) */}
              <rect
                x={cathodeX + beakerW - 30 - elW}
                y={elTopY}
                width={elW}
                height={elH}
                fill={state.color ? '#fdba74' : '#e2e8f0'}
                stroke="#1e293b"
                strokeWidth="2"
              />
              <text
                x={cathodeX + beakerW - 30 - elW / 2}
                y={elTopY - 10}
                textAnchor="middle"
                fontSize="15"
                fontWeight="bold"
                fill="#1e293b"
              >
                {state.cathodeMetal}
              </text>

              {/* Salt Bridge (Inverted U-tube) */}
              {state.showSaltBridge && (
                <g>
                  <path
                    d={`M ${anodeX + 80} ${beakerY + 90} L ${anodeX + 80} ${beakerY - 20} L ${cathodeX + 40} ${beakerY - 20} L ${cathodeX + 40} ${beakerY + 90}`}
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d={`M ${anodeX + 80} ${beakerY + 90} L ${anodeX + 80} ${beakerY - 20} L ${cathodeX + 40} ${beakerY - 20} L ${cathodeX + 40} ${beakerY + 90}`}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <text
                    x="270"
                    y={beakerY - 28}
                    textAnchor="middle"
                    fontSize="13"
                    fontFamily="sans-serif"
                    fontWeight="bold"
                    fill="#475569"
                  >
                    Salt Bridge (KNO₃)
                  </text>
                </g>
              )}

              {/* External Wire with Voltmeter */}
              {/* Wire from Anode to Voltmeter */}
              <path
                d={`M ${anodeX + 42} ${elTopY} L ${anodeX + 42} 60 L 245 60`}
                fill="none"
                stroke="#1e293b"
                strokeWidth="2"
              />
              {/* Wire from Cathode to Voltmeter */}
              <path
                d={`M ${cathodeX + beakerW - 30 - elW / 2} ${elTopY} L ${cathodeX + beakerW - 30 - elW / 2} 60 L 295 60`}
                fill="none"
                stroke="#1e293b"
                strokeWidth="2"
              />

              {/* Voltmeter Gauge Circle */}
              <circle cx="270" cy="60" r="24" fill="#ffffff" stroke="#1e293b" strokeWidth="2.5" />
              <text
                x="270"
                y="65"
                textAnchor="middle"
                fontSize="16"
                fontWeight="bold"
                fill="#1e293b"
              >
                V
              </text>
              <text
                x="270"
                y="30"
                textAnchor="middle"
                fontSize="14"
                fontWeight="bold"
                fill="#2563eb"
              >
                {state.voltage}
              </text>

              {/* Electron Flow Arrow (e-) */}
              {state.showElectronFlow && (
                <g>
                  <line
                    x1="160"
                    y1="45"
                    x2="210"
                    y2="45"
                    stroke="#dc2626"
                    strokeWidth="2"
                    markerEnd="url(#ec-arrow)"
                  />
                  <text
                    x="185"
                    y="38"
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="bold"
                    fill="#dc2626"
                  >
                    e⁻ flow
                  </text>
                </g>
              )}

              {/* Beaker Labels & Half-reactions */}
              {/* Anode */}
              <g fontSize="13" fontFamily="sans-serif" textAnchor="middle">
                <text x={anodeX + beakerW / 2} y={beakerY + beakerH + 24} fontWeight="bold" fill="#1e293b">
                  Anode (-) Oxidation
                </text>
                <text x={anodeX + beakerW / 2} y={beakerY + beakerH + 42} fill="#64748b">
                  {state.anodeMetal} → {state.anodeIon} + 2e⁻
                </text>
              </g>

              {/* Cathode */}
              <g fontSize="13" fontFamily="sans-serif" textAnchor="middle">
                <text x={cathodeX + beakerW / 2} y={beakerY + beakerH + 24} fontWeight="bold" fill="#1e293b">
                  Cathode (+) Reduction
                </text>
                <text x={cathodeX + beakerW / 2} y={beakerY + beakerH + 42} fill="#64748b">
                  {state.cathodeIon} + 2e⁻ → {state.cathodeMetal}
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Control Sidebar */}
      <div className="w-full lg:w-96 flex flex-col gap-5 no-print">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4">
          <h3 className="font-semibold text-slate-900 text-sm border-b border-slate-100 pb-2">
            Electrochemical Cell Setup
          </h3>

          <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
            <Checkbox
              label="Show electron flow vector (e⁻)"
              checked={state.showElectronFlow}
              onChange={(showElectronFlow) =>
                onChange({ ...state, showElectronFlow })
              }
            />
            <Checkbox
              label="Show salt bridge U-tube"
              checked={state.showSaltBridge}
              onChange={(showSaltBridge) =>
                onChange({ ...state, showSaltBridge })
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
