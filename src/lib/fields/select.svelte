<script lang="ts" generics="T extends DefaultRow">
	import type { DefaultRow } from '$lib/js/types';
	import { createEventDispatcher } from 'svelte';

	export let label: string | null = null;
	export let value: keyof T;
	export let options: { id: keyof T; label: string }[];

	const dispatch = createEventDispatcher();
	function setValue(newValue: keyof T) {
		value = newValue;
		isOpen = false;
		dispatch('input', {
			value,
		});
	}
	let isOpen = false;
</script>

<label class="shgrid-pkg_select-label">
	{#if label}
		<p>{label}</p>
	{/if}
	<select {value} on:input={e => setValue(e.currentTarget.value)}>
		{#each options as option}
			<option value={option.id}>
				{option.label}
			</option>
		{/each}
	</select>
</label>
