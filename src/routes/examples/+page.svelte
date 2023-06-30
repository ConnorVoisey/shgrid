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

<h1>Examples</h1>
<h3>Server side examples</h3>
<ul>
	{#each serverSideExamples as example}
		<li>
			<a href={`/examples/${example.linkSegment}`}>
				<h4>{example.label}</h4>
				<p>{example.description}</p>
				<hr />
				<ul>
					{#each example.tags as tag}
						<li>{tag}</li>
					{/each}
				</ul>
			</a>
		</li>
	{/each}
</ul>
