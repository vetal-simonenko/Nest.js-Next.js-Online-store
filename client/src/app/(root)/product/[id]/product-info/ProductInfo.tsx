import { IProduct } from '@/shared/types/product.interface';

interface ProductInfoProps {
	product: IProduct;
}

export function ProductInfo({ product }: ProductInfoProps) {
	return <div>ProductInfo</div>;
}
