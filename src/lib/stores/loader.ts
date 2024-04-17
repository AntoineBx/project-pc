import { readable, derived } from 'svelte/store';
import { useProgress } from '@threlte/extras'

//useProgress is a custom hook that can be called only once
const { progress, finishedOnce } = useProgress()

export const progressStore = derived(
	progress,
	($progress) => { return $progress}
);
export const finished = derived(
	finishedOnce,
	($finishedOnce) => { 
		return $finishedOnce}
);