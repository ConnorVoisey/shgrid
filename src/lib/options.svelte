<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import type { BaseGridBuilder } from './js/BaseGridBuilder';
	import Switch from './fields/switch.svelte';
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

<div class="shgrid-pkg_option-block">
	<div class="shgrid-pkg_options-columns">
		<h4 class="shgrid-pkg_columns-subtitle">Columns</h4>
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
				<li animate:flip={{ duration: flipDurationMs }} class="shgrid-pkg_column-option-row">
					<svg class="shgrid-pkg_options-column-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
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
