'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { productService } from '@/services/product.service';

import { IProduct } from '@/shared/types/product.interface';
import { Catalog } from '@/components/ui/catalog/Catalog';

interface ExplorerProps {
	products: IProduct[];
}

export function Explorer({ products }: ExplorerProps) {
	const searchParams = useSearchParams();
	const searchTerm = searchParams.get('searchTerm');

	const { data } = useQuery({
		queryKey: ['product explorers', searchTerm],
		queryFn: () => productService.getAll(searchTerm),
		initialData: products
	});

	return (
		<div className='my-6'>
			<Catalog
				title={
					searchTerm ? `Search results for "${searchTerm}"` : 'Product catalog'
				}
				products={data}
			/>
		</div>
	);
}
