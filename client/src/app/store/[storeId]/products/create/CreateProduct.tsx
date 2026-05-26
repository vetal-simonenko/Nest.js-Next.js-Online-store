'use client';

import { ProductForm } from '../ProductForm';
import { useGetCategories } from '@/hooks/queries/categories/useGetCategory';
import { useGetColors } from '@/hooks/queries/colors/useGetColor';

export function CreateProduct() {
	const { categories } = useGetCategories();
	const { colors } = useGetColors();

	return <ProductForm categories={categories || []} colors={colors || []} />;
}
