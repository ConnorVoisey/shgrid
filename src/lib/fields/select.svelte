<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	type ValueType = boolean | string;
	export let label: string | null = null;
	export let value: ValueType;
	export let options: { id: ValueType; label: string }[];

	const dispatch = createEventDispatcher();
	function setValue(newValue: ValueType) {
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
