<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import type { BaseGridBuilder } from './js/BaseGridBuilder';
	import Switch from './fields/switch.svelte';
	import Select from './fields/select.svelte';
	import Sorter from './components/options/sorter.svelte';

	export let builder: BaseGridBuilder;
	export let rerender: Function;
	let columns = builder.columns;
	let sorters = getSorterWithId(builder);
	// $: _ = (() => (sorters = getSorterWithId(builder)))();

	function getSorterWithId(builder: BaseGridBuilder) {
		return builder.sorters.map((sorter, i) => {
			return { id: i, key: sorter[0], dir: sorter[1] };
		});
	}

	const flipDurationMs = 300;
</script>

<div class="option-block">
	<div class="columns">
		<h4 class="subtitle">Columns</h4>
		<ul
			use:dndzone={{ items: columns, flipDurationMs, dropFromOthersDisabled: true }}
			on:consider={e => {
				console.dir({ items: e.detail.items, columns });
				columns = e.detail.items;
				rerender();
			}}
			on:finalize={e => {
				builder.columns = e.detail.items;
				columns = [...builder.columns];
				console.log({ columns });
				rerender();
			}}
		>
			{#each columns as column, i (column.id)}
				<li animate:flip={{ duration: flipDurationMs }} class="column-option-row">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
						><title>drag</title><path
							d="M7,19V17H9V19H7M11,19V17H13V19H11M15,19V17H17V19H15M7,15V13H9V15H7M11,15V13H13V15H11M15,15V13H17V15H15M7,11V9H9V11H7M11,11V9H13V11H11M15,11V9H17V11H15M7,7V5H9V7H7M11,7V5H13V7H11M15,7V5H17V7H15Z"
						/></svg
					>
					<label for={column.id}>{column.label}</label>
					<Switch
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
	<Sorter {builder} {rerender} />
</div>

<style lang="scss">
	.option-block {
		background-color: surface(2);
		padding: 1rem 2rem;
		display: flex;
		flex-wrap: wrap;
		gap: size(8) size(16);
	}
	ul {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	li {
		display: flex;
		gap: size(4);
	}
	.columns-label {
		display: grid;
		gap: 0 size(4);
		grid-template-columns: size(8) 1fr;
		grid-template-areas:
			'label label'
			'icon field';
		.subtitle {
			grid-area: label;
		}
		svg {
			grid-area: icon;
		}
		input {
			grid-area: field;
		}
		margin-bottom: size(4);
	}
	.column-option-row {
		display: grid;
		grid-template-columns: 2rem 1fr max-content;
		align-items: center;
	}
	.sorter-option-row {
		display: grid;
		grid-template-columns: 4rem 2rem 1fr 1fr max-content;
		align-items: center;
	}
	.btn-error {
		padding: size(1) size(2);
	}
</style>
