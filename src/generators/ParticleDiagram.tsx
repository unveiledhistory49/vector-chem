import React, { useRef } from 'react';
import type { ParticleDiagramState } from '../types/figures';
import { CanvasToolbar } from '../components/CanvasToolbar';
import { SegmentedControl } from '../components/Controls/SegmentedControl';
import { Checkbox } from '../components/Controls/Checkbox';

interface ParticleDiagramProps {
  state: ParticleDiagramState;
  onChange: (newState: ParticleDiagramState) => void;
}

export const defaultParticleDiagramState: ParticleDiagramState = {
  phase: 'solid',
  composition: 'compound',
  count: 16,
  ratioA: 70,
  showVelocityTrails: true,
  color: true,
};

export const ParticleDiagram: React.FC<ParticleDiagramProps> = ({ state, onChange }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // Beaker / Box dimensions
  const boxX = 140;
  const boxY = 80;
  const boxW = 260;
  const boxH = 240;

  // Render particles based on phase & composition
  const renderParticles = () => {
    const particles = [];
    const colorA = state.color ? '#2563eb' : '#1e293b';
    const colorB = state.color ? '#ef4444' : '#64748b';

    if (state.phase === 'solid') {
      // Hexagonal / square close packed lattice at bottom
      const rows = 4;
      const cols = 5;
      const r = 16;
      const startX = boxX + 45;
      const startY = boxY + boxH - 24;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const px = startX + col * (r * 2.1) + (row % 2 === 1 ? r : 0);
          const py = startY - row * (r * 1.85);

          if (state.composition === 'compound') {
            // Big atom with two attached small atoms
            particles.push(
              <g key={`s-${row}-${col}`}>
                <circle cx={px} cy={py} r={r * 0.75} fill={colorA} stroke="#1e293b" strokeWidth="1.5" />
                <circle cx={px - 8} cy={py - 8} r={r * 0.45} fill={colorB} stroke="#1e293b" strokeWidth="1.2" />
                <circle cx={px + 8} cy={py - 8} r={r * 0.45} fill={colorB} stroke="#1e293b" strokeWidth="1.2" />
              </g>
            );
          } else if (state.composition === 'diatomic') {
            particles.push(
              <g key={`s-${row}-${col}`}>
                <circle cx={px - 6} cy={py} r={r * 0.65} fill={colorA} stroke="#1e293b" strokeWidth="1.5" />
                <circle cx={px + 6} cy={py} r={r * 0.65} fill={colorA} stroke="#1e293b" strokeWidth="1.5" />
              </g>
            );
          } else {
            particles.push(
              <circle
                key={`s-${row}-${col}`}
                cx={px}
                cy={py}
                r={r * 0.8}
                fill={colorA}
                stroke="#1e293b"
                strokeWidth="1.5"
              />
            );
          }
        }
      }
    } else if (state.phase === 'liquid') {
      // Disordered cluster at the bottom half
      const count = 18;
      const seedPoints = [
        { x: 30, y: 190 }, { x: 65, y: 210 }, { x: 100, y: 195 }, { x: 135, y: 215 },
        { x: 170, y: 200 }, { x: 205, y: 210 }, { x: 230, y: 195 }, { x: 45, y: 165 },
        { x: 80, y: 175 }, { x: 120, y: 160 }, { x: 155, y: 170 }, { x: 190, y: 160 },
        { x: 220, y: 170 }, { x: 60, y: 140 }, { x: 105, y: 135 }, { x: 145, y: 140 },
        { x: 180, y: 135 }, { x: 210, y: 140 }
      ];

      seedPoints.slice(0, count).forEach((pt, idx) => {
        const px = boxX + pt.x;
        const py = boxY + pt.y;
        if (state.composition === 'compound') {
          particles.push(
            <g key={`l-${idx}`}>
              <circle cx={px} cy={py} r="10" fill={colorA} stroke="#1e293b" strokeWidth="1.5" />
              <circle cx={px - 6} cy={py - 6} r="6" fill={colorB} stroke="#1e293b" strokeWidth="1" />
              <circle cx={px + 6} cy={py - 6} r="6" fill={colorB} stroke="#1e293b" strokeWidth="1" />
            </g>
          );
        } else if (state.composition === 'diatomic') {
          particles.push(
            <g key={`l-${idx}`}>
              <circle cx={px - 5} cy={py} r="8" fill={colorA} stroke="#1e293b" strokeWidth="1.5" />
              <circle cx={px + 5} cy={py} r="8" fill={colorA} stroke="#1e293b" strokeWidth="1.5" />
            </g>
          );
        } else {
          particles.push(
            <circle
              key={`l-${idx}`}
              cx={px}
              cy={py}
              r="10"
              fill={idx % 2 === 0 ? colorA : colorB}
              stroke="#1e293b"
              strokeWidth="1.5"
            />
          );
        }
      });
    } else {
      // Gas: dispersed throughout the entire container with velocity arrows
      const gasPoints = [
        { x: 40, y: 40, dx: 18, dy: -8 },
        { x: 130, y: 55, dx: -12, dy: 16 },
        { x: 210, y: 45, dx: 15, dy: 15 },
        { x: 75, y: 110, dx: -20, dy: -10 },
        { x: 180, y: 115, dx: 14, dy: -18 },
        { x: 50, y: 180, dx: 16, dy: 14 },
        { x: 130, y: 195, dx: -18, dy: 8 },
        { x: 220, y: 185, dx: -15, dy: -15 },
      ];

      gasPoints.forEach((pt, idx) => {
        const px = boxX + pt.x;
        const py = boxY + pt.y;

        particles.push(
          <g key={`g-${idx}`}>
            {state.showVelocityTrails && (
              <line
                x1={px}
                y1={py}
                x2={px + pt.dx}
                y2={py + pt.dy}
                stroke="#1e293b"
                strokeWidth="1.5"
                markerEnd="url(#chem-arrow)"
              />
            )}
            {state.composition === 'diatomic' ? (
              <g>
                <circle cx={px - 5} cy={py} r="7" fill={colorA} stroke="#1e293b" strokeWidth="1.5" />
                <circle cx={px + 5} cy={py} r="7" fill={colorA} stroke="#1e293b" strokeWidth="1.5" />
              </g>
            ) : (
              <circle
                cx={px}
                cy={py}
                r="9"
                fill={idx % 3 === 0 ? colorB : colorA}
                stroke="#1e293b"
                strokeWidth="1.5"
              />
            )}
          </g>
        );
      });
    }

    return particles;
  };

  return (
    <div className="flex flex-col lg:flex-row items-start gap-8 w-full max-w-7xl mx-auto">
      {/* Visual Canvas - Sticky Studio Viewport */}
      <div className="flex-1 w-full flex flex-col items-center lg:sticky lg:top-24">
        <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden flex flex-col items-center">
          <CanvasToolbar
            svgRef={svgRef}
            filename={`particle-diagram-${state.phase}`}
            dimensions={{ width: 540, height: 380 }}
            onReset={() => onChange(defaultParticleDiagramState)}
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
                  id="chem-arrow"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto"
                >
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#1e293b" />
                </marker>
              </defs>

              {/* Container Vessel (Beaker / Sealed Box) */}
              <rect
                x={boxX}
                y={boxY}
                width={boxW}
                height={boxH}
                fill={state.color ? '#f8fafc' : '#ffffff'}
                stroke="#1e293b"
                strokeWidth="3"
                rx="6"
              />

              {/* Render All Microscopic Particles */}
              {renderParticles()}

              {/* Vessel Label */}
              <text
                x={boxX + boxW / 2}
                y={boxY + boxH + 28}
                textAnchor="middle"
                fontSize="15"
                fontFamily="sans-serif"
                fontWeight="bold"
                fill="#334155"
              >
                {state.phase.toUpperCase()} — {state.composition.toUpperCase()}
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* Control Sidebar */}
      <div className="w-full lg:w-96 flex flex-col gap-5 no-print">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4">
          <h3 className="font-semibold text-slate-900 text-sm border-b border-slate-100 pb-2">
            Particle State of Matter
          </h3>

          <SegmentedControl<ParticleDiagramState['phase']>
            label="Phase"
            value={state.phase}
            options={[
              { value: 'solid', label: 'Solid' },
              { value: 'liquid', label: 'Liquid' },
              { value: 'gas', label: 'Gas' },
            ]}
            onChange={(phase) => onChange({ ...state, phase })}
          />

          <SegmentedControl<ParticleDiagramState['composition']>
            label="Species Model"
            value={state.composition}
            options={[
              { value: 'element', label: 'Element' },
              { value: 'diatomic', label: 'Diatomic' },
              { value: 'compound', label: 'Compound' },
            ]}
            onChange={(composition) => onChange({ ...state, composition })}
          />

          {state.phase === 'gas' && (
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
              <Checkbox
                label="Show velocity movement arrows"
                checked={state.showVelocityTrails}
                onChange={(showVelocityTrails) =>
                  onChange({ ...state, showVelocityTrails })
                }
              />
            </div>
          )}

          <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
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
