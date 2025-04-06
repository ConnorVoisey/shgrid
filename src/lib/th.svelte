<script lang="ts">
	import Svelecte from 'svelecte';
	import type { Column, Sorter } from './index.js';
	import Sort from '~icons/mdi/sort';
	import SortAsc from '~icons/mdi/sort-alphabetical-ascending';
	import SortDesc from 'virtual:icons/mdi/sort-alphabetical-descending';

	type Props = {
		column: Column;
		sorter?: Sorter;
		sortCol: () => void;
		setFilter: (filter: any) => Promise<void>;
	};
	let { column = $bindable(), setFilter, sorter, sortCol }: Props = $props();
</script>

<th class="shgrid_pkg-th">
	<div class="shgrid_pkg-th-wrapper">
		{#if column.sortable}
			<button
				onclick={() => (column.sortable ? sortCol() : null)}
				class:sortable={column.sortable}
				class="shgrid_pkg-th-btn"
			>
				<span>{column.label ?? column.key}</span>
				{#if column.sortable}
					{#if sorter === undefined}
						<Sort></Sort>
					{:else if sorter.dir === 'asc'}
						<SortAsc></SortAsc>
					{:else}
						<SortDesc></SortDesc>
					{/if}
				{/if}
			</button>
		{:else}
			<div class="shgrid_pkg-th-div">
				<span>{column.label ?? column.key}</span>
			</div>
		{/if}
		{#if column.filter}
			{#if column.filter.type === 'string'}
				<input
					class="shgrid_pkg-th-input"
					type="text"
					bind:value={
						() => column.filter.value,
						(val) => {
							setFilter(val);
						}
					}
				/>
			{:else if column.filter.type === 'number'}
				<input
					class="shgrid_pkg-th-input"
					type="number"
					step={column.filter.step}
					min={column.filter.min}
					max={column.filter.max}
					bind:value={
						() => column.filter.value,
						(val) => {
							column.filter.value = val;
							onInputInternal();
						}
					}
				/>
			{:else if column.filter.type === 'select'}
				<Svelecte
					bind:value={
						() => column.filter.value,
						(val) => {
							column.filter.value = val;
							onInputInternal();
						}
					}
					options={column.filter.options}
					multiple={column.filter.multiple}
					{...column.filter.svelecteArgs}
				></Svelecte>
			{/if}
		{/if}
	</div>
</th>

<style lang="scss">
	.shgrid_pkg-th-wrapper {
		display: flex;
		flex-direction: column;
	}
</style>
