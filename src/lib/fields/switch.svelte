<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let value: boolean = false;
	export let label: string;
	export let name: string;

	const dispatch = createEventDispatcher();

	function inputChanged() {
		value = !value;
		dispatch('input', {
			value
		});
	}
</script>

<label>
	<div class="theme-selector-wrapper">
		<input type="checkbox" {name} id={name} checked={value} on:input={inputChanged} />
		<span>
			{#if value}
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
					><title>check-circle-outline</title><path
						d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z"
					/></svg
				>
			{:else}
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
					><title>close-circle-outline</title><path
						d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"
					/></svg
				>
			{/if}
		</span>
	</div>
	<p>{label}</p>
</label>

<style lang="scss">
	label {
		display: flex;
		gap: var(--size-4);
		align-items: center;
	}
	.theme-selector-wrapper {
		--circle-diameter: 1.25rem;
		--svg-color: rgb(var(--color-surface-300));
		display: grid;
		align-items: center;
		justify-content: center;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		padding: 2px;
		width: calc((var(--circle-diameter) * 2) + 2 * (var(--size-1) + var(--size-1)));
		background-color: rgb(var(--color-surface-50));
		border: solid 2px var(--svg-color);
		box-sizing: border-box;
		border-radius: 100vh;
		cursor: pointer;

		input[type='checkbox'] {
			grid-area: 1 / 1 / 2 / 2;
			opacity: 0;
			height: 0;
			width: 0;
			&:checked + span {
				--svg-color: rgb(var(--color-primary-500));
				transform: translateX(calc(1 * var(--circle-diameter) + var(--size-1) * 2)) rotate(360deg);
				svg {
					fill: rgb(var(--color-primary-500));
				}
			}
		}
		span {
			grid-area: 1 / 1 / 2 / 2;
			transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
			transform: translateX(0);
			border-radius: 50%;
			&,
			svg {
				width: var(--circle-diameter);
				height: var(--circle-diameter);
			}
		}
	}
</style>
