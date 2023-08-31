<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	type ValueType = boolean | string;
	export let label: string;
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

<label class="select-label">
	<p>{label}</p>
	<select {value} on:input={e => setValue(e.currentTarget.value)}>
		{#each options as option}
			<option value={option.id}>
				{option.label}
			</option>
		{/each}
	</select>
</label>
