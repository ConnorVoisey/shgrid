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
		<p class="shgrid-pkg_paginator-text">{page + 1} of {highestPage + 1}</p>
		<button
			type="button"
			disabled={page >= highestPage}
			class="shgrid-pkg_pagination-btn"
			on:click={() => builder.setPage(page + 1)}
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="shgrid-pkg_paginator-btn-svg"
				><title>Next Page</title><path
					d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
				/></svg
			>
		</button>
	</div>
	<div class="shgrid-pkg_pagination-search-wrapper">
		<input
			class="shgrid-pkg_pagination-search-input"
			type="number"
			on:input={e => (inputValue = +e.currentTarget.value - 1)}
			value={page + 1}
			max={1 + builder.count / builder.paginator.limit}
			min={1}
		/>
		<button class="shgrid-pkg_pagination-search-btn" on:click={() => builder.setPage(inputValue)} type="button">Go &rarr;</button>
	</div>
</form>
