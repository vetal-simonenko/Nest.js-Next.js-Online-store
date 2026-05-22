import type { Metadata } from 'next';

import { SITE_DESCRIPTION } from '@/constants/seo.constants';
import { Auth } from '@/app/auth/Auth';

export const metadata: Metadata = {
	title: 'Your shopping site',
	description: SITE_DESCRIPTION
};

export default function AuthPage() {
	return <Auth />;
}
