import toast from 'react-hot-toast';
import { useMemo } from 'react';
import { STORE_URL } from '@/config/url.config';
import { IProductInput } from '@/shared/types/product.interface';
import { productService } from '@/services/product.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';

export const useCreateProduct = () => {
	const params = useParams<{ storeId: string }>();
	const router = useRouter();

	const queryClient = useQueryClient();

	const { mutate: createProduct, isPending: isLoadingCreate } = useMutation({
		mutationKey: ['create product'],

		mutationFn: (data: IProductInput) =>
			productService.create(data, params.storeId),

		onSuccess() {
			void queryClient.invalidateQueries({
				queryKey: ['get products for store dashboard']
			});

			toast.success('Product created');

			router.push(STORE_URL.products(params.storeId));
		},

		onError() {
			toast.error('Error while creating product');
		}
	});

	return useMemo(
		() => ({
			createProduct,
			isLoadingCreate
		}),
		[createProduct, isLoadingCreate]
	);
};
