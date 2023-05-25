/* eslint-disable react/no-unknown-property */
import {Suspense, useEffect, useState} from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei' 
import CanvasLoader from '../Loader'

const Computers = ({ isMobile }) => {
  const computer = useGLTF('./desktop_pc/scene.gltf');

  return (
    <mesh>
      <hemisphereLight intensity={0.15}
        groundColor="black"
      />
      <pointLight intensity={1}/>
      <spotLight 
      position={[-20,50,10]}
         angle={0.12}
         penumbra={1}
         intensity={1}
         castShadow
         shadow-mapSize={1024}/>
      <primitive object={computer.scene}
        scale={isMobile? 0.7: 0.75}
        position={isMobile? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />

    </mesh>
  )
}
const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
/*
useEffect Explanation:
This useEffect is checking the window size and setting the 
isMobile state to true or false depending on the window size.
The window size is determined by the window.matchMedia method which
returns a MediaQueryList object which has a matches property that
set to a max-width of 500px slightly bigger than the average smart phone.
The useEffect is also adding an event listener to the mediaQuery object 
which is listening for a change in the window size. When the window size
changes the handleMediaQueryChange function is called and the isMobile state
is set to the event.matches property of the mediaQuery object. The useEffect 
is also returning a function that removes the event listener from the mediaQuery 
object. Which is called when the component unmounts.
*/
  useEffect(() => {
  const mediaQuery = window.matchMedia('(max-width: 500px)');
  console.log(mediaQuery);

  setIsMobile(mediaQuery.matches);

  const handleMediaQueryChange = (event) => {
    setIsMobile(event.matches);
  }
  mediaQuery.addEventListener('change', handleMediaQueryChange);

  return () => {mediaQuery.removeEventListener('change', handleMediaQueryChange)};

  }, []);


  return (
    <Canvas
      frameloop = 'demand'
      shadows
      camera={{position: [20, 3, 5], fov: 25}}
      gl={{preserveDrawingBuffer: true}}
      >
      <Suspense fallback={<CanvasLoader/>}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}/>
        <Computers isMobile={isMobile}/>       
      </Suspense> 
      <Preload all/>
    </Canvas>
  )
}

export default ComputersCanvas