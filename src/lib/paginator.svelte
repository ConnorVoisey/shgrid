<script lang="ts">
	import type { Data } from './index.js';
	import ArrowLeft from '~icons/mdi/arrow-left';
	import ArrowRight from '~icons/mdi/arrow-right';

	type Props = {
		offset: number;
		limit: number;
		data: Data | null;
		fetchData: () => void;
	};
	let { offset = $bindable(), limit, data, fetchData }: Props = $props();
</script>

<div class="shgrid_pkg-paginator">
	<div class="shgrid_pkg-paginator-left">
		<button
			class="shgrid_pkg-btn-primary"
			disabled={offset < 1}
			onclick={() => {
				offset -= limit;
				fetchData();
			}}
		>
			<ArrowLeft></ArrowLeft>
		</button>
		<p class="shgrid_pkg-paginator_p">
			{offset} - {offset + limit}{data?.count !== undefined ? ` of ${data.count}` : ''}
		</p>
		<button
			class="shgrid_pkg-btn-primary"
			disabled={data ? offset + limit >= data.count : true}
			onclick={() => {
				offset += limit;
				fetchData();
			}}
		>
			<ArrowRight></ArrowRight>
		</button>
	</div>
</div>

<style lang="scss">
</style>
