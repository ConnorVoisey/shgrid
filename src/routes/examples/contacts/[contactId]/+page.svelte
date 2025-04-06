<script lang="ts">
	import type { PageProps } from './$types.js';

	let { data }: PageProps = $props();
</script>

<h1>This is simply a demo page to show that Shgrid does link to the correct record.</h1>
<pre>{JSON.stringify({ contact: data.contact }, null, 4)}</pre>
