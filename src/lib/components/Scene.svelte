<script lang="ts">
  import { T } from '@threlte/core'
  import { ContactShadows, Float, Grid, OrbitControls,Sky,TransformControls, Environment } from '@threlte/extras'
  import Lumen64Final from './models/lumen64_final.svelte'

</script>

<T.PerspectiveCamera
  makeDefault
  position={[70, 30, 0]}
  fov={25}
>
  <OrbitControls
    enableZoom={true}
    enableDamping
    
    target={[10, 10, 0]}
  />
</T.PerspectiveCamera>


<!-- <Sky elevation={1}  azimuth={100}/> -->
<Environment
  path="/envmap/"
  files="envmap.hdr"
  isBackground={false}
  format="hdr"
/>
<TransformControls>
<T.DirectionalLight
  position={[50, 32, 40]}
  castShadow
/>
</TransformControls>
<Grid
  position.y={-0.001}
  cellColor="#ffffff"
  sectionColor="#ffffff"
  sectionThickness={0}
  fadeDistance={25}
  cellSize={2}
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
  >
    <T.BoxGeometry />
    <T.MeshStandardMaterial color="#0059BA" />
  </T.Mesh>
</Float>

<T.Mesh
  position={[0, 1.8, 0.75]}
  rotation={[0, 0, 0]}
>
  <Lumen64Final />
  <T.MeshStandardMaterial color="#F85122" />
</T.Mesh>

<Float
  floatIntensity={1}
  floatingRange={[0, 1]}
>
  <T.Mesh
    position={[-1.4, 1.5, 0.75]}
    rotation={[-5, 128, 10]}
  >
    <T.IcosahedronGeometry />
    <T.MeshStandardMaterial color="#F8EBCE" />
  </T.Mesh>
</Float>
