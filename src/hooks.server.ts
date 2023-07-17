import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	let theme: string | null | undefined = null;

	const newTheme = event.url.searchParams.get('theme');
	const cookieTheme = event.cookies.get('theme');
	if (newTheme) {
		theme = newTheme;
	} else {
		theme = cookieTheme;
	}

	return await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('theme=""', `theme="${theme}"`),
	});
};
