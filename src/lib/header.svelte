<script lang="ts">
	import ThemeSelector from './themeSelector.svelte';
</script>

<div class="header-wrapper">
	<header>
		<a href="/" class="title-on-primary">Shgrid</a>
		<input type="checkbox" id="hamburger-toggle" aria-hidden="true" />
		<label for="hamburger-toggle" class="menu" aria-hidden="true">
			<svg class="open-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
				><title>open menu</title><path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></svg
			>
			<svg class="close-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
				><title>close menu</title><path
					d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
				/></svg
			>
		</label>
		<nav>
			<ul>
                <li><a href="/getting-started">Getting Started</a></li>
				<li><a href="/examples">Examples</a></li>
				<li><a href="/docs">Documentation</a></li>
			</ul>
			<ul class="additional">
				<li>
					<ThemeSelector />
				</li>
				<li>
					<a href="https://github.com/ConnorVoisey/shgrid" target="_blank">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
							><title>github</title><path
								d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
							/></svg
						></a
					>
				</li>
				<li>
					<a href="https://www.npmjs.com/package/shgrid" target="_blank" rel="noopener noreferrer">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
							><title>npm</title><path
								d="M4,10V14H6V11H7V14H8V10H4M9,10V15H11V14H13V10H9M12,11V13H11V11H12M14,10V14H16V11H17V14H18V11H19V14H20V10H14M3,9H21V15H12V16H8V15H3V9Z"
							/></svg
						></a
					>
				</li>
			</ul>
		</nav>
	</header>
</div>

<style lang="scss">
	// -- start region: All styling
	.header-wrapper {
		background-color: primary(5);
	}
	header {
		@include content-width(1100px);
		color: on-primary(0);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: size(4) 0;
		position: relative;
	}
	.menu {
		svg {
			width: size(8);
			fill: on-primary(1);
		}
	}
	.title-on-primary {
		margin: 0;
	}
	.additional {
		flex-direction: row;
		gap: size(4);
		justify-content: center;
		svg {
			width: size(8);
			fill: on-primary(1);
		}
	}
	nav {
		position: absolute;
		z-index: 20;
		top: 100%;
		left: 0;
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		gap: size(8);
		opacity: 0;
		transition: opacity 200ms;
		padding: size(8) size(4);
		background-color: primary(5, 0.8);
		backdrop-filter: blur(0.4em);
		pointer-events: none;

		ul {
			display: flex;
			flex-direction: column;
			gap: size(4) size(8);
		}
	}
	a {
		display: block;
		position: relative;
		width: max-content;
		&::after {
			background-color: on-primary(2);
			@include pseudo;
			height: 2px;
			width: 0;
			transition: width 200ms;
		}
		&:hover::after ,
		&:focus::after {
			width: 100%;
		}
	}
	// -- end region: all styling

	// -- start region: mobile

	.close-btn {
		display: none;
	}
	#hamburger-toggle:checked {
		& ~ nav {
			opacity: 1;
			pointer-events: all;
		}
		& ~ label {
			.close-btn {
				display: flex;
			}
			.open-btn {
				display: none;
			}
		}
	}
	// -- end region mobile

	// --start region desktop
	@media (min-width: 780px) {
		header {
			display: grid;
			grid-template-columns: 1fr 2fr;
			grid-template-areas: 'title nav nav';
		}
		label[for='hamburger-toggle'] {
			display: none;
		}
		nav {
			grid-area: nav;
			position: static;
			opacity: 1;
			pointer-events: all;
			height: max-content;
			flex-direction: row;
			justify-content: space-between;
			padding: 0;
			ul {
				flex-direction: row;
				align-items: center;
			}
		}
	}
	//--end region desktop
</style>
