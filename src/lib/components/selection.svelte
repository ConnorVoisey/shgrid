<script lang="ts" generics="T extends DefaultRow">
	import type { BaseGridBuilder } from '$lib/js/BaseGridBuilder';
	import type { DefaultRow } from '$lib/js/types';

	export let builder: BaseGridBuilder<T>;

	const clearSelection = () => {
		builder.selected?.clear();
		builder.listener?.();
	};
</script>

<div class="shgrid-pkg_selection-wrapper">
	{#if builder.selected?.size !== undefined}
		<p>{builder.selected.size} selected</p>
		<button class="shgrid-pkg_selection-clear-btn shgrid-pkg_btn" type="button" on:click={clearSelection}
			>Clear</button
		>
	{/if}
</div>
