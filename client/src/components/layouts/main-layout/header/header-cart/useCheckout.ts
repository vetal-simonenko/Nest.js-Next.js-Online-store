import { useCart } from '@/hooks/useCart';
import { useActions } from '@/hooks/useActions';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { orderService } from '@/services/order.service';
import toast from 'react-hot-toast';

export const useCheckout = () => {
	const { items } = useCart();

	const { reset } = useActions();

	const router = useRouter();

	const { mutate: createPayment, isPending: isLoadingCreate } = useMutation({
		mutationKey: ['create order and payment'],
		mutationFn: () =>
			orderService.place({
				items: items.map((item) => ({
					price: item.price,
					quantity: item.quantity,
					productId: item.product.id,
					storeId: item.product.storeId
				}))
			}),
		onSuccess({ data }) {
			router.push(data.confirmation.confirmation_url);

			reset();
		},
		onError() {
			toast.error('Payment creation error');
		}
	});

	return {
		createPayment,
		isLoadingCreate
	};
};
