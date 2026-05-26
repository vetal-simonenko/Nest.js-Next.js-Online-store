import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { productService } from '@/services/product.service';
import { Product } from './Product';

export const revalidate = 60;

interface ProductPageProps {
	params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
	const products = await productService.getAll();

	return products.map((product) => ({
		id: product.id
	}));
}

async function getProducts(id: string) {
	try {
		const product = await productService.getById(id);
		const similarProducts = await productService.getSimilar(id);

		return { product, similarProducts };
	} catch {
		notFound();
	}
}

export async function generateMetadata({
	params
}: ProductPageProps): Promise<Metadata> {
	const { id } = await params;
	const { product } = await getProducts(id);

	return {
		title: product.title,
		description: product.description,
		openGraph: {
			images: [
				{
					url: product.images[0],
					width: 1000,
					height: 1000,
					alt: product.title
				}
			]
		}
	};
}

export default async function ProductPage({ params }: ProductPageProps) {
	const { id } = await params;
	const { product, similarProducts } = await getProducts(id);

	return (
		<Product
			initialProduct={product}
			similarProducts={similarProducts}
			id={id}
		/>
	);
}
