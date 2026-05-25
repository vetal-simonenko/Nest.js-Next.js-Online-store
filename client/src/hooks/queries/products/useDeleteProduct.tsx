import toast from 'react-hot-toast';
import { useMemo } from 'react';
import { STORE_URL } from '@/config/url.config';
import { productService } from '@/services/product.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';

export const useDeleteProduct = () => {
	const params = useParams<{ storeId: string }>();
	const router = useRouter();

	const queryClient = useQueryClient();

	const { mutate: deleteProduct, isPending: isLoadingDelete } = useMutation({
		mutationKey: ['delete product'],
		mutationFn: () => productService.delete(params.storeId),
		onSuccess() {
			void queryClient.invalidateQueries({
				queryKey: ['get products for store dashboard']
			});

			toast.success('Product deleleted');

			router.push(STORE_URL.products(params.storeId));
		},

		onError() {
			toast.error('Error while deleting product');
		}
	});

	return useMemo(
		() => ({
			deleteProduct,
			isLoadingDelete
		}),
		[deleteProduct, isLoadingDelete]
	);
};
