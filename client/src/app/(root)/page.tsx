import type { Metadata } from 'next';

import { SITE_DESCRIPTION } from '@/constants/seo.constants';
import { Home } from '@/app/(root)/Home';

export const metadata: Metadata = {
	title: 'Home Page',
	description: SITE_DESCRIPTION
};

export default function HomePage() {
	return <Home />;
}
