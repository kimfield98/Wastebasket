"use client";
import { OrbitControls, useAnimations, useGLTF, Stars, SpotLight, Plane} from '@react-three/drei';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three';
import { gsap } from 'gsap';
import axios from 'axios';

const Light = () => {
  const spotLightRef = useRef<THREE.SpotLight | null>(null!);
  const directLightRef = useRef<THREE.DirectionalLight | null>(null!);
  const { camera } = useThree();
  const planetPosition = new THREE.Vector3(); // 행성의 위치를 저장할 변수

  useFrame(() => {
    if (spotLightRef.current && directLightRef.current) {
      // 카메라와 행성 사이의 거리 계산
      const distanceToPlanet = camera.position.distanceTo(planetPosition);
      directLightRef.current.target.position.copy(new THREE.Vector3(0,0,0));
  
      // 스포트라이트의 X축 위치 계산
      const spotlightX = camera.position.x / distanceToPlanet;
      const spotlightY = camera.position.y / distanceToPlanet;
      const spotlightZ = camera.position.z / distanceToPlanet;
  
      // 스포트라이트 위치 업데이트
      spotLightRef.current.position.x = spotlightX;
      spotLightRef.current.position.y = spotlightY;
      spotLightRef.current.position.z = spotlightZ;
      
      
      directLightRef.current.position.copy(new THREE.Vector3(camera.position.x+2, camera.position.y+2, camera.position.z));
      // 스포트라이트가 행성을 향하도록 설정 (필요한 경우)
      spotLightRef.current.target.position.copy(planetPosition);
    }
  });
  
  return (
    <mesh>
      <SpotLight ref={spotLightRef} color='#00BFFF' angle={Math.PI/2.2}/>
      <directionalLight ref={directLightRef} intensity={90} castShadow />
    </mesh>
  );
}

const EarthlatLongToVector3 = (lat:any,lon:any,radius:any) => {
  const phi = ((lat+ 0.25) * Math.PI) / 180;
  const theta = (((lon-90) - 180) * Math.PI) / 180;
  const x = -(radius * Math.cos(phi) * Math.cos(theta));
  const y = radius * Math.sin(phi);
  const z = radius * Math.cos(phi) * Math.sin(theta);
  return new THREE.Vector3(x,y,z);
}

const Earth = () => {
  const model = useGLTF('/earth/scene.gltf');

  return (
    <mesh receiveShadow castShadow>
        <primitive object={model.scene} scale={0.0005} />
    </mesh>
  );
};

const Atmosphere = () => {

  return(
    <mesh receiveShadow castShadow>
        <ambientLight intensity={10}/>
        <sphereGeometry args={[2.16, 64, 64]}/>
        <meshPhongMaterial color='skyblue' opacity={1} transparent side={THREE.BackSide}/>
    </mesh>
  )
}

const Cloud = () => {
  const cloudRef = useRef<THREE.Mesh | null>(null!);
  const cloud = useLoader(THREE.TextureLoader, '/earth/textures/cloud.png');

  useFrame(({clock}) => {
    if (cloudRef.current) {
      cloudRef.current.rotation.y = clock.getElapsedTime() * 0.008;
    }
  });

  return(
    <mesh ref={cloudRef} renderOrder={0} receiveShadow castShadow>
        <sphereGeometry args={[2.14, 32, 32]}/>
        <meshPhongMaterial map={cloud} transparent opacity={0.9}/>
    </mesh>
  )};

const BorderSphere = ({ borderData }:any) => {
  // 메쉬 그룹을 저장할 ref 생성
  const meshGroupRef = useRef<THREE.Group>(new THREE.Group());


  useEffect(() => {
    // 메쉬 그룹에 접근하여 모든 메쉬를 추가
    const meshGroup = meshGroupRef.current;
    if (!meshGroup) return;

    borderData.forEach((border:any) => {
      console.log(border.geometry.type)
      if (Array.isArray(border) && meshGroup) {
        border.forEach((coord) => {
          const lat = coord[1];
          const lon = coord[0];
          const radius = 2.2;
          const position = EarthlatLongToVector3(lat, lon, radius);
          const geometry = new THREE.SphereGeometry(0.01, 32, 32);
          const material = new THREE.MeshBasicMaterial({ color: 'red' });
          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.copy(position);
          meshGroup.add(mesh); // 메쉬를 그룹에 추가
        });
      }
    });
  },); 
  return <primitive ref={meshGroupRef} object={new THREE.Group()} />;
};  

export const EarthCanvas = () => {
  const [borderData, setBorderData] = useState<any>([]);

  useEffect(() => {
    axios.get('/CountryBoundaries.json')
    .then(response => {
      setBorderData(response.data.features)
    })
    .catch(err => 
      console.log(err)
    )
  },[]);

  return (
    <>
      <Canvas>
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minPolarAngle={0.5}
          maxPolarAngle={2}
          minDistance={2.7}
          maxDistance={5}
        />
        <Light />
        <Stars 
        radius={300} 
        depth={60} 
        count={20000} 
        factor={7} 
        saturation={0}
        fade={true}/>
        <Earth />
        <BorderSphere borderData={borderData}/>
        <Cloud />
        <Atmosphere /> 
      </Canvas>
    </>
  )
}

export default EarthCanvas;