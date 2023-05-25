/* eslint-disable react/no-unknown-property */
import {useState, useRef, Suspense} from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {Points, PointMaterial, Preload} from '@react-three/drei'  
import * as random from 'maath/random/dist/maath-random.esm'


//template_r8n7ioj
//gmail: service_uajv1te
//public:key: -A9Zr2pe1NhAf1AiZ

const Stars = (props) => {
  const ref = useRef();
  const sphere = random.inSphere(new Float32Array(10000),{radius:1.2});

  useFrame((state,change) => {
    ref.current.rotation.x -= change / 10.0005;
    ref.current.rotation.y -= change / 15.0005;
  })
  return (
    <group rotation = {[0, 0, Math.PI/4]}>
      <Points ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled 
        {...props}>
        <PointMaterial
          transparent
          color={`#f372c8`}
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

const StarsCanvas = () => {
  
  
  return (
    <div className="w-full h-auto absolute inset-0 z-[-1]">
      <Canvas camera={{position:[0, 0, 1]}}>
        <Suspense fallback={null}>
          <Stars/>
        </Suspense>
        <Preload all/>
      </Canvas>
    </div>
  )
}

export default StarsCanvas