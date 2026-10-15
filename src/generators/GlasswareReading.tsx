import React, { useRef } from 'react';
import type { GlasswareReadingState } from '../types/figures';
import { CanvasToolbar } from '../components/CanvasToolbar';
import { Slider } from '../components/Controls/Slider';
import { SegmentedControl } from '../components/Controls/SegmentedControl';
import { Checkbox } from '../components/Controls/Checkbox';

interface GlasswareReadingProps {
  state: GlasswareReadingState;
  onChange: (newState: GlasswareReadingState) => void;
}

export const defaultGlasswareReadingState: GlasswareReadingState = {
  type: 'graduated-cylinder',
  currentValue: 36.4,
  minScale: 20,
  maxScale: 50,
  step: 5,
  subdivisions: 5,
  showMeniscus: true,
  color: true,
};

export const GlasswareReading: React.FC<GlasswareReadingProps> = ({ state, onChange }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const cx = 270;
  const topY = 70;
  const bottomY = 320;
  const tubeWidth = 60;
  const tubeH = bottomY - topY;

  const span = state.maxScale - state.minScale;

  // For cylinder: minScale is at bottom, maxScale is at top
  // For buret: minScale is at top, maxScale is at bottom
  const valToY = (val: number) => {
    if (state.type === 'buret') {
      return topY + ((val - state.minScale) / span) * tubeH;
    }
    return bottomY - ((val - state.minScale) / span) * tubeH;
  };

  const meniscusY = valToY(state.currentValue);

  // Tick generator
  const majorTicks: number[] = [];
  for (let v = state.minScale; v <= state.maxScale; v += state.step) {
    majorTicks.push(v);
  }

  const minorTicks: number[] = [];
  const minorStep = state.step / state.subdivisions;
  for (let v = state.minScale; v <= state.maxScale; v += minorStep) {
    if (!majorTicks.includes(v)) {
      minorTicks.push(v);
    }
  }

  return (
    <div className="flex flex-col lg:flex-row items-start gap-8 w-full max-w-7xl mx-auto">
      {/* Visual Canvas - Sticky Studio Viewport */}
      <div className="flex-1 w-full flex flex-col items-center lg:sticky lg:top-24">
        <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden flex flex-col items-center">
          <CanvasToolbar
            svgRef={svgRef}
            filename={`reading-${state.type}`}
            dimensions={{ width: 540, height: 380 }}
            onReset={() => onChange(defaultGlasswareReadingState)}
          />

          <div className="w-full flex justify-center py-4 overflow-x-auto">
            <svg
              ref={svgRef}
              viewBox="0 0 540 380"
              className="w-full max-w-[540px] h-auto select-none"
              style={{ maxHeight: '400px' }}
            >
              {/* Liquid Column */}
              <defs>
                <linearGradient id="liquid-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={state.color ? '#bfdbfe' : '#e2e8f0'} />
                  <stop offset="50%" stopColor={state.color ? '#93c5fd' : '#cbd5e1'} />
                  <stop offset="100%" stopColor={state.color ? '#bfdbfe' : '#e2e8f0'} />
                </linearGradient>
              </defs>

              {/* Liquid in tube */}
              <rect
                x={cx - tubeWidth / 2}
                y={meniscusY}
                width={tubeWidth}
                height={bottomY - meniscusY}
                fill="url(#liquid-grad)"
              />

              {/* Meniscus Curve */}
              {state.showMeniscus && (
                <path
                  d={`M ${cx - tubeWidth / 2} ${meniscusY - 4} Q ${cx} ${meniscusY + 6} ${cx + tubeWidth / 2} ${meniscusY - 4}`}
                  fill="none"
                  stroke={state.color ? '#1e3a8a' : '#1e293b'}
                  strokeWidth="2.5"
                />
              )}

              {/* Glass Tube Outer Outline */}
              <line
                x1={cx - tubeWidth / 2}
                y1={topY}
                x2={cx - tubeWidth / 2}
                y2={bottomY}
                stroke="#1e293b"
                strokeWidth="2.5"
              />
              <line
                x1={cx + tubeWidth / 2}
                y1={topY}
                x2={cx + tubeWidth / 2}
                y2={bottomY}
                stroke="#1e293b"
                strokeWidth="2.5"
              />
              <line
                x1={cx - tubeWidth / 2}
                y1={bottomY}
                x2={cx + tubeWidth / 2}
                y2={bottomY}
                stroke="#1e293b"
                strokeWidth="2.5"
              />

              {/* Base for cylinder */}
              {state.type === 'graduated-cylinder' && (
                <path
                  d={`M ${cx - 50} ${bottomY} L ${cx + 50} ${bottomY} L ${cx + 40} ${bottomY + 18} L ${cx - 40} ${bottomY + 18} Z`}
                  fill="#f1f5f9"
                  stroke="#1e293b"
                  strokeWidth="2.5"
                />
              )}

              {/* Graduation Ticks (Minor) */}
              {minorTicks.map((v) => {
                const y = valToY(v);
                return (
                  <line
                    key={`min-${v}`}
                    x1={cx - tubeWidth / 2}
                    y1={y}
                    x2={cx - tubeWidth / 2 + 10}
                    y2={y}
                    stroke="#1e293b"
                    strokeWidth="1.2"
                  />
                );
              })}

              {/* Graduation Ticks & Number Labels (Major) */}
              {majorTicks.map((v) => {
                const y = valToY(v);
                return (
                  <g key={`maj-${v}`}>
                    <line
                      x1={cx - tubeWidth / 2}
                      y1={y}
                      x2={cx - tubeWidth / 2 + 18}
                      y2={y}
                      stroke="#1e293b"
                      strokeWidth="2"
                    />
                    <text
                      x={cx - tubeWidth / 2 - 10}
                      y={y + 5}
                      textAnchor="end"
                      fontSize="14"
                      fontFamily="sans-serif"
                      fontWeight="bold"
                      fill="#1e293b"
                    >
                      {v}
                    </text>
                  </g>
                );
              })}

              {/* Reading Indicator Arrow */}
              <g>
                <line
                  x1={cx + tubeWidth / 2 + 45}
                  y1={meniscusY}
                  x2={cx + tubeWidth / 2 + 8}
                  y2={meniscusY}
                  stroke="#dc2626"
                  strokeWidth="2"
                />
                <polygon
                  points={`${cx + tubeWidth / 2 + 8},${meniscusY} ${cx + tubeWidth / 2 + 18},${meniscusY - 5} ${cx + tubeWidth / 2 + 18},${meniscusY + 5}`}
                  fill="#dc2626"
                />
                <text
                  x={cx + tubeWidth / 2 + 52}
                  y={meniscusY + 5}
                  fontSize="14"
                  fontFamily="sans-serif"
                  fontWeight="bold"
                  fill="#dc2626"
                >
                  {state.currentValue.toFixed(1)} mL
                </text>
              </g>

              {/* Instrument Header Label */}
              <text
                x={cx}
                y="360"
                textAnchor="middle"
                fontSize="15"
                fontFamily="sans-serif"
                fontWeight="bold"
                fill="#334155"
              >
                {state.type === 'buret' ? 'Buret (Top-Down Scale)' : 'Graduated Cylinder (Meniscus)'}
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* Control Sidebar */}
      <div className="w-full lg:w-96 flex flex-col gap-5 no-print">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4">
          <h3 className="font-semibold text-slate-900 text-sm border-b border-slate-100 pb-2">
            Glassware Instrument
          </h3>

          <SegmentedControl<GlasswareReadingState['type']>
            label="Instrument Type"
            value={state.type}
            options={[
              { value: 'graduated-cylinder', label: 'Cylinder' },
              { value: 'buret', label: 'Buret' },
            ]}
            onChange={(type) => onChange({ ...state, type })}
          />

          <Slider
            label="Liquid Level"
            value={state.currentValue}
            min={state.minScale + 2}
            max={state.maxScale - 2}
            step={0.1}
            unit="mL"
            onChange={(currentValue) => onChange({ ...state, currentValue })}
          />

          <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
            <Checkbox
              label="Render concave liquid meniscus"
              checked={state.showMeniscus}
              onChange={(showMeniscus) => onChange({ ...state, showMeniscus })}
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
