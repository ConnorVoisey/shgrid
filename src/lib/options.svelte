<script lang="ts">
	import type { BaseGridBuilder } from './js/BaseGridBuilder';

	export let builder: BaseGridBuilder;
	let search: string = '';
	$: filteredColumns = builder.columns.filter((column) =>
		column.label.toLowerCase().includes(search.toLowerCase())
	);
</script>

<div class="option-block">
	<label>
		<p>Search for columns</p>
		<input type="text" bind:value={search} />
	</label>
	<ul>
		{#each filteredColumns as column}
			<li>
				<label>
					<input
						class="slider"
						type="checkbox"
						checked={!column.hidden}
						on:input={() => {
							column.hidden = !column.hidden;
							builder.buildData();
						}}
					/>
					<p>{column.label}</p>
				</label>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	.option-block {
		background-color: rgb(var(--color-surface-700));
		padding: 1rem 2rem;
	}
	label {
		display: flex;
		align-items: center;
		gap: 2rem;
	}
	input.slider {
		--ball-width: 1rem;
		--total-width: 3rem;
		width: var(--total-width);
		background-color: rgb(var(--color-surface-400));
		height: 4px;
		position: relative;
		border-radius: 1rem;
		transition: cubic-bezier(0.075, 0.82, 0.165, 1);
		&:after {
			position: absolute;
			left: calc(0px);
			border-radius: 999rem;
			width: var(--ball-width);
			height: var(--ball-width);
			background-color: rgb(var(--color-primary-500));
			box-shadow: 0 0 0.1rem rgb(var(--color-primary-500));
		}
		&:checked:after {
			left: calc(var(--total-width) - var(--ball-width) / 2);
		}
	}
	ul {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
