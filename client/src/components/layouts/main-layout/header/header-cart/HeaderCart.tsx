import { Button } from '@/components/ui/button';
import styles from './HeaderCart.module.scss';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTrigger
} from '@/components/ui/sheet';
import { useCart } from '@/hooks/useCart';
import { Heading } from '@/components/ui/Heading';
import { formatPrice } from '@/lib/string/formatPrice';
import { CartItem } from './cart-item/CartItem';
import { useRouter } from 'next/navigation';
import { useCheckout } from '@/components/layouts/main-layout/header/header-cart/useCheckout';
import { useProfile } from '@/hooks/useProfile';
import { PUBLIC_URL } from '@/config/url.config';
import { DialogTitle } from '@/components/ui/dialog';

export function HeaderCart() {
	const { push } = useRouter();

	const { createPayment, isLoadingCreate } = useCheckout();

	const { user } = useProfile();

	const { items, total } = useCart();

	const handleClick = () => {
		user ? createPayment() : push(PUBLIC_URL.auth());
	};
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='ghost'>Cart</Button>
			</SheetTrigger>

			<SheetContent className={styles.cart}>
				<SheetHeader className='h-full'>
					<DialogTitle className={'sr-only'}>Shopping Cart</DialogTitle>
					<Heading title='Shopping Cart' className='text-xl mb-3' />

					<div className={styles.items}>
						{items.length ? (
							items.map((item) => <CartItem item={item} key={item.id} />)
						) : (
							<div className={styles.not_found}>Your cart is empty!</div>
						)}
					</div>

					{items.length ? (
						<>
							<div className={styles.total}>
								Total to pay: {formatPrice(total)}
							</div>

							<Button
								onClick={handleClick}
								variant='primary'
								disabled={isLoadingCreate}
							>
								Proceed to checkout
							</Button>
						</>
					) : null}

					<SheetDescription className={'sr-only'}>
						Your cart items are shown here
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
}
