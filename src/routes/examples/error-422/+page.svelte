<script lang="ts">
	import Shgrid from '$lib/shgrid.svelte';
	import { ServerGridBuilder } from '$lib/js/ServerGridBuilder.js';
	import { env } from '$env/dynamic/public';
	import type { ContactRow } from '../../../docLib/types';
	console.log(env.PUBLIC_API_URL);
	type InvalidContactRow = ContactRow & { invalid: string };

	let mapper: ServerGridBuilder<InvalidContactRow>['mapper'] = (res: any) => {
		return {
			data: res.data,
			count: res.count,
		};
	};
	const url = `${env.PUBLIC_API_URL}/contact`;
	let builder = new ServerGridBuilder<InvalidContactRow>({
		columns: [
			{ id: 'first_name', label: 'First Name', searchable: true },
			{ id: 'last_name', label: 'Last Name', searchable: true },
			{ id: 'invalid', label: 'Invalid Field', searchable: true },
		],
		sorters: [['invalid', 'asc']],
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

<p>
	In this example the client has made the organisation field sortable in shgrid but not in the backend api. The
	backend returns a 422 when the user attempts to sort by this field. To test this you can toggle sorting the
	organisation field.
</p>
<Shgrid hasOptions={true} canExpandRows={false} {builder} />
