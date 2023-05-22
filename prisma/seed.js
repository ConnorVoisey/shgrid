import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();
async function main() {
	const mainCount = 250;
	const organisations = [];
	for (let i = 0; i < Math.random() * mainCount; i++) {
		organisations.push(getOrganisation());
	}
	await prisma.organisation.createMany({ data: organisations });

	const referrals = [];
	const contacts = [];
	const organisationCount = await prisma.organisation.count();
	for (let i = 0; i < mainCount; i++) {
		referrals.push(getReferrer());
		contacts.push(await getContact(organisationCount));
	}

	Promise.all([
		prisma.referral.createMany({ data: referrals }),
		prisma.contact.createMany({ data: contacts })
	])
		.then((res) => console.info('Successfully finished seeding'))
		.catch((err) => console.error('Failed seeding', err));
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

/**
 * @param {number} organisationCount
 * @returns {Promise<{
 * firstName: string,
 * lastName:string,
 * email:string,
 * organisationId: string|null,
 * active:boolean,
 * mobile:string,
 * officePhone:string,
 * postcode:string}>}
 */
async function getContact(organisationCount) {
	const firstName = faker.name.firstName();
	const lastName = faker.name.lastName();
	const skip = Math.floor(Math.random() * organisationCount);
	const organisation = await prisma.organisation.findFirst({
		orderBy: { id: 'asc' },
		skip,
		select: {
			id: true
		}
	});
	const organisationId = organisation?.id ?? null;
	return {
		firstName,
		lastName,
		email: faker.internet.email(firstName, lastName),
		organisationId: organisationId,
		active: faker.datatype.boolean(),
		mobile: faker.phone.number(),
		officePhone: faker.phone.imei(),
		postcode: faker.address.zipCode()
	};
}
/**
 * @returns {{
 * name: string,
 * phone: string,
 * active: boolean,
 * postcode: string
 * }}
 */
function getOrganisation() {
	return {
		name: faker.lorem.words(Math.random() * 5),
		phone: faker.phone.number(),
		active: faker.datatype.boolean(),
		postcode: faker.address.zipCode()
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
