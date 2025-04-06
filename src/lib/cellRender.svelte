<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Column, Row } from './index.js';

	type Props = {
		column: Column;
		row: Row;
		currentlyHoveringHref: null | string;
		aSnippet?: Snippet<[string]>;
	};
	let { column, row, currentlyHoveringHref = $bindable(), aSnippet }: Props = $props();
</script>

{#if 'type' in column.cellRender}
	{#if column.cellRender.type === 'custom'}
		{@render column.cellRender.snippet(row, column)}
	{:else}
		{@const href = column.cellRender?.link?.(row, column)}
		{@const label = column.cellRender.label(row, column)}
		<td class="shgrid_pkg-td">
			<p
				class:shgrid_pkg-td-link={href}
				class:shgrid_pkg-td-link-highlight={column.cellRender.highlightLink}
			>
				{label}
			</p>
			{#if href}
				<div
					class:shgrid_pkg-a-wrapper-hovering={currentlyHoveringHref === href}
					class="shgrid_pkg-a-wrapper"
					aria-label={label}
					onblur={() => {
						currentlyHoveringHref = null;
					}}
					onmouseover={() => {
						currentlyHoveringHref = href;
					}}
					onmouseout={() => {
						currentlyHoveringHref = null;
					}}
					onfocus={() => {
						currentlyHoveringHref = href;
					}}
				>
					{#if aSnippet}
						{@render aSnippet(href)}
					{:else}
						<a {href}></a>
					{/if}
				</div>
			{/if}
		</td>
	{/if}
{:else}
	<td class="shgrid_pkg-td">{column.cellRender(row, column)}</td>
{/if}
