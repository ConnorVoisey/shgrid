import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();
async function main() {
	let referrals = [];
	for (let i = 0; i < 250; i++) {
		referrals.push(getReferrer());
	}
	let res = await prisma.referral.createMany({ data: referrals });
}

function getReferrer() {
	return {
		name: faker.lorem.words(Math.random() * 5),
		known_risks: faker.lorem.words(Math.random() * 7),
		referrer_consent: faker.lorem.words(Math.random() * 7),
		information_consent: faker.datatype.boolean(),
		description: faker.lorem.words(Math.random() * 7),
		desired_outcome: faker.lorem.words(Math.random() * 7),
		additional_information: faker.lorem.words(Math.random() * 7),
		declined: faker.lorem.words(Math.random() * 7)
	};
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
