import { error, json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/js/prisma.js';
import type { Prisma } from '@prisma/client';

export const GET = (async (req) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
	const searchParams = req.url.searchParams;
	console.log(searchParams);
	const maxEntities = 25;
	let page = +(searchParams.get('_page') ?? 0);
	let limit = Math.min(+(searchParams.get('_limit') ?? maxEntities), maxEntities);
	let sort = searchParams.get('_sort');
	let order = searchParams.get('_order') === 'true' ?? false;
	const args: Prisma.ReferralFindManyArgs = {
		skip: page * limit,
		take: limit
	};
	if (sort !== null && sort !== '') {
		args.orderBy = { [sort]: order ? 'asc' : 'desc' };
	}
	for (const [key, value] of searchParams.entries()) {
		args.where = args.where ?? {};
		if (key[0] === '_') continue;
		args.where[key] = { contains: value, mode: 'insensitive' };
	}
	console.log(args);

	const referrals = await prisma.referral.findMany(args);
	const count = await prisma.referral.count({});
	if (referrals === null) throw error(404, `cannot find any referrals with those conditions`);

	return json({ data: referrals, count });
}) satisfies RequestHandler;
