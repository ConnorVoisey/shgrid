import { error, json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/js/prisma.js';
import type { Prisma } from '@prisma/client';

export const GET = (async req => {
	// await new Promise((resolve) => setTimeout(resolve, 20000));
	const searchParams = req.url.searchParams;
	console.log(searchParams);
	const maxEntities = 25;
	let page = +(searchParams.get('page') ?? 0);
	let limit = Math.min(+(searchParams.get('limit') ?? maxEntities), maxEntities);
	let sortersStr = searchParams.get('sort');
	const args: Prisma.ContactFindManyArgs = {
		skip: page * limit,
		take: limit,
		include: { organisation: true },
	};
	if (sortersStr !== null && sortersStr !== '') {
		const sorters: { columnId: keyof Prisma.ReferralOrderByWithRelationInput; isAsc: boolean }[] =
			JSON.parse(sortersStr);
		args.orderBy = sorters.map(sorter => {
			return { [sorter.columnId]: sorter.isAsc ? 'asc' : 'desc' };
		});
	}
	//TODO: add filtering here
	console.dir({ args }, { depth: null });

	const referrals = await prisma.contact.findMany(args);
	const count = await prisma.referral.count({});
	if (referrals === null) throw error(404, `cannot find any referrals with those conditions`);

	return json({ data: referrals, count });
}) satisfies RequestHandler;
