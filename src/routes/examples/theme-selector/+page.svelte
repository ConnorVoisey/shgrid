<script lang="ts">
	import Shgrid from '$lib/shgrid.svelte';
	import { ServerGridBuilder } from '$lib/js/ServerGridBuilder.js';
	import '$lib/default-styles.scss';
	import { env } from '$env/dynamic/public';
	import type { ContactRow } from '../../../docLib/types';

	const url = `${env.PUBLIC_API_URL}/contact`;
	let builder = new ServerGridBuilder<ContactRow>({
		columns: [
			{ id: 'id', label: 'Id', hidden: true },
			{ id: 'first_name', label: 'First Name', hidden: true },
			{ id: 'last_name', label: 'Last Name', hidden: true },
			{ id: 'email', label: 'Email' },
			{
				id: 'organisation',
				label: 'Organisation',
				formatter: row =>
					`<p><strong>Name: </strong>${row?.organisation?.name}</p><p><strong>Postcode: </strong>${row?.organisation?.postcode}</p>`,
				link: row => `/examples/data/organisation/${row?.organisation?.id}`,
				sortable: false,
				searchable: false,
			},
			{ id: 'active', label: 'Active', hidden: true },
			{ id: 'mobile', label: 'Mobile' },
			{ id: 'postcode', label: 'Postcode', hidden: true },
		],
		url,
		rowLink: row => `${url}/${row.id}`,
	});

	const themeOptions = ['light', 'dark', 'catppuccin'];
	let theme = 'light';
</script>

<div class={`${theme} wrapper`}>
	<label>
		<h1>Theme</h1>
		<select bind:value={theme}>
			{#each themeOptions as option}
				<option value={option}>{option}</option>
			{/each}
		</select>
	</label>
	<Shgrid {builder} />
</div>

<style lang="scss">
	.wrapper {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		background-color: hsl(var(--clr-surface-0));
		color: hsl(var(--clr-on-surface-0));
		select {
			padding: 0.5rem 1rem;
			border-radius: 0.5rem;
			background-color: hsl(var(--clr-surface-1));
			color: hsl(var(--clr-on-surface-1));
			border: solid 2px hsl(var(--clr-secondary-5));
			transition: border 200ms;
			&:hover {
				border: solid 2px hsl(var(--clr-primary-5));
			}
		}
		h1 {
			border-bottom: solid 2px hsl(var(--clr-primary-5));
		}
	}
	.wrapper {
		/***
	** Colors
	***/
		/* primary #134e4a */
		--clr-primary-0: 176, 35%, 93%; /* #e7f3f3 */
		--clr-primary-1: 176, 34%, 85%; /* #cce6e4 */
		--clr-primary-2: 176, 32%, 75%; /* #abd4d1 */
		--clr-primary-3: 176, 30%, 64%; /* #88bfbb */
		--clr-primary-4: 176, 41%, 34%; /* #337a76 */
		--clr-primary-5: 176, 61%, 19%; /* #134e4a */
		--clr-primary-6: 176, 66%, 16%; /* #0e4440 */
		--clr-primary-7: 176, 70%, 14%; /* #0b3d39 */
		--clr-primary-8: 176, 79%, 9%; /* #052927 */
		--clr-primary-9: 176, 85%, 7%; /* #03211f */
		/* on primary #f1ecec */
		--clr-on-primary-0: 0, 15%, 97%; /* #f8f6f6 */
		--clr-on-primary-1: 0, 15%, 94%; /* #f2eded */
		--clr-on-primary-2: 0, 0%, 98%; /* ##FAFAFA */

		/* secondary #cd744b */
		--clr-secondary-0: 19, 93%, 98%; /* #fff8f5 */
		--clr-secondary-1: 19, 90%, 95%; /* #feeee7 */
		--clr-secondary-2: 19, 86%, 91%; /* #fce1d4 */
		--clr-secondary-3: 19, 82%, 87%; /* #f9d4c3 */
		--clr-secondary-4: 19, 68%, 69%; /* #e69c7a */
		--clr-secondary-5: 19, 57%, 55%; /* #ce744b */
		--clr-secondary-6: 19, 53%, 51%; /* #c46a40 */
		--clr-secondary-7: 19, 55%, 47%; /* #ba6036 */
		--clr-secondary-8: 19, 64%, 37%; /* #9b4822 */
		--clr-secondary-9: 19, 70%, 31%; /* #863b18 */
		/* on secondary #f5f5f5 */
		--clr-on-secondary-0: 0, 0%, 99.07843137254902%; /* #fdfdfd */
		--clr-on-secondary-1: 0, 0%, 96.07843137254902%; /* #f5f5f5 */
		--clr-on-secondary-2: 0, 0%, 93.07843137254902%; /* #ededed */

		/* surface #3e403f */
		--clr-surface-0: 150, 0%, 95%; /* #f2f2f2 */
		--clr-surface-1: 150, 0%, 89%; /* #e3e3e3 */
		--clr-surface-2: 150, 1%, 81%; /* #cecfcf */
		--clr-surface-3: 150, 1%, 72%; /* #b7b8b8 */
		--clr-surface-4: 150, 1%, 42%; /* #6a6c6b */
		--clr-surface-5: 150, 2%, 25%; /* #3e4140 */
		--clr-surface-6: 150, 4%, 21%; /* #333836 */
		--clr-surface-7: 150, 7%, 18%; /* #2b312e */
		--clr-surface-8: 150, 15%, 11%; /* #18201c */
		--clr-surface-9: 150, 22%, 7%; /* #0e1612 */
		/* on surface #393236 */
		--clr-on-surface-0: 240, 7%, 14%; /* #222225 */
		--clr-on-surface-1: 240, 6%, 12%; /* #1d1d20 */
		--clr-on-surface-2: 240, 6%, 10%; /* #18181B */

		/* success #36d399 */
		--clr-success-0: 158, 95%, 97%; /* #f0fff9 */
		--clr-success-1: 158, 92%, 94%; /* #e2fef3 */
		--clr-success-2: 158, 89%, 90%; /* #cffcec */
		--clr-success-3: 158, 86%, 84%; /* #b3f9e0 */
		--clr-success-4: 158, 75%, 65%; /* #63e9b8 */
		--clr-success-5: 158, 64%, 52%; /* #36d399 */
		--clr-success-6: 158, 64%, 48%; /* #2cc98f */
		--clr-success-7: 158, 68%, 44%; /* #24bc85 */
		--clr-success-8: 158, 78%, 35%; /* #149f6c */
		--clr-success-9: 158, 83%, 29%; /* #0d875a */
		/* on success #3c3c3c */
		--clr-on-success-0: 0, 0%, 26.52941176470588%; /* #444444 */
		--clr-on-success-1: 0, 0%, 23.52941176470588%; /* #3c3c3c */
		--clr-on-success-2: 0, 0%, 20.52941176470588%; /* #343434 */

		/* warning #fbbd23 */
		--clr-warning-0: 43, 100%, 97%; /* #fffbf0 */
		--clr-warning-1: 43, 99%, 93%; /* #fff5db */
		--clr-warning-2: 43, 99%, 88%; /* #ffeec2 */
		--clr-warning-3: 43, 99%, 83%; /* #ffe6a9 */
		--clr-warning-4: 43, 97%, 66%; /* #fccd54 */
		--clr-warning-5: 43, 96%, 56%; /* #fbbd23 */
		--clr-warning-6: 43, 88%, 53%; /* #f1b51e */
		--clr-warning-7: 43, 81%, 49%; /* #e2a918 */
		--clr-warning-8: 43, 88%, 41%; /* #c5900d */
		--clr-warning-9: 43, 91%, 35%; /* #aa7c08 */
		/* on warning #3c3c3c */
		--clr-on-warning-0: 0, 0%, 26.52941176470588%; /* #444444 */
		--clr-on-warning-1: 0, 0%, 23.52941176470588%; /* #3c3c3c */
		--clr-on-warning-2: 0, 0%, 20.52941176470588%; /* #343434 */

		/* error #f87272 */
		--clr-error-0: 0, 99%, 98%; /* #fff5f5 */
		--clr-error-1: 0, 98%, 96%; /* #ffebeb */
		--clr-error-2: 0, 97%, 94%; /* #ffe1e1 */
		--clr-error-3: 0, 96%, 91%; /* #fed2d2 */
		--clr-error-4: 0, 93%, 79%; /* #fb9898 */
		--clr-error-5: 0, 91%, 71%; /* #f87272 */
		--clr-error-6: 0, 80%, 66%; /* #ee6363 */
		--clr-error-7: 0, 70%, 61%; /* #e15656 */
		--clr-error-8: 0, 54%, 49%; /* #c03939 */
		--clr-error-9: 0, 60%, 41%; /* #a72a2a */
		/* on error #3c3c3c */
		--clr-on-error-0: 0, 0%, 26.52941176470588%; /* #444444 */
		--clr-on-error-1: 0, 0%, 23.52941176470588%; /* #3c3c3c */
		--clr-on-error-2: 0, 0%, 20.52941176470588%; /* #343434 */
	}
	.dark,
	.dark .shgrid-wrapper {
		/* surface #3e403f */
		--clr-surface-0: 150, 22%, 7%; /* #0e1612 */
		--clr-surface-1: 150, 15%, 11%; /* #18201c */
		--clr-surface-2: 150, 7%, 18%; /* #2b312e */
		--clr-surface-3: 150, 4%, 21%; /* #333836 */
		--clr-surface-4: 150, 2%, 25%; /* #3e4140 */
		--clr-surface-5: 150, 1%, 42%; /* #6a6c6b */
		--clr-surface-6: 150, 1%, 72%; /* #b7b8b8 */
		--clr-surface-7: 150, 1%, 81%; /* #cecfcf */
		--clr-surface-8: 150, 0%, 89%; /* #e3e3e3 */
		--clr-surface-9: 150, 0%, 95%; /* #f2f2f2 */
		/* on surface #d9cfd4 */
		--clr-on-surface-0: -30, 12%, 86%; /* #e0d7db */
		--clr-on-surface-1: -30, 12%, 83%; /* #d9ced4 */
		--clr-on-surface-2: -30, 12%, 80%; /* #d2c6cc */
	}
	:global(body) .catppuccin,
	:global(body) .catppuccin :global(.shgrid-wrapper) {
		/***
	** Colors
	***/

		/* primary #74c7ec */
		--clr-primary-0: 199, 76%, 69%; /* #74c6ec */
		--clr-primary-1: 199, 76%, 67%; /* #6bc2eb */
		--clr-primary-2: 199, 76%, 64%; /* #5dbde9 */
		--clr-primary-3: 199, 76%, 62%; /* #54b9e8 */
		--clr-primary-4: 199, 76%, 59%; /* #47b4e6 */
		--clr-primary-5: 199, 76%, 56%; /* #3aaee4 */
		--clr-primary-6: 199, 76%, 52%; /* #28a7e2 */
		--clr-primary-7: 199, 76%, 46%; /* #1c96ce */
		--clr-primary-8: 199, 76%, 42%; /* #1a89bc */
		--clr-primary-9: 199, 76%, 39%; /* #187faf */
		/* on primary #0c0c0c */
		--clr-on-primary-0: 0, 0%, 7.705882352941177%; /* #141414 */
		--clr-on-primary-1: 0, 0%, 4.705882352941177%; /* #0c0c0c */
		--clr-on-primary-2: 0, 0%, 1.7058823529411766%; /* #040404 */

		/* secondary #eba0ac */
		--clr-secondary-0: -10, 65%, 77%; /* #ea9eab */
		--clr-secondary-1: -10, 65%, 75%; /* #e996a4 */
		--clr-secondary-2: -10, 65%, 72%; /* #e68999 */
		--clr-secondary-3: -10, 65%, 70%; /* #e48191 */
		--clr-secondary-4: -10, 65%, 66%; /* #e17083 */
		--clr-secondary-5: -10, 65%, 63%; /* #de6378 */
		--clr-secondary-6: -10, 65%, 58%; /* #da4e65 */
		--clr-secondary-7: -10, 65%, 51%; /* #d3314c */
		--clr-secondary-8: -10, 65%, 47%; /* #c62a44 */
		--clr-secondary-9: -10, 65%, 43%; /* #b5263e */
		/* on secondary #0c0c0c */
		--clr-on-secondary-0: 0, 0%, 7.705882352941177%; /* #141414 */
		--clr-on-secondary-1: 0, 0%, 4.705882352941177%; /* #0c0c0c */
		--clr-on-secondary-2: 0, 0%, 1.7058823529411766%; /* #040404 */

		/* surface #1e1e2e */
		--clr-surface-0: 240, 21%, 15%;
		--clr-surface-1: 240, 21%, 19%;
		--clr-surface-2: 240, 21%, 21%;
		--clr-surface-3: 240, 21%, 24%;
		--clr-surface-4: 240, 21%, 26%;
		--clr-surface-5: 240, 21%, 29%;
		--clr-surface-6: 240, 21%, 35%;
		--clr-surface-7: 240, 21%, 40%;
		--clr-surface-8: 240, 21%, 43%;
		--clr-surface-9: 240, 21%, 49%;
		--clr-on-surface-0: 0, 0%, 100%;
		--clr-on-surface-1: 0, 0%, 98.4313725490196%;
		--clr-on-surface-2: 0, 0%, 95.4313725490196%;

		/* success #a6e3a1 */
		--clr-success-0: 115, 54%, 76%; /* #a6e3a1 */
		--clr-success-1: 115, 54%, 74%; /* #9fe199 */
		--clr-success-2: 115, 54%, 71%; /* #94dd8d */
		--clr-success-3: 115, 54%, 69%; /* #8cdb85 */
		--clr-success-4: 115, 54%, 65%; /* #7ed676 */
		--clr-success-5: 115, 54%, 62%; /* #72d26a */
		--clr-success-6: 115, 54%, 57%; /* #60cd56 */
		--clr-success-7: 115, 54%, 50%; /* #46c43b */
		--clr-success-8: 115, 54%, 46%; /* #41b536 */
		--clr-success-9: 115, 54%, 42%; /* #3ba531 */
		/* on success #0c0c0c */
		--clr-on-success-0: 0, 0%, 7.705882352941177%; /* #141414 */
		--clr-on-success-1: 0, 0%, 4.705882352941177%; /* #0c0c0c */
		--clr-on-success-2: 0, 0%, 1.7058823529411766%; /* #040404 */

		/* warning #f9e2af */
		--clr-warning-0: 41, 86%, 83%; /* #f9e1ae */
		--clr-warning-1: 41, 86%, 81%; /* #f8dea5 */
		--clr-warning-2: 41, 86%, 78%; /* #f7d997 */
		--clr-warning-3: 41, 86%, 75%; /* #f6d388 */
		--clr-warning-4: 41, 86%, 72%; /* #f5ce7a */
		--clr-warning-5: 41, 86%, 68%; /* #f4c767 */
		--clr-warning-6: 41, 86%, 63%; /* #f2be50 */
		--clr-warning-7: 41, 86%, 56%; /* #efb22e */
		--clr-warning-8: 41, 86%, 51%; /* #eea917 */
		--clr-warning-9: 41, 86%, 47%; /* #df9e11 */
		/* on warning #0c0c0c */
		--clr-on-warning-0: 0, 0%, 7.705882352941177%; /* #141414 */
		--clr-on-warning-1: 0, 0%, 4.705882352941177%; /* #0c0c0c */
		--clr-on-warning-2: 0, 0%, 1.7058823529411766%; /* #040404 */

		/* error #f38ba8 */
		--clr-error-0: -17, 81%, 75%; /* #f38ca9 */
		--clr-error-1: -17, 81%, 73%; /* #f282a2 */
		--clr-error-2: -17, 81%, 70%; /* #f07598 */
		--clr-error-3: -17, 81%, 68%; /* #ef6b91 */
		--clr-error-4: -17, 81%, 65%; /* #ee5d86 */
		--clr-error-5: -17, 81%, 62%; /* #ed507c */
		--clr-error-6: -17, 81%, 57%; /* #ea396b */
		--clr-error-7: -17, 81%, 50%; /* #e71853 */
		--clr-error-8: -17, 81%, 46%; /* #d4164c */
		--clr-error-9: -17, 81%, 43%; /* #c61547 */
		/* on error #0c0c0c */
		--clr-on-error-0: 0, 0%, 7.705882352941177%; /* #141414 */
		--clr-on-error-1: 0, 0%, 4.705882352941177%; /* #0c0c0c */
		--clr-on-error-2: 0, 0%, 1.7058823529411766%; /* #040404 */
	}
</style>
