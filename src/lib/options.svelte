<script lang="ts">
	import type { BaseGridBuilder } from './js/BaseGridBuilder';

	export let builder: BaseGridBuilder;
	let search: string = '';
	$: filteredColumns = builder.columns.filter((column) =>
		column.label.toLowerCase().includes(search.toLowerCase())
	);

	function addSorter() {
		const columnId = builder.columns?.[0]?.id ?? '';
		builder.sorters.push({ columnId, isAsc: true });
		builder = builder;
	}
	function removeSorter(index: number) {
		builder.sorters.splice(index, 1);
		builder.buildData();
	}
</script>

<div class="option-block">
	<button on:click={() => (builder = builder)}>Rebuild Ui</button>
	<div class="columns">
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
	<div class="sort">
		<ul>
			<li>
				<button on:click={() => addSorter()}>Add sorting layer</button>
			</li>
			{#each builder.sorters as sorter, i}
				<li>
					<label>
						<p>Column</p>
						<select
							value={sorter.columnId}
							on:input={(e) => {
								sorter.columnId = e.currentTarget.value;
								builder.buildData();
							}}
						>
							{#each builder.columns as column}
								<option value={column.id}>{column.label}</option>
							{/each}
						</select>
					</label>
					<label>
						<p>Direction</p>
						<select
							value={sorter.isAsc}
							on:input={(e) => {
								sorter.isAsc = e.currentTarget.value == 'true';
								builder.buildData();
							}}
						>
							<option value={true}>Ascending</option>
							<option value={false}>Descending</option>
						</select>
					</label>
					<button on:click={() => removeSorter(i)}>Remove sorting layer</button>
				</li>
			{/each}
		</ul>
	</div>
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
