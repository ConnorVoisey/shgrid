<script lang="ts">
	type Example = { label: string; linkSegment: string; description: string; tags: string[] };
	const serverSideExamples: Example[] = [
		{
			label: 'Contacts',
			linkSegment: 'contacts',
			description: 'Fake contacts module',
			tags: [],
		},
		{
			label: 'Single Sort',
			linkSegment: 'single-layer-sort',
			description: 'Single layer sorting',
			tags: [],
		},
		{
			label: 'Multi Sort',
			linkSegment: 'multi-layer-sort',
			description: 'Multi layer sorting',
			tags: [],
		},
	];
</script>

<svelte:head>
	<title>Examples</title>
</svelte:head>
<div class="wrapper">
	<h1 class="title">Examples</h1>
	<h3>Server side examples</h3>
	<ul>
		{#each serverSideExamples as example}
			<li>
				<a href={`/examples/${example.linkSegment}`}>
					<h4>{example.label}</h4>
					<p>{example.description}</p>
					<ul>
						{#each example.tags as tag}
							<li class="tag">{tag}</li>
						{/each}
					</ul>
				</a>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	.wrapper {
		@include content-width;
        padding-top: size(16);
	}
</style>
