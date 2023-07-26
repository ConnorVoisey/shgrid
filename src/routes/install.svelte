<script>
	import CodeBlock from "$lib/codeBlock.svelte";

</script>
<section>
	<div class="wrapper">
		<h3 class="title">How to install <span>Shgrid</span></h3>
		<p>
			There is both a svelte version which will only work inside a svelte project and a standard version which
			will work in any Javascript project. Chose the install that makes sense for you.
		</p>

		<h5>Svelte Version</h5>
		<!-- TODO: get code blocks -->
        <CodeBlock language="clike" code={`pnpm add shgrid-svelte`}/>

		<h5>Standard Version</h5>
		<div class="code-block">pnpm add shgrid</div>
	</div>
</section>

<style lang="scss">
	section {
		background-color: surface(1);
		border-top: 1px solid hsla(0, 0%, 0%, 0.2);
		// background: #f5f5f5;
	}
	.wrapper {
		@include content-width(1100px);
		padding: size(24) 0;
	}
	h3 {
		margin-bottom: size(4);
		span {
			color: primary(4);
		}
	}
</style>
