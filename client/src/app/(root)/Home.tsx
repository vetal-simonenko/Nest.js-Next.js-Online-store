import { Hero } from '@/app/(root)/hero/Hero';
import { IProduct } from '@/shared/types/product.interface';
import { Catalog } from '@/components/ui/catalog/Catalog';
import { PUBLIC_URL } from '@/config/url.config';

interface HomeProps {
	products: IProduct[];
}

export const Home = ({ products }: HomeProps) => {
	return (
		<>
			<Hero />
			<Catalog
				title='Best sellers'
				description='The most popular products in our store.'
				linkTitle='Learn more'
				link={PUBLIC_URL.explorers()}
				products={products}
			/>
		</>
	);
};
