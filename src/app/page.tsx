"use client"
import * as THREE from "three";
import * as Constants from "./utils/constants";
import React, { Suspense, useRef } from "react";
import { Canvas, Vector3, useFrame, useLoader, useThree } from "@react-three/fiber"
import { OrbitControls, useTexture } from "@react-three/drei";
import { BaseThreeMeshProps, EntityProps, OrbitProps, Planets } from "./utils/types";

const OrbitMesh = (props: OrbitProps) => {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((_state, _delta) => (ref.current.rotation.x += 0))
  return (
    <mesh
      {...props}
      ref={ref}
    >
      <torusGeometry args={[props.radius, 0.01, 32, 256]} />
      <meshBasicMaterial attach={"material"} color={'white'} />
    </mesh>
  );
}

const EntityMesh = (props: EntityProps) => {
  const ref = useRef<THREE.Mesh>(null!)
  const colorMap = useLoader(THREE.TextureLoader, props.texture)
  
  useFrame((_state) => {
    ref.current.rotation.y += props.rotationSpeed
  });

  return (
    <mesh
      {...props}
      ref={ref}
    >
      <sphereGeometry args={[props.size]} />
      <meshStandardMaterial map={colorMap}/>
    </mesh>
  );
}

const RotatingAxis = (props: BaseThreeMeshProps & { revolutionSpeed: number, children?: React.ReactNode }) => {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((_state, _delta) => (ref.current.rotation.y += props.revolutionSpeed))
  return (
    <mesh
      {...props}
      ref={ref}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <sphereGeometry args={[1]} />
      { props.children }
    </mesh>
  );
}

/** A version of RotatingAxis sans the roation logic. */
const PivotObject = (props: BaseThreeMeshProps) => {
  const ref = useRef<THREE.Mesh>(null!)
  return (
    <mesh
      {...props}
      ref={ref}
    >
      <sphereGeometry args={[1]} />
      { props.children }
    </mesh>
  );
}

const Moons = (props: BaseThreeMeshProps & {
  planetSize: number,
  planetDistance: number,
  moonCount: number
}) => {
  const BASE_MOON_TEXTURE = "textures/earth_moon.jpg";
  const FINAL_MOON_COUNT = Math.min(5, props.moonCount);
  const getRandomInt = (min: number, max: number) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }

  if (!props.moonCount) {
    return null;
  }

  return (
    <group>
      <PivotObject position={props.position}>
        {
          Array.from(Array(FINAL_MOON_COUNT), () => ({})).map(_ => {
            const randomIsNegative = [-1, 1][Math.floor(Math.random() * 2)];
            const moonVector: Vector3 = [
              props.planetDistance + randomIsNegative * (getRandomInt(-1*props.planetSize, props.planetSize) + 2*props.planetSize),
              randomIsNegative * (getRandomInt(-1 * props.planetSize, props.planetSize) + props.planetSize),
              randomIsNegative * getRandomInt(-1 * props.planetSize, props.planetSize) + props.planetSize
            ];

            return (
              <EntityMesh
                name={"Moon"}
                position={moonVector}
                size={props.planetSize / 10}
                rotationSpeed={0.01}
                texture={BASE_MOON_TEXTURE}
              />
            );
          })
        }
      </PivotObject>
    </group>
  )
}

const Planet = <T extends Planets>({ planet }: { planet: T }) => {
  const {
    name,
    distance,
    size,
    rotationSpeed,
    revolutionPeriod,
    texture,
    moonCount,
  } = Constants.PlanetInformationMap[planet];

  const PLANET_SIZE_SCALE = 4;
  const PLANET_DISTANCE: Vector3 = [distance, 0, 0];
  
  return (
    <group>
      <OrbitMesh radius={distance} position={[0,0,0]}/>
      <RotatingAxis revolutionSpeed={revolutionPeriod}>
        <EntityMesh
          name={name}
          position={PLANET_DISTANCE}
          size={PLANET_SIZE_SCALE * size}
          rotationSpeed={rotationSpeed}
          texture={texture}
        />
        <Moons
          moonCount={moonCount}
          planetSize={PLANET_SIZE_SCALE * size}
          planetDistance={distance}
        />
        {/** Render Saturn's ring */}
        { planet === Planets.Saturn ? (
          <mesh 
            position={[distance, 0, 0]} 
            rotation={[Math.PI / 4, 0, 0]}
          >
            <torusGeometry args={[7, 0.1, 32, 512]} />
            <meshBasicMaterial attach={"material"} color={'grey'} />
          </mesh>
        ) : null}
      </RotatingAxis>
    </group>
  );
}

const SolarSystem = () => {
  return (
    <>
      <EntityMesh
        name="Sun"
        position={[0,0,0]}
        size={Constants.SUN_BASE_SIZE * 1.25}
        rotationSpeed={Constants.SUN_BASE_ROTATION_SPEED}
        texture="textures/sun.jpg"
      />
      <Planet planet={Planets.Mercury} />
      <Planet planet={Planets.Venus} />
      <Planet planet={Planets.Earth} />
      <Planet planet={Planets.Mars} />
      <Planet planet={Planets.Jupiter} />
      <Planet planet={Planets.Saturn} />
      <Planet planet={Planets.Uranus} />
      <Planet planet={Planets.Neptune} />
    </>
  );
}

const Lighting = () => (
  <ambientLight />
);

const Background = () => {
  const { gl } = useThree();
  const texture = useTexture('textures/stars.jpg');
  const formatted = new THREE.WebGLCubeRenderTarget(texture.image.height)
    .fromEquirectangularTexture(gl, texture);

  return(
    <primitive attach="background" object={formatted.texture} />
  )
}

const NavBar = () => {
  return (
    <div style={{
      paddingTop: "5px",
      textAlign: "center",
      fontStyle: "italic",
    }}>
      <div>💫 The Solar System 🌙</div>
    </div>
  );
}

const Footer = () => {
  return (
    <div style={{ paddingLeft: "8px" }}>
      <a href="https://briansukhnandan.xyz">
        See more of my work!
      </a>
    </div>
  )
}

export default function Home() {
  // 92vh to get rid of the scrollbar on the right.
  return (
    <div style={{width: "auto", height: "92vh"}}>
      <NavBar />
      <Canvas camera={{ position: [0, 0, 100]  }}>
        <Suspense fallback={null}>
          <Background />
        </Suspense>
        <Lighting />
        <SolarSystem />
        <OrbitControls />
      </Canvas>
      <Footer />
    </div>
  );
}
