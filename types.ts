export interface TreeConfig {
  particleCount: number;
  particleSize: number;
  treeColor: string;
  treeHeight: number;
  baseRadius: number;
  spiralTurns: number;
  randomness: number;
  sparkleSpeed: number;
  bloomIntensity: number;
}

export const DEFAULT_CONFIG: TreeConfig = {
  particleCount: 3000,
  particleSize: 0.15,
  treeColor: '#00ff88',
  treeHeight: 12,
  baseRadius: 4,
  spiralTurns: 4,
  randomness: 0.5,
  sparkleSpeed: 0.5,
  bloomIntensity: 1.5,
};
