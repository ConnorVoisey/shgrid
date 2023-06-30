<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	type ValueType = boolean | string;
	export let label: string;
	export let value: ValueType;
	export let options: { id: ValueType; label: string }[];

	$: valueLabel = options.find(option => value === option.id)?.label ?? value;

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

<div class="label">
	<button on:click={() => (isOpen = !isOpen)}>{valueLabel}</button>
	{#if isOpen}
		<ul>
			{#each options as option}
				<li>
					<button
						on:click={() => {
							setValue(option.id);
						}}
					>
						{option.label}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style lang="scss">
	.label {
		display: flex;
		flex-direction: column;
		gap: var(--size-1);
	}
</style>
