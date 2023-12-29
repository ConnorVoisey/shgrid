<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let value: boolean = false;
	//	export let label: string | null = null;
	export let name: string;

	const dispatch = createEventDispatcher();

	function inputChanged() {
		value = !value;
		dispatch('input', {
			value,
		});
	}
</script>

<label class="switch"><input type="checkbox" checked={value} on:input={inputChanged} {name} id={name} /><span /></label>
