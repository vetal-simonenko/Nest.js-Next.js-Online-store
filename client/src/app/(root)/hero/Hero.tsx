import { SITE_DESCRIPTION } from '@/constants/seo.constants';

import styles from './Hero.module.scss';
import Link from 'next/link';
import { PUBLIC_URL } from '@/config/url.config';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function Hero() {
	return (
		<div className={styles.section}>
			<h1 className={styles.heading}>
				Your shopping, your pleasure — <span>all in one place</span>
			</h1>

			<p className={styles.description}>{SITE_DESCRIPTION}</p>
			<Link href={PUBLIC_URL.explorers()}>
				<Button variant='primary'>
					Start shopping
					<ArrowRight />
				</Button>
			</Link>
		</div>
	);
}
