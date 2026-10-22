export type SystemId =
  | 'skeletal' | 'muscular' | 'nervous' | 'cardiovascular' | 'respiratory' | 'digestive'
  | 'urinary' | 'reproductive' | 'endocrine' | 'lymphatic' | 'integumentary';

export type Mode = 'realistic' | 'educational';

/** Which reference body: male = BodyParts3D, female = Human Reference Atlas (Visible Human Female). */
export type Body = 'male' | 'female';

export type LayerId = 'skin' | 'muscles-superficial' | 'muscles-deep' | 'skeleton' | 'organs' | 'vessels' | 'nervous';

export type Side = 'left' | 'right' | 'midline';

/** One selectable anatomical structure backed by real geometry (from the generated manifest). */
export interface Structure {
  id: string;
  body: Body;
  name: string;
  system: SystemId;
  alsoIn: SystemId[];
  side: Side;
  layer: LayerId;
  contentId: string;
  /** Source meshes (BodyParts3D part IDs and their original English names). */
  parts: { source: string; name: string }[];
  /** Bounding-box center and size in meters, in the viewer frame. */
  center: [number, number, number];
  size: [number, number, number];
  triangles: Record<Mode, number>;
  /** Asset ID per visualization mode. A missing key means the structure has no model in that mode. */
  modes: Partial<Record<Mode, string>>;
}

export interface AssetEntry {
  id: string;
  body: Body;
  mode: Mode;
  system: SystemId;
  url: string;
  format: 'glb';
  bytes: number;
  sha256: string;
  version: string;
  /** Additional files the asset references. Every pack is a self-contained GLB, so this is empty. */
  dependencies: string[];
  triangles: number;
  structures: string[];
  requiredExtensions: string[];
}

export interface AssetSource {
  name: string;
  publisher: string;
  mirror: string;
  original: string;
  license: string;
  licenseUrl: string;
  attribution: string;
  citation: string;
  modifications: string;
}

export interface AnatomyManifest {
  schemaVersion: number;
  assetVersion: string;
  generatedAt: string;
  coordinateFrame: string;
  sources: Record<Body, AssetSource>;
  systems: SystemId[];
  assets: AssetEntry[];
  structures: Structure[];
}

/** Educational text, independent of any geometry. Keyed by Structure.contentId. */
export interface ContentEntry {
  anatomicalName: string;
  commonName?: string;
  summary: string;
  location: string;
  functions: string[];
  components?: string[];
  howItWorks?: string;
  facts?: string[];
  /** Related structure IDs (resolved against the manifest) or free-text names. */
  related?: string[];
  aliases?: string[];
}

/** A structure that is described in the app but has no 3D model in the installed assets. */
export interface InfoOnlyStructure {
  id: string;
  name: string;
  system: SystemId;
  content: ContentEntry;
}

export interface SystemInfo {
  id: SystemId;
  name: string;
  shortName: string;
  color: string;
  overview: string;
  functions: string[];
  /** Honest statement of what the installed models cover and what is missing, per body. */
  coverage: string;
  coverageFemale: string;
  /** Representative structure to frame when the system is opened. */
  focus?: string;
}

export interface TourStep {
  title: string;
  text: string;
  system: SystemId | 'all';
  structureId?: string;
  layers?: Partial<Record<LayerId, boolean>>;
}

export interface Tour {
  id: string;
  body: Body;
  title: string;
  description: string;
  steps: TourStep[];
}
