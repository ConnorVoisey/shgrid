<script lang="ts">
	export let value: unknown = '';
	export let error: string | undefined = undefined;

	export let type = 'text';
	export let name: string;
	export let label: string;
	export let placeholder = label;
	export let required = false;

	const handleInput = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
		value = type.match(/^(number|range)$/) ? +e.currentTarget.value : e.currentTarget.value;
	};
</script>

<div class="shgrid-text-field-wrapper">
	{#if error}
		<p class="error">{error}</p>
	{/if}
	<label>
		<input {type} {value} id={name} {name} {placeholder} {required} on:input={handleInput} />
		<p>{label}</p>
		<span><slot name="icon" /></span>
		<div class="underline" />
	</label>
</div>
