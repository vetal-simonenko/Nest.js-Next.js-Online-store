import type { Metadata } from 'next'

import { SITE_DESCRIPTION } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Your shopping site',
	description: SITE_DESCRIPTION
}

export default function AuthPage() {
	return <div>AuthPage</div>
}
