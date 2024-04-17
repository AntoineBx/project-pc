<script lang="ts">
    import { Text } from '@threlte/extras'
    import type { ColorRepresentation } from 'three'
    import { useReflow } from '@threlte/flex'
    import { forwardEventHandlers } from '@threlte/core'
    export let text: string
    export let color: ColorRepresentation = 'white'
    export let z = 0
    export let anchorX = '50%'
    export let anchorY = '50%'
    export let fontSize: 'xs' | 's' | 'm' | 'l' | 'xl' = 'm'
    const fontSizes: Record<typeof fontSize, number> = {
      xs: 0.5,
      s: 1,
      m: 2,
      l: 3,
      xl: 4
    }
    const reflow = useReflow()
  </script>
  <Text
    position.z={z}
    {text}
    {anchorX}
    {anchorY}
    
    fontSize={fontSizes[fontSize]}
    {color}
    on:sync={reflow}
  />