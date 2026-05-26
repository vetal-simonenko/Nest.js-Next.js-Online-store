import type { Metadata } from 'next';

import { productService } from '@/services/product.service';
import { Explorer } from '@/app/(root)/explorers/Explorer';

export const metadata: Metadata = {
	title: 'Product catalog'
};

export const revalidate = 60;

async function getProducts() {
	return await productService.getAll();
}

export default async function ExplorerPage() {
	const products = await getProducts();

	return (
		<div className='my-6'>
			<Explorer products={products} />
		</div>
	);
}
