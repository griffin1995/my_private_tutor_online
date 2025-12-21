import { getFAQCategories, getFAQHero, getFAQContact } from '@/lib/cms/cms-content';
import { SimpleFAQ } from '@/components/faq/SimpleFAQ';

export default function FAQPage() {
	const categories = getFAQCategories();
	const hero = getFAQHero();
	const contact = getFAQContact();

	return (
		<SimpleFAQ
			categories={categories}
			hero={{
				title: hero.title,
				subtitle: hero.subtitle,
				description: hero.description,
			}}
			contact={{
				title: contact.title,
				description: contact.description,
				phone: contact.phone,
				email: contact.email,
			}}
		/>
	);
}