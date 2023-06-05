<script lang="ts">
	import type { BaseGridBuilder } from './js/BaseGridBuilder';
	import Switch from './fields/switch.svelte';
	import TextField from './fields/textField.svelte';
	import Select from './fields/select.svelte';

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
	<!-- <button on:click={() => (builder = builder)}>Rebuild Ui</button> -->
	<div class="columns">
		<TextField
			label="Search for columns"
			name="column-search"
			placeholder="filter"
			bind:value={search}
			><slot slot="icon"
				><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
					><title>magnify</title><path
						d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
					/></svg
				></slot
			></TextField
		>
		<ul>
			{#each filteredColumns as column}
				<li>
					<Switch
						label={column.label}
						name={column.id}
						value={!column.hidden}
						on:input={() => {
							column.hidden = !column.hidden;
							builder.buildData();
						}}
					/>
				</li>
			{/each}
		</ul>
	</div>
	<div class="sort">
		<h4>Sort by</h4>
		<ul>
			<li>
				<button on:click={() => addSorter()}>Add sorting layer</button>
			</li>
			{#each builder.sorters as sorter, i}
				<li>
					<Select
						label="Column"
						bind:value={sorter.columnId}
						options={builder.columns}
						on:input={() => builder.buildData()}
					/>
					<Select
						label="Direction"
						bind:value={sorter.isAsc}
						options={[
							{ id: true, label: 'Ascending' },
							{ id: false, label: 'Descending' }
						]}
						on:input={() => builder.buildData()}
					/>

					<button on:click={() => removeSorter(i)}>Remove sorting layer</button>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style lang="scss">
	.option-block {
		background-color: rgb(var(--color-surface-200));
		padding: 1rem 2rem;
		display: flex;
		gap: var(--size-8);
	}
	ul {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
