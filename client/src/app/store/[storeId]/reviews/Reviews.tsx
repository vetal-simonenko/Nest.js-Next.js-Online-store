'use client';

import { useGetReviews } from '@/hooks/queries/reviews/useGetReviews';
import { formatDate } from '@/lib/date/format-date';
import DataTableLoading from '@/components/ui/data-loading/DataTableLoading';
import { Heading } from '@/components/ui/Heading';
import { DataTable } from '@/components/ui/data-loading/DataTable';
import {
	IReviewColumn,
	reviewColumns
} from '@/app/store/[storeId]/reviews/ReviewColumns';

import styles from '../Store.module.scss';

export function Reviews() {
	const { reviews, isLoading } = useGetReviews();

	const formattedReviews: IReviewColumn[] = reviews
		? reviews.map((review) => ({
				id: review.id,
				createdAt: formatDate(review.createdAt),
				rating: Array.from({ length: review.rating })
					.map(() => '⭐')
					.join(' '),
				username: review.user.name
			}))
		: [];

	return (
		<div className={styles.wrapper}>
			{isLoading ? (
				<DataTableLoading />
			) : (
				<>
					<div className={styles.header}>
						<Heading
							title={`Reviews (${reviews?.length})`}
							description='All reviews about your store'
						/>
					</div>

					<div className={styles.table}>
						<DataTable columns={reviewColumns} data={formattedReviews} />
					</div>
				</>
			)}
		</div>
	);
}
