<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import type { BaseGridBuilder } from '$lib/js/BaseGridBuilder';
	import Select from '../../fields/select.svelte';

	export let builder: BaseGridBuilder;
	export let rerender: Function;
	export let flipDurationMs = 300;

	const getSorters = (builder: BaseGridBuilder) =>
		builder.sorters.map((sorter, id) => ({ key: sorter[0], dir: sorter[1], id }));
	let sorters = getSorters(builder);
	$: _ = () => {
		// console.log('rerender sorter');
		sorters = getSorters(builder);
	};

	function addSorter() {
		const columnId = builder.columns?.[0]?.id ?? '';
		builder.sorters.push([columnId, 'asc']);
		builder.buildData();
		sorters = getSorters(builder);
	}
	function removeSorter(index: number) {
		builder.sorters.splice(index, 1);
		builder.buildData();
		sorters = getSorters(builder);
	}
</script>

<div class="shgrid-pkg_options-sorters">
	<p class="shgrid-pkg_sorters-subtitle">Sorting</p>
	<ul
		use:dndzone={{ items: sorters, flipDurationMs, dropFromOthersDisabled: true }}
		on:consider={e => (sorters = e.detail.items)}
		on:finalize={e => {
			sorters = e.detail.items;
			builder.sorters = sorters.map(pair => [pair.key, pair.dir]);
			rerender();
		}}
	>
		{#each sorters as sorter, i (sorter.id)}
			<li animate:flip={{ duration: flipDurationMs }} class="shgrid-pkg_option-sorter-row">
				<p>{i === 0 ? 'Sort by' : 'Then by'}</p>
				<svg class="shgrid-pkg_sorter-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
					><title>drag</title><path
						d="M7,19V17H9V19H7M11,19V17H13V19H11M15,19V17H17V19H15M7,15V13H9V15H7M11,15V13H13V15H11M15,15V13H17V15H15M7,11V9H9V11H7M11,11V9H13V11H11M15,11V9H17V11H15M7,7V5H9V7H7M11,7V5H13V7H11M15,7V5H17V7H15Z"
					/></svg
				>
				<Select
					value={sorter.key}
					on:input={e => {
						builder.sorters[i][0] = e.detail.value;
						builder.buildData();
					}}
					options={builder.columns}
				/>
				<Select
					value={sorter.dir}
					on:input={e => {
						builder.sorters[i][1] = e.detail.value;
						builder.buildData();
					}}
					options={[
						{ id: 'asc', label: 'Ascending' },
						{ id: 'desc', label: 'Descending' },
					]}
					on:input={() => builder.buildData()}
				/>

				<button class="shgrid-pkg_sorter-btn-error" on:click={() => removeSorter(i)}>
					<svg class="shgrid-pkg_sorter-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
						><title>Remove sorting layer</title><path d="M19,13H5V11H19V13Z" /></svg
					>
				</button>
			</li>
		{/each}
	</ul>
	<button class="shgrid-pkg_btn-add-sorter" on:click={() => addSorter()}>
		<span>Add Sorting Layer</span>
		<svg class="shgrid-pkg_sorter-add-sorter-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
			><title>Add sorting layer</title><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg
		>
	</button>
</div>
