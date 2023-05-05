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
		name: faker.lorem.text(),
		known_risks: faker.lorem.text(),
		referrer_consent: faker.lorem.text(),
		information_consent: faker.datatype.boolean(),
		description: faker.lorem.text(),
		desired_outcome: faker.lorem.text(),
		additional_information: faker.lorem.text(),
		declined: faker.lorem.text()
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
