import type { PropsWithChildren } from 'react';

import styles from './StoreLayout.module.scss';
import { Sidebar } from '@/components/layouts/sidebar/Sidebar';
import { Header } from '@/components/layouts/header/Header';

export const StoreLayout = ({ children }: PropsWithChildren<unknown>) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.layout}>
				<div className={styles.sidebar}>
					<Sidebar />
				</div>
				<div className={styles.header}>
					<Header />
				</div>
				<main>{children}</main>
			</div>
		</div>
	);
};
