import { Planets } from "./types";

export const UNIT_SIZE = 15;
export const UNIT_ROTATION_SPEED = 0.0005;
export const UNIT_REVOLUTION_SPEED = 0.001;

export const SUN_BASE_SIZE = UNIT_SIZE;
export const SUN_BASE_ROTATION_SPEED = UNIT_ROTATION_SPEED;

export const PlanetInformationMap: Record<Planets, { 
  name: string,
  distance: number,
  size: number,
  rotationSpeed: number,
  revolutionPeriod: number,
  moonCount: number,
  texture: string,
}> = {
  [Planets.Mercury]: {
    name: "Mercury",
    distance: 2 * UNIT_SIZE,
    size: SUN_BASE_SIZE / 150,
    rotationSpeed: UNIT_ROTATION_SPEED / 2.5,
    revolutionPeriod: UNIT_REVOLUTION_SPEED * 3,
    moonCount: 0,
    texture: "textures/mercury.jpg",
  },
  [Planets.Venus]: {
    name: "Venus",
    distance: 3.5 * UNIT_SIZE,
    size: SUN_BASE_SIZE / 60,
    rotationSpeed: SUN_BASE_ROTATION_SPEED / 10,
    revolutionPeriod: UNIT_REVOLUTION_SPEED * 1.62,
    moonCount: 0,
    texture: "textures/venus.jpg",
  },
  [Planets.Earth]: {
    name: "Earth",
    distance: 4.2 * UNIT_SIZE,
    size: SUN_BASE_SIZE / 55,
    rotationSpeed: SUN_BASE_ROTATION_SPEED * 27,
    revolutionPeriod: UNIT_REVOLUTION_SPEED,
    moonCount: 1,
    texture: "textures/earth.jpg",
  },
  [Planets.Mars]: {
    name: "Mars",
    distance:  5.5 * UNIT_SIZE,
    size:  SUN_BASE_SIZE / 70,
    rotationSpeed: SUN_BASE_ROTATION_SPEED * 28.5,
    revolutionPeriod: UNIT_REVOLUTION_SPEED / 1.8,
    moonCount: 2,
    texture: "textures/mars.jpg",
  },
  [Planets.Jupiter]: {
    name: "Jupiter",
    distance: 12 * UNIT_SIZE,
    size: SUN_BASE_SIZE / 10,
    rotationSpeed: SUN_BASE_ROTATION_SPEED * 60,
    revolutionPeriod: UNIT_REVOLUTION_SPEED / 12,
    moonCount: 95,
    texture: "textures/jupiter.jpg",
  },
  [Planets.Saturn]: {
    name: "Saturn",
    distance: 18 * UNIT_SIZE,
    size: SUN_BASE_SIZE / 12,
    rotationSpeed: SUN_BASE_ROTATION_SPEED * 67,
    revolutionPeriod: UNIT_REVOLUTION_SPEED / 29.4,
    moonCount: 146,
    texture: "textures/saturn.jpg",
  },
  [Planets.Uranus]: {
    name: "Uranus",
    distance: 26 * UNIT_SIZE,
    size: SUN_BASE_SIZE / 26,
    rotationSpeed: SUN_BASE_ROTATION_SPEED * 34,
    revolutionPeriod: UNIT_REVOLUTION_SPEED / 84,
    moonCount: 28,
    texture: "textures/uranus.jpg",
  },
  [Planets.Neptune]: {
    name: "Neptune",
    distance: 35 * UNIT_SIZE,
    size: SUN_BASE_SIZE / 27,
    rotationSpeed: SUN_BASE_ROTATION_SPEED * 32,
    revolutionPeriod: UNIT_REVOLUTION_SPEED / 165,
    moonCount: 16,
    texture: "textures/neptune.jpg",
  },
}
