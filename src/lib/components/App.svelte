<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
	import { tweened } from 'svelte/motion';
  import { fade } from 'svelte/transition'
  import { progressStore } from '$lib/stores/loader'


  const tweenedProgress = tweened($progressStore, {
    duration: 800
  })
  $: tweenedProgress.set($progressStore)
</script>


{#if $tweenedProgress < 1}
  <div
    transition:fade|local={{
      duration: 200
    }}
    class="wrapper"
  >
    <p class="loading">Loading</p>
    <div class="bar-wrapper">
      <div
        class="bar"
        style="transform: scaleX( {$tweenedProgress})"
      />
    </div>
  </div>
{/if}
<div class="main">
  <Canvas>
    <Scene />
  </Canvas>
</div>


<style>
  div.main {
    height: 100%;
  }
  .wrapper {
    opacity: 0.2;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-items: center;
    justify-content: center;
    color: black;
  }
  .loading {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
  .bar-wrapper {
    width: 33.333333%;
    height: 10px;
    border: 1px solid black;
    position: relative;
  }
  .bar {
    height: 100%;
    width: 100%;
    transform-origin: left;
    transform: scaleX(0);
    background-color: black;
  }
</style>