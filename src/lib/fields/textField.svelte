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

<div class="wrapper">
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

<style lang="scss">
	.wrapper {
		display: flex;
		flex-direction: column;
		gap: var(--size-1);
	}
	label {
		display: grid;
		grid-template-columns: max-content 1fr;
		grid-template-rows: max-content 1fr max-content;
		grid-template-areas:
			'label label'
			'icon input'
			'underline underline';
		span {
			grid-area: icon;
			padding: var(--size-2);
			padding-bottom: 0;
		}
		input {
			grid-area: input;
		}
		p {
			grid-area: label;
			font-weight: var(--fw-semibold);
		}
		.underline {
			grid-area: underline;
		}
		input,
		p {
			transition: color var(--transition-200);
		}
	}

	input:focus,
	input:focus + p {
		color: rgb(var(--color-primary-500));
	}
	:global(input:focus + p + span svg) {
		fill: rgb(var(--color-primary-500));
	}
	input:focus + p + span + .underline::after {
		background-size: 0 0.1em, 100% 0.1em;
	}
	.underline::after {
		content: '';
		display: block;
		height: 4px;
		width: 100%;
		background: linear-gradient(
				to right,
				rgb(var(--color-surface-500)),
				rgb(var(--color-surface-600))
			),
			linear-gradient(to right, rgb(var(--color-primary-400)), rgb(var(--color-primary-700)));
		background-size: 100% 0.1em, 0 0.1em;
		background-position: 100% 100%, 0 100%;
		background-repeat: no-repeat;
		transition: background-size 0.4s;
	}
	.error {
		color: rgb(var(--color-error-500));
		font-weight: var(--fw-semibold);
		width: 100%;
	}
</style>
