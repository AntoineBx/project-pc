<script>
  import { T, forwardEventHandlers } from '@threlte/core'
  export let gltf;

  let parameters = [
    {
      name: "turbo",
      offsetZ: 0,
    },
    {
      name: "Audio",
      offsetZ: -1.31,
    },
    
  
  ]
</script>
{#each parameters as { name, offsetZ }, i}
<T.Group name={name} position={[16.9, 4.41, 4.36+offsetZ]} >
  <T.Mesh
      name="switchStick"
      castShadow
      receiveShadow
      geometry={gltf.nodes.switchStick.geometry}
      material={gltf.materials.panel_and_bottom_details}
      position={[0,0,0]}
      rotation={[0, 0, -2.04]}
      />
      <T.Mesh
      name="switchBase"
      castShadow
      receiveShadow
      geometry={gltf.nodes.switchBase.geometry}
      material={gltf.materials.panel_and_bottom_details}
      position={[0.26, 0.23, 0]}
      rotation={[0, 0, -0.93]}
  />

</T.Group>
{/each}