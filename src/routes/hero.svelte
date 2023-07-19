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

<div class="gradients">
	<section>
		<div class="left">
			<h4>It makes tables</h4>
			<h1 class="title">
				Create tables
				<br />Easy and <span>Effortlessly</span>
			</h1>
			<p>
				A table library for both <span><a href="https://svelte.dev" target="_blank">Svelte</a></span> and vanilla
				Javascript.
			</p>
			<div class="btn-group">
				<a href="/getting-started" class="btn-primary">Get Started &rarr;</a>
				<a href="/examples" class="btn-primary-outline">Examples</a>
			</div>
		</div>
		<div class="right">
			<Shgrid hasOptions={false} canExpandRows={false} {builder} />
		</div>
	</section>
</div>

<style lang="scss">
	.gradients {
		position: relative;
		&::after {
			@include pseudo;
			background: radial-gradient(50% 50% at 50% 50%, rgba(13, 148, 136, 0.5) 0%, rgba(217, 217, 217, 0) 100%);
			bottom: -400px;
			left: -400px;
			width: 796px;
			height: 796px;
			z-index: -1;
		}
	}
	section {
		@include content-width(1100px);
		display: flex;
		gap: size(16);
		padding: size(24) 0;

		@media (max-width: 700px) {
			& {
				flex-direction: column;
		gap: size(8);
			}
		}
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
	h4 {
		margin-bottom: size(2);
	}
	h1 {
		font-size: 48px;
		letter-spacing: -0.4px;
		margin-bottom: size(4);

		@media (max-width: 700px) {
			& {
				font-size: 30px;
			}
		}
	}
	.btn-group {
		margin-top: size(8);
		@include flex-gap(8);

		@media (max-width: 700px) {
			& {
				flex-direction: column;
				gap: size(4);
			}
		}
	}

	.right {
		max-width: 500px;
		max-height: 400px;
		position: relative;
		&::before {
			@include pseudo;
			z-index: -1;
			width: 585px;
			height: 585px;
			right: -280px;
			top: -280px;
			background: radial-gradient(50% 50% at 50% 50%, rgba(13, 148, 136, 0.2) 0%, rgba(217, 217, 217, 0) 100%);
		}
	}
</style>
