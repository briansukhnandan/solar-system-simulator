"use client"
import * as THREE from "three";
import * as Constants from "./utils/constants";
import React, { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei";
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
      <meshBasicMaterial attach={"material"} color={'gray'} />
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

const Planet = <T extends Planets>({ planet }: { planet: T }) => {
  const {
    name,
    distance, 
    size, 
    rotationSpeed, 
    revolutionPeriod,
    texture
  } = Constants.PlanetInformationMap[planet];
  
  return (
    <group>
      <OrbitMesh radius={distance} position={[0,0,0]}/>
      <RotatingAxis revolutionSpeed={revolutionPeriod}>
        <EntityMesh
          name={name}
          position={[distance,0,0]}
          size={size}
          rotationSpeed={rotationSpeed}
          texture={texture}
        />
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
        size={Constants.SUN_BASE_SIZE}
        rotationSpeed={Constants.SUN_BASE_ROTATION_SPEED}
        texture="textures/sun.jpg"
      />
      <Planet planet={Planets.Mercury} />
      <Planet planet={Planets.Venus} />
      <Planet planet={Planets.Earth} />
      <Planet planet={Planets.Mars} />
      <Planet planet={Planets.Jupiter} />
    </>
  );
}

const Lighting = () => (
  <ambientLight />
);

export default function Home() {
  return (
    <div style={{width: "auto", height: "100vh"}}>
      <Canvas camera={{ position: [0, 0, 30] }}>
        <Lighting />
        <SolarSystem />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
