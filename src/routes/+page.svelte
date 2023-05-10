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
			{ id: 'id', label: 'Id' },
			{ id: 'name', label: 'Name' },
			{ id: 'known_risks', label: 'Known Risks' },
			{ id: 'referrer_consent', label: 'referrer Consent' },
			{ id: 'information_consent', label: 'Information Consent' },
			{ id: 'description', label: 'Description' },
			{ id: 'desired_outcome', label: 'Desired Outcome' },
			{ id: 'additional_information', label: 'Additional Information' },
			{ id: 'declined', label: 'Declined' }
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
