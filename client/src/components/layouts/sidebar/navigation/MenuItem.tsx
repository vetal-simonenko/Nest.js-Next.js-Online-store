'use client';

import { IMenuItem } from './menu.interface';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './Navigation.module.scss';

interface MenuItemProps {
	route: IMenuItem;
}

export const MenuItem = ({ route }: MenuItemProps) => {
	const pathname = usePathname();

	return (
		<Link
			href={route.link}
			className={cn(styles.route, {
				[styles.active]: pathname === route.link
			})}
		>
			<route.icon />

			{route.value}
		</Link>
	);
};
