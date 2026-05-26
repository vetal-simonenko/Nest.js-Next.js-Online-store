'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/product.service';
import { useGetCategories } from '@/hooks/queries/categories/useGetCategory';
import { useGetColors } from '@/hooks/queries/colors/useGetColor';
import { ProductForm } from '@/app/store/[storeId]/products/ProductForm';

export function ProductEdit() {
	const params = useParams<{ productId: string }>();

	const { data } = useQuery({
		queryKey: ['get product'],
		queryFn: () => productService.getById(params.productId)
	});

	const { categories } = useGetCategories();
	const { colors } = useGetColors();

	return (
		<ProductForm
			categories={categories || []}
			colors={colors || []}
			product={data}
		/>
	);
}
