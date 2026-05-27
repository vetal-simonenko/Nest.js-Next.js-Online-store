import { ICartItem } from '@/shared/types/cart.interface';
import styles from '../HeaderCart.module.scss';
import { PUBLIC_URL } from '@/config/url.config';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/string/formatPrice';
import { CartActions } from '@/components/layouts/main-layout/header/header-cart/cart-item/CartActions';
interface CartItemProps {
	item: ICartItem;
}

export function CartItem({ item }: CartItemProps) {
	return (
		<div className={styles.item}>
			<Link href={PUBLIC_URL.product(item.product.id)} className={styles.image}>
				<Image src={item.product.images[0]} alt={item.product.title} fill />
			</Link>

			<div className={styles.right}>
				<h2>{item.product.title}</h2>

				<p>{formatPrice(item.product.price)}</p>

				<CartActions item={item} />
			</div>
		</div>
	);
}
