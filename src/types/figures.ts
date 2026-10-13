export type VectorNotation = 'none' | 'arrow' | 'bold';

export type LabelMode = 'text' | 'blank' | 'none';

export interface FormattedLabel {
  mode: LabelMode;
  text: string;
}

export type MatterPhase = 'solid' | 'liquid' | 'gas';
export type MatterComposition = 'element' | 'diatomic' | 'compound' | 'mixture';

export interface ParticleDiagramState {
  phase: MatterPhase;
  composition: MatterComposition;
  count: number;
  ratioA: number; // % of species A in mixture
  showVelocityTrails: boolean;
  color: boolean;
}

export interface LewisBond {
  position: 'top' | 'right' | 'bottom' | 'left';
  atom: string;
  type: 'single' | 'double' | 'triple';
  lonePairs: number;
}

export interface LewisStructureState {
  centralAtom: string;
  centralLonePairs: number;
  bonds: LewisBond[];
  charge: string;
  showBrackets: boolean;
  color: boolean;
}

export interface BohrModelState {
  elementSymbol: string;
  elementName: string;
  protons: number;
  neutrons: number;
  shells: number[]; // e.g. [2, 8, 1]
  showNucleusCounts: boolean;
  showShellLabels: boolean;
  color: boolean;
}

export interface HeatingCurveState {
  curveType: 'heating' | 'cooling';
  tm: number; // Melting temp
  tb: number; // Boiling temp
  showPhaseLabels: boolean;
  showPlateauMarkers: boolean;
  tempLabel: FormattedLabel;
  heatLabel: FormattedLabel;
  color: boolean;
}

export interface TitrationCurveState {
  titrationType: 'strong-strong' | 'weak-strong' | 'strong-weak';
  initialPh: number;
  eqVolume: number;
  eqPh: number;
  showEquivalencePoint: boolean;
  showBufferRegion: boolean;
  showHalfEqPoint: boolean;
  color: boolean;
}

export type GlasswareType = 'graduated-cylinder' | 'buret' | 'thermometer';

export interface GlasswareReadingState {
  type: GlasswareType;
  currentValue: number;
  minScale: number;
  maxScale: number;
  step: number;
  subdivisions: number;
  showMeniscus: boolean;
  color: boolean;
}

export interface ElectrochemCellState {
  anodeMetal: string;
  cathodeMetal: string;
  anodeIon: string;
  cathodeIon: string;
  showElectronFlow: boolean;
  showSaltBridge: boolean;
  voltage: string;
  color: boolean;
}

export type GeneratorKind =
  | 'particle-diagram'
  | 'lewis-structure'
  | 'bohr-model'
  | 'heating-curve'
  | 'titration-curve'
  | 'glassware-reading'
  | 'electrochem-cell';

export interface GeneratorMetadata {
  id: GeneratorKind;
  title: string;
  description: string;
  tags: string[];
}
