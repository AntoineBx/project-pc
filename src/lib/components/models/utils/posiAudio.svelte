<script lang="ts">

	import { PositionalAudio } from "@threlte/extras";
    import { Group } from 'three';
    import * as THREE from 'three';
    import { T, forwardEventHandlers } from '@threlte/core';
    import { PosiAudioArray } from '$lib/stores/audioArrayStore';
	import { onMount } from "svelte";
    import { PositionalAudioHelper } from 'three/addons/helpers/PositionalAudioHelper.js';
	import { useThrelte } from "@threlte/core";
    export let source = "/audio/mechanicalWheel.mp3";
    export let position = [0, 0, 0];
    export let rotation = [0, 0, 0];
    export let directionalCone = {
        coneInnerAngle: 30,
        coneOuterAngle: 60,
        coneOuterGain: 0.1
    }
    export let refDistance = 30
    export let rolloffFactor = 4
    export let volume = 0.5
    const { scene } = useThrelte();
    let refGroup = new Group();
	let posiAudio: THREE.PositionalAudio;
    let playing = false
    let loadInStore = () => {
        PosiAudioArray.update((value) => {
            value.push(posiAudio);
            return value;
	    });
       //ADD HELPER
        // playing = true
        // const helper = new PositionalAudioHelper( posiAudio, 23 );
        // refGroup.add( posiAudio );
        // posiAudio.add( helper );
            
    };
    
    const component = forwardEventHandlers();
</script>
<T is={refGroup} {position} {rotation} bind:this={$component}>
    <PositionalAudio
        bind:ref={posiAudio}
        bind:play={playing}
        name="posi_audio_wax_disk"
        autoplay={true}
        loop={true}
        on:load={loadInStore}
        refDistance={refDistance}
        rolloffFactor={rolloffFactor}
        directionalCone={directionalCone}
        volume={volume}
        src={source}
    />
</T>