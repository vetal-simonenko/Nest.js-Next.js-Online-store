import Image from 'next/image';
import Link from 'next/link';

import { PUBLIC_URL } from '@/config/url.config';

import { SITE_NAME } from '@/constants/seo.constants';

import styles from './Logo.module.scss';

export function Logo() {
	return (
		<Link href={PUBLIC_URL.home()} className={styles.logo}>
			<Image
				src='/images/logo.svg'
				loading='eager'
				alt={SITE_NAME}
				width={160}
				height={48}
			/>

			<div className='sr-only'>{SITE_NAME}</div>
		</Link>
	);
}
