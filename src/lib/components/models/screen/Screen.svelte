<script lang="ts">
 import { T } from '@threlte/core'
 import { Flex, Box, tailwindParser } from '@threlte/flex'
 import Plane from './Plane.svelte'
	import { Text } from '@threlte/extras';

</script>
  <T.Group position={[14.4,13.5,0.1]} rotation={[0,Math.PI /2,0]} >
    <Plane
      width={15.85}
      height={10}
      radius={1}
      color="green"
    />
    <Flex
      width={15.85}
      height={10}
      padding={0.4}
      classParser={tailwindParser}
      let:width
      let:height
    >
      <Box
        width="auto"
        height="auto"
        flex={1}
        padding={4}
        >
        <Plane
          {width}
          {height}
          color="red"
          depth={2}
          radius={1}
        />
        
      </Box>
      <!-- <T.Mesh>
        <RoundedBoxGeometry
          args={[2, 2, 1]}
          radius={0.2}
        />
        <Text text="TESTINGGGG" />
      <T.MeshBasicMaterial color="#0A0F19" />
    </T.Mesh> -->
      
    
    </Flex>
  </T.Group>