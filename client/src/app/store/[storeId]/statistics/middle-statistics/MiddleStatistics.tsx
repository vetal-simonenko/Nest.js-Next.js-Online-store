import { useGetStatistics } from '@/hooks/queries/statistics/useGetStatistics';
import styles from './MiddleStatistics.module.scss';
import { Overview } from './Overview';
import { LastUsers } from './LastUsers';

export function MiddleStatistics() {
	const { middle } = useGetStatistics();

	return (
		<div className={styles.middle}>
			{middle?.monthlySales || middle?.lastUsers ? (
				<>
					<div className={styles.overview}>
						<Overview data={middle.monthlySales} />
					</div>

					<div className={styles.last_users}>
						<LastUsers data={middle.lastUsers} />
					</div>
				</>
			) : (
				<div className='w-full'>No data for statistics</div>
			)}
		</div>
	);
}
