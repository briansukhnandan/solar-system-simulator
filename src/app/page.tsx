"use client"
import * as THREE from "three";
import * as Constants from "./utils/constants";
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber"
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

const Planet = <T extends Planets>({ planet }: { planet: T }) => {
  const {
    name,
    distance, 
    size, 
    rotationSpeed, 
    revolutionPeriod,
    texture
  } = Constants.PlanetInformationMap[planet];

  const PLANET_SIZE_SCALE = 4;
  
  return (
    <group>
      <OrbitMesh radius={distance} position={[0,0,0]}/>
      <RotatingAxis revolutionSpeed={revolutionPeriod}>
        <EntityMesh
          name={name}
          position={[distance,0,0]}
          size={PLANET_SIZE_SCALE * size}
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

export default function Home() {
  return (
    <div style={{width: "auto", height: "100vh"}}>
      <Canvas camera={{ position: [0, 0, 30]  }}>
        <Suspense fallback={null}>
          <Background />
        </Suspense>
        <Lighting />
        <SolarSystem />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
