import React from 'react';
import type { GeneratorKind } from '../types/figures';

export const FigurePreview: React.FC<{ kind: GeneratorKind }> = ({ kind }) => {
  switch (kind) {
    case 'particle-diagram':
      return (
        <svg
          viewBox="0 0 240 180"
          className="w-full h-full object-contain select-none"
          role="img"
          aria-label="Particle diagram preview"
        >
          <rect width="240" height="180" fill="#ffffff" />
          {/* Chamber Box */}
          <rect
            x="35"
            y="25"
            width="170"
            height="130"
            rx="4"
            fill="#f8fafc"
            stroke="#111827"
            strokeWidth="2.2"
          />

          {/* Diatomic and Gas Particles with motion trails */}
          {/* Particle 1 */}
          <circle cx="70" cy="65" r="9" fill="#1e3a8a" stroke="#111827" strokeWidth="1.5" />
          <path d="M 52 74 Q 60 70 63 67" fill="none" stroke="#64748b" strokeWidth="1.5" />

          {/* Particle 2 */}
          <circle cx="150" cy="55" r="9" fill="#1e3a8a" stroke="#111827" strokeWidth="1.5" />
          <path d="M 170 45 Q 162 48 158 52" fill="none" stroke="#64748b" strokeWidth="1.5" />

          {/* Diatomic Molecule 3 */}
          <g transform="translate(105, 110)">
            <circle cx="-6" cy="0" r="8" fill="#93c5fd" stroke="#111827" strokeWidth="1.5" />
            <circle cx="6" cy="0" r="8" fill="#1e3a8a" stroke="#111827" strokeWidth="1.5" />
            <path d="M -15 15 Q -5 10 -2 5" fill="none" stroke="#64748b" strokeWidth="1.5" />
          </g>

          {/* Diatomic Molecule 4 */}
          <g transform="translate(165, 115)">
            <circle cx="-6" cy="0" r="8" fill="#93c5fd" stroke="#111827" strokeWidth="1.5" />
            <circle cx="6" cy="0" r="8" fill="#1e3a8a" stroke="#111827" strokeWidth="1.5" />
            <path d="M 12 14 Q 5 10 2 5" fill="none" stroke="#64748b" strokeWidth="1.5" />
          </g>

          {/* Single Particle 5 */}
          <circle cx="65" cy="125" r="9" fill="#93c5fd" stroke="#111827" strokeWidth="1.5" />
          <path d="M 80 135 Q 73 130 69 128" fill="none" stroke="#64748b" strokeWidth="1.5" />
        </svg>
      );

    case 'lewis-structure':
      return (
        <svg
          viewBox="0 0 240 180"
          className="w-full h-full object-contain select-none"
          role="img"
          aria-label="Lewis structure preview"
        >
          <rect width="240" height="180" fill="#ffffff" />
          {/* Central Oxygen */}
          <text
            x="120"
            y="98"
            textAnchor="middle"
            fontFamily="'Times New Roman', Times, serif"
            fontSize="32"
            fontWeight="bold"
            fill="#111827"
          >
            O
          </text>

          {/* Top Lone Pairs */}
          <circle cx="112" cy="62" r="2.5" fill="#111827" />
          <circle cx="128" cy="62" r="2.5" fill="#111827" />

          {/* Right Lone Pairs */}
          <circle cx="148" cy="85" r="2.5" fill="#111827" />
          <circle cx="148" cy="99" r="2.5" fill="#111827" />

          {/* Single bond to left Hydrogen */}
          <line x1="102" y1="92" x2="68" y2="92" stroke="#111827" strokeWidth="2.2" />
          <text
            x="52"
            y="98"
            textAnchor="middle"
            fontFamily="'Times New Roman', Times, serif"
            fontSize="26"
            fontWeight="bold"
            fill="#111827"
          >
            H
          </text>

          {/* Single bond to bottom Hydrogen */}
          <line x1="120" y1="106" x2="120" y2="135" stroke="#111827" strokeWidth="2.2" />
          <text
            x="120"
            y="158"
            textAnchor="middle"
            fontFamily="'Times New Roman', Times, serif"
            fontSize="26"
            fontWeight="bold"
            fill="#111827"
          >
            H
          </text>
        </svg>
      );

    case 'bohr-model':
      return (
        <svg
          viewBox="0 0 240 180"
          className="w-full h-full object-contain select-none"
          role="img"
          aria-label="Bohr model preview"
        >
          <rect width="240" height="180" fill="#ffffff" />
          {/* Energy Shell 1 (K shell) */}
          <circle
            cx="120"
            cy="90"
            r="38"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          {/* Energy Shell 2 (L shell) */}
          <circle
            cx="120"
            cy="90"
            r="65"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />

          {/* Central Nucleus */}
          <circle cx="120" cy="90" r="18" fill="#1e3a8a" stroke="#111827" strokeWidth="2" />
          <text
            x="120"
            y="94"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize="11"
            fontWeight="bold"
            fill="#ffffff"
          >
            +6
          </text>

          {/* Electrons on Shell 1 (2 electrons) */}
          <circle cx="120" cy="52" r="3.5" fill="#2563eb" stroke="#111827" strokeWidth="1" />
          <circle cx="120" cy="128" r="3.5" fill="#2563eb" stroke="#111827" strokeWidth="1" />

          {/* Electrons on Shell 2 (4 electrons for Carbon) */}
          <circle cx="120" cy="25" r="3.5" fill="#2563eb" stroke="#111827" strokeWidth="1" />
          <circle cx="120" cy="155" r="3.5" fill="#2563eb" stroke="#111827" strokeWidth="1" />
          <circle cx="55" cy="90" r="3.5" fill="#2563eb" stroke="#111827" strokeWidth="1" />
          <circle cx="185" cy="90" r="3.5" fill="#2563eb" stroke="#111827" strokeWidth="1" />
        </svg>
      );

    case 'heating-curve':
      return (
        <svg
          viewBox="0 0 240 180"
          className="w-full h-full object-contain select-none"
          role="img"
          aria-label="Heating curve preview"
        >
          <rect width="240" height="180" fill="#ffffff" />
          {/* Grid lines */}
          <g stroke="#e2e8f0" strokeWidth="1">
            <line x1="35" y1="115" x2="215" y2="115" strokeDasharray="3 3" />
            <line x1="35" y1="65" x2="215" y2="65" strokeDasharray="3 3" />
          </g>

          {/* Axes */}
          <line x1="35" y1="145" x2="220" y2="145" stroke="#111827" strokeWidth="2" />
          <polygon points="220,145 213,142 213,148" fill="#111827" />
          <line x1="35" y1="145" x2="35" y2="25" stroke="#111827" strokeWidth="2" />
          <polygon points="35,25 32,32 38,32" fill="#111827" />

          <text x="212" y="158" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="#111827">Heat</text>
          <text x="42" y="28" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="#111827">T (°C)</text>

          {/* Heating Curve Segments: Solid -> Melt -> Liquid -> Boil -> Gas */}
          <path
            d="M 35 145 L 65 115 L 105 115 L 140 65 L 185 65 L 210 35"
            fill="none"
            stroke="#1d4ed8"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Plateau markers */}
          <text x="85" y="108" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">Melting</text>
          <text x="162" y="58" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">Boiling</text>
        </svg>
      );

    case 'titration-curve':
      return (
        <svg
          viewBox="0 0 240 180"
          className="w-full h-full object-contain select-none"
          role="img"
          aria-label="Titration curve preview"
        >
          <rect width="240" height="180" fill="#ffffff" />
          {/* Axes */}
          <line x1="35" y1="145" x2="220" y2="145" stroke="#111827" strokeWidth="2" />
          <polygon points="220,145 213,142 213,148" fill="#111827" />
          <line x1="35" y1="145" x2="35" y2="25" stroke="#111827" strokeWidth="2" />
          <polygon points="35,25 32,32 38,32" fill="#111827" />

          <text x="195" y="158" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="#111827">V_titrant</text>
          <text x="42" y="28" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="#111827">pH</text>

          {/* Equivalence point pH 7 dashed line */}
          <line x1="35" y1="85" x2="125" y2="85" stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="3 3" />
          <line x1="125" y1="145" x2="125" y2="85" stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="3 3" />

          {/* Sigmoidal Titration Curve */}
          <path
            d="M 35 130 C 80 128, 110 115, 125 85 C 140 55, 170 42, 215 40"
            fill="none"
            stroke="#1d4ed8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Equivalence Point circle */}
          <circle cx="125" cy="85" r="3.5" fill="#dc2626" />
          <text x="135" y="88" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="#dc2626">Eq. Point</text>
        </svg>
      );

    case 'glassware-reading':
      return (
        <svg
          viewBox="0 0 240 180"
          className="w-full h-full object-contain select-none"
          role="img"
          aria-label="Glassware reading preview"
        >
          <rect width="240" height="180" fill="#ffffff" />
          {/* Cylinder Column */}
          <rect
            x="95"
            y="25"
            width="50"
            height="130"
            rx="4"
            fill="#ffffff"
            stroke="#111827"
            strokeWidth="2.2"
          />

          {/* Liquid Fill */}
          <path
            d="M 96 85 Q 120 92 144 85 L 144 153 A 2 2 0 0 1 142 154 L 98 154 A 2 2 0 0 1 96 153 Z"
            fill="#bfdbfe"
            fillOpacity="0.6"
          />

          {/* Meniscus Curve */}
          <path
            d="M 96 85 Q 120 92 144 85"
            fill="none"
            stroke="#1d4ed8"
            strokeWidth="2"
          />

          {/* Graduations */}
          {Array.from({ length: 9 }).map((_, i) => (
            <g key={i}>
              <line
                x1="96"
                y1={45 + i * 12}
                x2={i % 2 === 0 ? 112 : 106}
                y2={45 + i * 12}
                stroke="#111827"
                strokeWidth={i % 2 === 0 ? 1.5 : 1}
              />
              {i % 2 === 0 && (
                <text
                  x="88"
                  y={48 + i * 12}
                  textAnchor="end"
                  fontFamily="Arial, sans-serif"
                  fontSize="8"
                  fill="#475569"
                >
                  {50 - i * 5}
                </text>
              )}
            </g>
          ))}
        </svg>
      );

    case 'electrochem-cell':
      return (
        <svg
          viewBox="0 0 240 180"
          className="w-full h-full object-contain select-none"
          role="img"
          aria-label="Electrochemical cell preview"
        >
          <rect width="240" height="180" fill="#ffffff" />
          {/* Left Beaker (Anode) */}
          <rect x="35" y="80" width="60" height="65" rx="3" fill="#f8fafc" stroke="#111827" strokeWidth="2" />
          <rect x="36" y="98" width="58" height="46" rx="2" fill="#bfdbfe" fillOpacity="0.4" />
          {/* Anode plate */}
          <rect x="48" y="65" width="12" height="60" fill="#94a3b8" stroke="#111827" strokeWidth="1.5" />
          <text x="54" y="60" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="#111827">Zn</text>

          {/* Right Beaker (Cathode) */}
          <rect x="145" y="80" width="60" height="65" rx="3" fill="#f8fafc" stroke="#111827" strokeWidth="2" />
          <rect x="146" y="98" width="58" height="46" rx="2" fill="#fed7aa" fillOpacity="0.4" />
          {/* Cathode plate */}
          <rect x="180" y="65" width="12" height="60" fill="#ea580c" stroke="#111827" strokeWidth="1.5" />
          <text x="186" y="60" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="#111827">Cu</text>

          {/* Salt Bridge (Inverted U-tube) */}
          <path
            d="M 80 115 L 80 82 A 12 12 0 0 1 92 70 L 148 70 A 12 12 0 0 1 160 82 L 160 115"
            fill="none"
            stroke="#64748b"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Connecting Wire & Voltmeter */}
          <polyline points="54,65 54,35 110,35" fill="none" stroke="#111827" strokeWidth="1.8" />
          <polyline points="130,35 186,35 186,65" fill="none" stroke="#111827" strokeWidth="1.8" />
          <circle cx="120" cy="35" r="10" fill="#ffffff" stroke="#111827" strokeWidth="1.8" />
          <text x="120" y="39" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="#111827">V</text>
        </svg>
      );

    default:
      return null;
  }
};
