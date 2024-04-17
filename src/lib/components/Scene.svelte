<script lang="ts">
  import { T, useTask, useThrelte } from '@threlte/core'
  import { ContactShadows, Float, Grid, OrbitControls,Sky ,TransformControls , Environment, AudioListener, useProgress } from '@threlte/extras'
  import Lumen64Final from './models/lumen64_final.svelte'
	import { onMount } from 'svelte';
  import { finished } from '$lib/stores/loader'
  import { PosiAudioArray } from '$lib/stores/audioArrayStore';
	import { lerp, mapLinear } from 'three/src/math/MathUtils.js';
  import { GUI } from 'dat.gui'
  import { easing } from 'maath'
  import { SheetObject } from '@threlte/theatre'


  import * as THREE from 'three';
	import OfficeDesk from './models/OfficeDesk.svelte';
  const lerpValue = 0.02
  const cameraPos = [35, 15, 0]
  const lookAtInit = new THREE.Vector3( 0, 10, 10 );
  
  const fov = 65
  const angleRangeMultiplierX = 10
  const angleRangeMultiplierY = 6
  let camera: THREE.PerspectiveCamera
  let MESH: THREE.Mesh
  let LampSpotlightTarget: THREE.Mesh
  let LampSpotlight: THREE.SpotLight
  let cameraSpotlight: THREE.SpotLight

  let mouseX = 0, mouseY = 0;
  let windowHalfX = window.innerWidth / 2;
  let windowHalfY = window.innerHeight / 2;
  let lookAtMesh = new THREE.Vector3(0,0,0);

  const { scene,renderer, invalidate } = useThrelte();


  onMount(()=>{
    document.addEventListener( 'mousemove', onDocumentMouseMove)
    document.addEventListener('touchmove', onDocumentTouchMove )
    window.addEventListener('resize',()=> {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
    })

    renderer.shadowMap.enabled = true;
    
    
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    console.log(renderer.shadowMap.type)
    /**  DAT.GUI AJUSTEMENT**/
    // const gui = new GUI()
    // const sceneGui = gui.addFolder('sceneGui')
    // sceneGui.add(cameraSpotlight.shadow, 'bias', -0.001, 0.01)
    // sceneGui.add(cameraSpotlight.shadow, 'normalBias', -10, 100)
    // sceneGui.add(cameraSpotlight.shadow.camera, 'near', 0, 20)
    // sceneGui.add(cameraSpotlight.shadow.camera, 'far', 0, 500)
    // sceneGui.add(cameraSpotlight, 'intensity', 10, 10000)
    // sceneGui.open()
    /******/
  })

  
  //reassignement in setTimeout trigger infinite loop so i use function to prevent dynamic declaration to be called
  $:onFinished($finished)
  function onFinished(finished){
    if(finished == false)return
    console.log("LampSpotlight")
      let timeoutUnsub = setTimeout(() => {
        let spotlightHelper = new THREE.SpotLightHelper( LampSpotlight );
        LampSpotlight.shadow.mapSize = new THREE.Vector2( 512,512);
        console.log(LampSpotlight)
        LampSpotlight.shadow.bias = -0.0001;
        cameraSpotlight.shadow.bias = -0.0002;
        scene.add( spotlightHelper );
        invalidate()
      },5);
     
  }
  
  PosiAudioArray.subscribe((value) => {
    // console.log("scene ARRAY UPDATE",value)
    value.forEach((audio)=>{
      if(audio instanceof THREE.PositionalAudio){
        // const audioLoader = new THREE.AudioLoader();
        // audioLoader.load( '/audio/mechanicalWheel.mp3', function( buffer ) {
        //   audio.setBuffer( buffer );
        //   audio.setRefDistance( 20 );
        //   audio.play();
        // });
        
      }
      
    })
  })  
  


  function onDocumentTouchMove( event: TouchEvent) {
    event.preventDefault();
    mouseX = mapLinear(event.touches[0].clientX - windowHalfX ,-windowHalfX,windowHalfX,-1,1);
    mouseY = mapLinear( event.touches[0].clientY - windowHalfY, -windowHalfY, windowHalfY,-1,1);
  
  }
  function onDocumentMouseMove( event: MouseEvent) {
    if(matchMedia('(hover: none)').matches){
      return
    }
    mouseX = mapLinear( event.clientX - windowHalfX ,-windowHalfX,windowHalfX,-1,1);
    mouseY = mapLinear( event.clientY - windowHalfY, -windowHalfY, windowHalfY,-1,1);
  }

  useTask((delta) => {
    
    // LookAtPreviousTask = {
    //   x:lookAt[0],
    //   y:lerp(LookAtPreviousTask.y,lookAt[1] -mouseY*angleRangeMultiplierY, lerpValue),
    //   z:lerp(LookAtPreviousTask.z,lookAt[2] -mouseX*angleRangeMultiplierX, lerpValue),
    // }
    
    easing.damp3(lookAtMesh,
      [
        lookAtInit.x,
        lookAtInit.y -mouseY*angleRangeMultiplierY,
        lookAtInit.z -mouseX*angleRangeMultiplierX
      ]
    ,0.3,delta)




    camera.lookAt( lookAtMesh );
    // MESH.position.x = LookAtPreviousTask.x
    // MESH.position.y = LookAtPreviousTask.y
    // MESH.position.z = LookAtPreviousTask.z

  })
</script>


<T.PerspectiveCamera
  bind:ref={camera}
  makeDefault
  position={cameraPos}
  on:create={({ ref }) => {
    ref.lookAt(lookAtInit)
  }}
  fov={fov}
>
  <!-- <OrbitControls
    enableZoom={true}
    enableDamping
    
    target={[5, 7, 0]}
  /> -->
  <AudioListener name="mainAudioListener"/>
</T.PerspectiveCamera>


<!-- <Sky elevation={1}  azimuth={100}/> -->
<Environment
  path="envmap/"
  files="envmap.hdr"
  isBackground={true}
  format="hdr"
/>

<T.SpotLight
  penumbra={0.04}
  castShadow
  position={[30, 22, 0]} 
  angle={Math.PI / 4}
  intensity={1000}
  target={MESH}
  bind:ref={cameraSpotlight}
/>
<SheetObject
  key="Directional Light"
  let:Transform
>
  <Transform>
    <T.SpotLight
      penumbra={0.04}
      distance={400}
      decay={1.4}
      castShadow
      position={[6.2,33.8,24.3]} 
      angle={Math.PI /4}
      intensity={1000}
      target={LampSpotlightTarget}
      bind:ref={LampSpotlight}
    />
  </Transform>
</SheetObject>
<T.Mesh bind:ref={LampSpotlightTarget} position={[12,0,21]}/>

<ContactShadows
  scale={10}
  blur={2}
  far={2.5}
  opacity={0.5}
/>
  


<T.Mesh 
  bind:ref={MESH}
>
  <T.BoxGeometry />
  <T.MeshStandardMaterial color="#0059BA" />

</T.Mesh>
<T.Group>
  <Lumen64Final position.y={1.7}/>
  <SheetObject
    key="Office"
    let:Sync  
    let:Transform
  >
    <OfficeDesk scale={1} position={[10,3,8]}/>
  </SheetObject>
</T.Group>

  <T.MeshStandardMaterial color="#F85122" />
