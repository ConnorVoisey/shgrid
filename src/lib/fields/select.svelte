<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let label: string;
	export let value: boolean | string;
	export let options: { id: boolean | string; label: string }[];

	const dispatch = createEventDispatcher();
</script>

<label>
	<p>{label}</p>
	<select
		{value}
		on:input={(e) => {
			value = e.currentTarget.value;
			console.log(value);
			dispatch('input', {
				value
			});
		}}
	>
		{#each options as { id, label }}
			<option value={id}>{label}</option>
		{/each}
	</select>
</label>

<style lang="scss">
	label {
		display: flex;
		flex-direction: column;
		gap: var(--size-1);
	}
</style>
