'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PUBLIC_URL } from '@/config/url.config';
import styles from './SearchInput.module.scss';
import { Search } from 'lucide-react';

export function SearchInput() {
	const [searchTerm, setSearchTerm] = useState<string>('');

	const router = useRouter();

	return (
		<div className={styles.form}>
			<Input
				aria-label='Search'
				placeholder='Store search'
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>

			<Button
				variant='primary'
				onClick={() =>
					router.push(PUBLIC_URL.explorers(`?searchTerm=${searchTerm}`))
				}
			>
				<Search />
			</Button>
		</div>
	);
}
