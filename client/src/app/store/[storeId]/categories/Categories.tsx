'use client';

import { useParams } from 'next/navigation';

import styles from '../Store.module.scss';

import DataTableLoading from '@/components/ui/data-loading/DataTableLoading';
import { Heading } from '@/components/ui/Heading';
import Link from 'next/link';
import { STORE_URL } from '@/config/url.config';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { DataTable } from '@/components/ui/data-loading/DataTable';
import { formatDate } from '@/lib/date/format-date';
import { useGetCategories } from '@/hooks/queries/categories/useGetCategory';
import {
	categoryColumns,
	ICategoryColumn
} from '@/app/store/[storeId]/categories/CategoryColumns';

export function Categories() {
	const params = useParams<{ storeId: string }>();

	const { categories, isLoading } = useGetCategories();

	const formattedCategories: ICategoryColumn[] = categories
		? categories.map((category) => ({
				id: category.id,
				createdAt: formatDate(category.createdAt),
				title: category.title,
				storeId: category.storeId
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
							title={`Categories (${categories?.length})`}
							description='All categories in your store'
						/>

						<div className={styles.buttons}>
							<Link href={STORE_URL.categoryCreate(params.storeId)}>
								<Button variant='primary'>
									<Plus />
									Create
								</Button>
							</Link>
						</div>
					</div>

					<div className={styles.table}>
						<DataTable
							columns={categoryColumns}
							data={formattedCategories}
							filterKey={'title'}
						/>
					</div>
				</>
			)}
		</div>
	);
}
