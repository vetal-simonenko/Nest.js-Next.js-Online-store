'use client';

import { useParams } from 'next/navigation';

import { colorColumns } from '@/app/store/[storeId]/colors/ColorColumns';

import styles from '../Store.module.scss';

import DataTableLoading from '@/components/ui/data-loading/DataTableLoading';
import { Heading } from '@/components/ui/Heading';
import Link from 'next/link';
import { STORE_URL } from '@/config/url.config';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { DataTable } from '@/components/ui/data-loading/DataTable';
import { useGetColors } from '@/hooks/queries/colors/useGetColor';
import { IColor } from '@/shared/types/color.interface';
import { formatDate } from '@/lib/date/format-date';

export function Colors() {
	const params = useParams<{ storeId: string }>();

	const { colors, isLoading } = useGetColors();

	const formattedColors: IColor[] = colors
		? colors.map((color) => ({
				id: color.id,
				createdAt: formatDate(color.createdAt),
				name: color.name,
				value: color.value,
				storeId: color.storeId
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
							title={`Colors (${colors?.length})`}
							description='All colors in your store'
						/>

						<div className={styles.buttons}>
							<Link href={STORE_URL.colorCreate(params.storeId)}>
								<Button variant='primary'>
									<Plus />
									Create
								</Button>
							</Link>
						</div>
					</div>

					<div className={styles.table}>
						<DataTable
							columns={colorColumns}
							data={formattedColors}
							filterKey={'name'}
						/>
					</div>
				</>
			)}
		</div>
	);
}
