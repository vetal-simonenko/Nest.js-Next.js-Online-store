'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { saveTokenStorage } from '@/services/auth/auth-token.service';
import styles from './Dashboard.module.scss';
import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth/auth.service';
import {
	IOrderColumn,
	orderColumns
} from '@/app/(root)/dashboard/OrderColumns';
import { formatDate } from '@/lib/date/format-date';
import { formatPrice } from '@/lib/string/formatPrice';
import { EnumOrderStatus } from '@/shared/types/order.interface';
import { useProfile } from '@/hooks/useProfile';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { DataTable } from '@/components/ui/data-loading/DataTable';

export function Dashboard() {
	const searchParams = useSearchParams();
	const { push } = useRouter();

	useEffect(() => {
		const accessToken = searchParams.get('accessToken');

		if (accessToken) {
			saveTokenStorage(accessToken);
		}
	}, [searchParams]);

	const { user } = useProfile();

	const { mutate: logout } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => push('/auth')
	});

	if (!user) return null;

	const formattedOrders: IOrderColumn[] = user.orders.map((order) => ({
		createdAt: formatDate(order.createdAt),
		status: order.status === EnumOrderStatus.PENDING ? 'Pending' : 'Paid',
		total: formatPrice(order.total)
	}));

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<h1>Your orders</h1>

				<Button variant='ghost' onClick={() => logout()}>
					<LogOut />
					Logout
				</Button>
			</div>

			<DataTable columns={orderColumns} data={formattedOrders} />
		</div>
	);
}
