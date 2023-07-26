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
			{ id: 'referrer_consent', label: 'referrer Consent', searchable: false },
			{ id: 'additional_information', label: 'Additional Information', searchable: false },
		],
		url,
		mapper,
		rowLink: row => `${url}/${row.id}`,
		limit: 5,
	});

	import '$lib/default-styles.scss';
</script>

<svelte:head>
	<title>Shgrid</title>
</svelte:head>

<Shgrid hasOptions={false} canExpandRows={false} {builder} />
