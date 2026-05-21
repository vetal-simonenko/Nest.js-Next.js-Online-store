import type { Metadata } from 'next'

import { SITE_DESCRIPTION, SITE_NAME } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Autorization',
	description: SITE_DESCRIPTION
}

export default function HomePage() {
	return <div>HomePage</div>
}
