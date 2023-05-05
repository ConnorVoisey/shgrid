import { error, json } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/js/prisma.js';

export const GET = (async (req) => {
	const searchParams = req.url.searchParams;
	console.log(searchParams);
	const maxEntities = 25;
	let offset = searchParams.get('_offset') ?? 0;
	let limit = Math.min(searchParams.get('_limit') ?? maxEntities, maxEntities);
	const referrals = await prisma.referral.findMany({ skip: offset, take: limit });
	const count = await prisma.referral.count({});
	if (referrals === null) throw error(404, `cannot find any referrals with those conditions`);

	return json({ data: referrals, count });
}) satisfies RequestHandler;
