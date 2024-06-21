<script lang="ts" generics="T extends DefaultRow">
	import type { DefaultRow } from './js/types';
	import type { BaseGridBuilder } from './js/BaseGridBuilder';

	export let builder: BaseGridBuilder<T>;
	$: page = Math.floor(builder.paginator.offset / builder.paginator.limit);
	$: highestPage = Math.floor(builder.count / builder.paginator.limit);
	let inputValue = page ?? 0;
</script>

<form class="shgrid-pkg_pagination">
	<div class="shgrid-pkg_pagination-btns">
		<button
			type="button"
			disabled={page < 1}
			class="shgrid-pkg_pagination-btn"
			on:click={() => builder.setPage(page - 1)}
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="shgrid-pkg_paginator-btn-svg"
				><title>Previous Page</title><path
					d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"
				/></svg
			>
		</button>
		<p class="shgrid-pkg_paginator-text">Page {page + 1} of {highestPage + 1}</p>
		<button
			type="button"
			disabled={page >= highestPage}
			class="shgrid-pkg_pagination-btn"
			on:click={() => builder.setPage(page + 1)}
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="shgrid-pkg_paginator-btn-svg"
				><title>Next Page</title><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg
			>
		</button>
	</div>
	{#if builder.paginator.limitOptions !== null}
		<div style="position: relative; display: flex; flex-direction: row; text-align: center">
			<p class="shgrid-pkg_pagination-search-input shgrid-pkg_paginator-text-no-before" >Per Page</p>
			<select
				on:change={e => builder.buildData()}
				bind:value={builder.paginator.limit}
				class="shgrid-pkg_pagination-select"
				style="border-top-left-radius: 0; border-bottom-left-radius: 0; padding-left: 0;"
			>
				{#each builder.paginator.limitOptions as option}
					<option value={option}>{option}</option>
				{/each}
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>chevron-down</title><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
			</select>
			
		</div>
	{/if}
	<div class="shgrid-pkg_pagination-search-wrapper">
		<p class="shgrid-pkg_pagination-search-input shgrid-pkg_paginator-text-no-before" >Page</p>
		<input
			class="shgrid-pkg_pagination-search-input"
			style="border-top-left-radius: 0; border-bottom-left-radius: 0"
			type="number"
			on:input={e => (inputValue = +e.currentTarget.value - 1)}
			value={page + 1}
			max={1 + builder.count / builder.paginator.limit}
			min={1}
		/>
		<button class="shgrid-pkg_pagination-search-btn" on:click={() => builder.setPage(inputValue)} type="button"
			>Go &rarr;</button
		>
	</div>
</form>
