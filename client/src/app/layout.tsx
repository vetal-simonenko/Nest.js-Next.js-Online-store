import type { Metadata } from 'next';
import { Geist } from 'next/font/google';

import { Providers } from '@/app/providers';

import { SITE_DESCRIPTION, SITE_NAME } from '@/constants/seo.constants';

import './tailwind.css';

import { cn } from '@/lib/utils';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
	title: {
		absolute: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description: SITE_DESCRIPTION
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='en'
			className={cn('font-sans', geist.variable, {
				dark: true
			})}
		>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
