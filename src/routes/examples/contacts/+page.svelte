<script lang="ts">
	import Shgrid from '$lib/shgrid.svelte';
	import { ServerGridBuilder } from '$lib/js/ServerGridBuilder.js';
	import '$lib/default-styles.scss';
    import { PUBLIC_BASE_URL } from '$env/static/public';

	let mapper: ServerGridBuilder['mapper'] = (res: any) => {
		return {
			data: res.data,
			count: res.count
		};
	};
	type Row = {
		organisation: {
			name: string;
			id: string;
			postcode: string;
		};
	};
	const url = `${PUBLIC_BASE_URL}/api/contact`;
	let builder = new ServerGridBuilder({
		columns: [
			{ id: 'id', label: 'Id', hidden: true },
			{ id: 'firstName', label: 'First Name', hidden: true },
			{ id: 'lastName', label: 'Last Name', hidden: true },
			{ id: 'email', label: 'Email' },
			{
				id: 'organisation',
				label: 'Organisation',
				formatter: (row: Row) =>
					`<p><strong>Name: </strong>${row.organisation.name}</p><p><strong>Postcode: </strong>${row.organisation.postcode}</p>`,
				link: (row) => `/examples/data/organisation/${(row as Row).organisation.id}`
			},
			{ id: 'active', label: 'Active', hidden: true },
			{ id: 'mobile', label: 'Mobile', hidden: true },
			{ id: 'officePhone', label: 'Office Phone' },
			{ id: 'postcode', label: 'Postcode', hidden: true }
		],
		url,
		mapper,
		rowLink: (row) => `${url}/${row.id}`
	});
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
		gap: var(--size-8);
	}
</style>
