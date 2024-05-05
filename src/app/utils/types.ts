import { ThreeElements } from "@react-three/fiber";

export type BaseThreeMeshProps = ThreeElements["mesh"];
export type OrbitProps = BaseThreeMeshProps & { radius: number; };
export type EntityProps = BaseThreeMeshProps & {
  name: string;
  size: number;
  rotationSpeed: number;
  texture: string;
  revolutionSpeed?: number;
};

export enum Planets {
  Mercury,
  Venus,
  Earth,
  Mars,
  Jupiter,
  Saturn,
  Uranus,
  Neptune,
}
