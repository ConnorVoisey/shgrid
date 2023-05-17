<script lang="ts">
	import Shgrid from '$lib/shgrid.svelte';
	import { ServerGridBuilder } from '$lib/js/ServerGridBuilder.js';

	let mapper: (data: unknown) => { data: string[][]; count: number } = (res: any) => {
		return {
			data: builder.mapToString(res.data),
			count: res.count
		};
	};
	let builder = new ServerGridBuilder({
		columns: [
			{ id: 'id', label: 'Id', hidden: true },
			{
				id: 'name',
				label: 'Name',
				formatter: (val) => `prefix: ${val}`
			},
			{ id: 'known_risks', label: 'Known Risks', hidden: true },
			{ id: 'referrer_consent', label: 'referrer Consent' },
			{ id: 'information_consent', label: 'Information Consent', hidden: true },
			{ id: 'description', label: 'Description', hidden: true },
			{ id: 'desired_outcome', label: 'Desired Outcome', hidden: true },
			{ id: 'additional_information', label: 'Additional Information' },
			{ id: 'declined', label: 'Declined', hidden: true }
		],
		url: 'http://localhost:5173/api/referral',
		mapper
	});

	import '$lib/default-styles.scss';
</script>

<section class="hero">
	<div class="left">
		<h2>Shgrid</h2>
		<p>It makes tables</p>
	</div>
	<div class="right">
		<Shgrid {builder} />
	</div>
</section>

<style lang="scss">
	.hero {
		display: flex;
		gap: var(--size-800);
	}
</style>
