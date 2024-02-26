"use client"
import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei';

type BaseThreeMeshProps = ThreeElements["mesh"];
type OrbitProps = BaseThreeMeshProps & { radius: number; };
type EntityProps = BaseThreeMeshProps & {
  name: string;
  size: number;
  rotationSpeed: number;
  texture: string;
  revolutionSpeed?: number;
};

const UNIT_SIZE = 10; // 69634 km
const UNIT_ROTATION_SPEED = 0.0005;

const SUN_BASE_SIZE = UNIT_SIZE;
const SUN_BASE_ROTATION_SPEED = UNIT_ROTATION_SPEED;

const MERCURY_DISTANCE = 1.8 * UNIT_SIZE;
const MERCURY_SIZE = SUN_BASE_SIZE / 200;


// 36,826,000 

const Orbit = (props: OrbitProps) => {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((_state, delta) => (ref.current.rotation.x += 0))
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

const Entity = (props: EntityProps) => {
  const ref = useRef<THREE.Mesh>(null!)
  const colorMap = useLoader(THREE.TextureLoader, props.texture)
  
  useFrame((_state, delta) => {
    ref.current.rotation.y += props.rotationSpeed
  });

  return (
    <mesh
      {...props}
      ref={ref}
      // Most meshes need this it seems like.
      rotation={[Math.PI / 2, 0, 0]}
    >
      <sphereGeometry args={[props.size]} />
      <meshStandardMaterial map={colorMap}/>
    </mesh>
  );
}

const SolarSystem = () => {
  return (
    <>
      <Orbit radius={MERCURY_DISTANCE} position={[0,0,0]}/>
      <Entity 
        name="Sun"
        position={[0,0,0]}
        size={SUN_BASE_SIZE}
        rotationSpeed={SUN_BASE_ROTATION_SPEED}
        texture="textures/sun.jpg"
      />
    </>
  )
}

const Lighting = () => {
  return (<>
    <ambientLight />
    {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} /> */}
    {/* <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} /> */}
  </>)
}

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
