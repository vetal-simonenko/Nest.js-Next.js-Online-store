'use client';

import { IProduct } from '@/shared/types/product.interface';
import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/product.service';
import { ProductGallery } from '@/app/(root)/product/[id]/product-gallery/ProductGallery';
import { ProductInfo } from '@/app/(root)/product/[id]/product-info/ProductInfo';
import { Catalog } from '@/components/ui/catalog/Catalog';
import { ProductReviews } from '@/app/(root)/product/[id]/product-reviews/ProductReviews';

import styles from './Products.module.scss';

interface ProductProps {
	initialProduct: IProduct;
	similarProducts: IProduct[];
	id?: string;
}

export function Product({
	initialProduct,
	similarProducts,
	id = ''
}: ProductProps) {
	const { data: product } = useQuery({
		queryKey: ['product', initialProduct.id],
		queryFn: () => productService.getById(id),
		initialData: initialProduct,
		enabled: !!id
	});

	return (
		<div className={styles.product_page}>
			<div className={styles.content}>
				<div className={styles.blocks}>
					<ProductGallery product={product} />
					<ProductInfo product={product} />
				</div>
			</div>

			<Catalog title='Similar products' products={similarProducts} />

			<ProductReviews product={product} />
		</div>
	);
}
