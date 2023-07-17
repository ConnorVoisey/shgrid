<script lang="ts">
	import Shgrid from '$lib/shgrid.svelte';
	import { ServerGridBuilder } from '$lib/js/ServerGridBuilder.js';
	import { PUBLIC_BASE_URL } from '$env/static/public';

	let mapper: ServerGridBuilder['mapper'] = (res: any) => {
		return {
			data: res.data,
			count: res.count,
		};
	};
	const url = `${PUBLIC_BASE_URL}/api/referral`;
	let builder = new ServerGridBuilder({
		columns: [
			{ id: 'id', label: 'Id', hidden: true },
			{
				id: 'name',
				label: 'Name',
				hidden: true,
				formatter: val => `prefix: ${val}`,
				link: val => `${url}/exampleCellLink/${val}`,
			},
			{ id: 'known_risks', label: 'Known Risks', hidden: true },
			{ id: 'referrer_consent', label: 'referrer Consent' },
			{ id: 'information_consent', label: 'Information Consent', hidden: true },
			{ id: 'description', label: 'Description', hidden: true },
			{ id: 'desired_outcome', label: 'Desired Outcome', hidden: true },
			{ id: 'additional_information', label: 'Additional Information' },
			{ id: 'declined', label: 'Declined', hidden: true },
		],
		url,
		mapper,
		rowLink: row => `${url}/${row.id}`,
	});

	import '$lib/default-styles.scss';
</script>

<section class="hero">
	<div class="left">
		<h4>Shgrid</h4>
		<h1>Create tables</h1>
		<h2>Easy and <span>Effortlessly</span></h2>
		<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut sed facere cum qui, ullam voluptatibus.</p>
		<div class="btn-group">
			<a href="/getting-started" class="btn-primary">Get Started</a>
			<a href="/examples" class="btn-primary-outline">Examples</a>
		</div>
	</div>
	<div class="right">
		<Shgrid {builder} />
	</div>
</section>

<style lang="scss">
	section {
		@include content-width(1100px);
	}
	.hero {
		display: flex;
		gap: size(16);
		padding: size(16) 0;
	}

	.left {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	h4,
	span {
		color: primary(4);
	}
	h1 {
		font-size: 55px;
	}
	h2 {
		font-size: 50px;
		margin-bottom: size(2);
	}
	h1,
	h2 {
		letter-spacing: -1px;
	}
	.btn-group {
		margin-top: size(4);
		@include flex-gap(8);
	}

	.right {
		max-width: 500px;
		max-height: 400px;
		overflow: auto;
	}
</style>
