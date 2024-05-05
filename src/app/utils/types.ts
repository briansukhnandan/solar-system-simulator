import { ThreeElements } from "@react-three/fiber";

export type BaseThreeMeshProps = ThreeElements["mesh"];
export type OrbitProps = BaseThreeMeshProps & { radius: number; };
export type EntityProps = BaseThreeMeshProps & {
  name: string;
  size: number;
  rotationSpeed: number;
  texture: string;
  revolutionSpeed?: number;
  onClickHandler?: () => void;
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

export const getPlanetName = (planet: Planets) => {
  switch(planet) {
    case Planets.Mercury:
      return "Mercury";
    case Planets.Venus:
      return "Venus";
    case Planets.Earth:
      return "Earth";
    case Planets.Mars:
      return "Mars";
    case Planets.Jupiter:
      return "Jupiter";
    case Planets.Saturn:
      return "Saturn";
    case Planets.Uranus:
      return "Uranus";
    case Planets.Neptune:
      return "Neptune";
  }
}
