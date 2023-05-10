<script lang="ts">
	import type { BaseGridBuilder } from './js/BaseGridBuilder';

	export let builder: BaseGridBuilder;
</script>

<ul>
	{#each builder.columns as column}
		<li>
			<label>
				<p>{column.label}</p>
				<input
					type="checkbox"
					on:input={() => {
						column.hidden = !column.hidden;
						builder.buildData();
					}}
				/>
			</label>
		</li>
	{/each}
</ul>
