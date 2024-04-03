<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { ContactShadows, Float, Grid, OrbitControls,Sky ,TransformControls , Environment, AudioListener, PositionalAudio, Audio, useThrelteAudio } from '@threlte/extras'
  import Lumen64Final from './models/lumen64_final.svelte'
	import { onMount } from 'svelte';
  import { finished } from '$lib/stores/loader'
  import { PosiAudioArray } from '$lib/stores/audioArrayStore';
	import { lerp } from 'three/src/math/MathUtils.js';
  import * as THREE from 'three';
  const lerpValue = 0.02
  const lookAt = [0,10,0]
  const cameraPos = [40, 15, 0]
  const fov = 40
  const reduceX = 0.01
  const reduceY = 0.01
  let camera: THREE.PerspectiveCamera
  let MESH: THREE.Mesh

  let mouseX = 0, mouseY = 0;
  let windowHalfX = window.innerWidth / 2;
  let windowHalfY = window.innerHeight / 2;
  let LookAtPreviousTask = {x:0,y:0,z:0};

  onMount(()=>{
    document.addEventListener( 'mousemove', onDocumentMouseMove )
    window.addEventListener('resize',()=> {
      console.log('resize')
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
    })
  })

  $:if($finished){
    console.log('finished')
    setTimeout(() => {
      initAudio()
    }, 4000);
  }
  PosiAudioArray.subscribe((value) => {
    // console.log("scene ARRAY UPDATE",value)
    value.forEach((audio)=>{
      if(audio instanceof THREE.PositionalAudio){
        console.log("posiAudio",audio)
        // const audioLoader = new THREE.AudioLoader();
        // audioLoader.load( '/audio/mechanicalWheel.mp3', function( buffer ) {
        //   audio.setBuffer( buffer );
        //   audio.setRefDistance( 20 );
        //   audio.play();
        // });
        
      }
      
    })
  })  
  
  
  function initAudio(){
    const listener = new THREE.AudioListener();
    camera.add( listener );
    //posiAudio.play()

    
    

  }



  function onDocumentMouseMove( event: MouseEvent) {
    mouseX = ( event.clientX - windowHalfX );
    mouseY = ( event.clientY - windowHalfY );
  }

  useTask((delta) => {
    LookAtPreviousTask = {
      x:lookAt[0],
      y:lerp(LookAtPreviousTask.y,lookAt[1] -mouseY*reduceY, lerpValue),
      z:lerp(LookAtPreviousTask.z,lookAt[2] -mouseX*reduceX, lerpValue),
    }
    camera.lookAt( LookAtPreviousTask.x, LookAtPreviousTask.y, LookAtPreviousTask.z );
    MESH.position.x = LookAtPreviousTask.x
    MESH.position.y = LookAtPreviousTask.y
    MESH.position.z = LookAtPreviousTask.z

  })
</script>


<T.PerspectiveCamera
  bind:ref={camera}
  makeDefault
  position={cameraPos}
  on:create={({ ref }) => {
    ref.lookAt(...lookAt)
  }}
  fov={fov}
>
  <OrbitControls
    enableZoom={true}
    enableDamping
    
    target={[5, 7, 0]}
  />
  <AudioListener name="testAUdioListener"/>
</T.PerspectiveCamera>


<!-- <Sky elevation={1}  azimuth={100}/> -->
<Environment
  path="/envmap/"
  files="envmap.hdr"
  isBackground={false}
  format="hdr"
/>
<!-- <TransformControls on:change={(e)=>{
  console.log(e.target._positionStart)
}}>
  <T.DirectionalLight
    position={[30, 22, 0]} 
  />
</TransformControls> -->
<Grid
  position.y={-0.001}
  cellColor="#ffffff"
  sectionColor="#ffffff"
  sectionThickness={1}
  fadeDistance={150}
  cellSize={5}
  gridSize={200}
/>

<ContactShadows
  scale={10}
  blur={2}
  far={2.5}
  opacity={0.5}
/>
<Float
  floatIntensity={1}
  floatingRange={[0, 1]}
>
  <T.Mesh
    position.y={1.2}
    position.z={-0.75}
    bind:ref={MESH}
  >
    <T.BoxGeometry />
    <T.MeshStandardMaterial color="#0059BA" />
  
  </T.Mesh>
</Float>
<T.Group  position.y={1.7}>
  <Lumen64Final position.y={1.7}/>
</T.Group>
  <T.MeshStandardMaterial color="#F85122" />
