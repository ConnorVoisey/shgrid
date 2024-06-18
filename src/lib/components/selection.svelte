<script lang="ts" generics="T extends DefaultRow">
	import type { BaseGridBuilder } from '$lib/js/BaseGridBuilder';
	import type { DefaultRow } from '$lib/js/types';
	import { createEventDispatcher } from 'svelte';

	export let builder: BaseGridBuilder<T>;

	const dispatch = createEventDispatcher();
	const clearSelection = () => {
		builder.selected?.clear();
		dispatch('updatedSelection', builder.selected);
		builder.listener?.();
	};
</script>
