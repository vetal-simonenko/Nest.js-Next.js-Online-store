import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IStoreCreate } from '@/shared/types/store.interface';
import { storeService } from '@/services/store.service';
import toast from 'react-hot-toast';
import { STORE_URL } from '@/config/url.config';
import { useMemo } from 'react';

export function useCreateStore() {
	const router = useRouter();

	const queryClient = useQueryClient();

	const { mutate: createStore, isPending: isLoadingCreate } = useMutation({
		mutationKey: ['create store'],
		mutationFn: (data: IStoreCreate) => storeService.create(data),

		onSuccess(store) {
			void queryClient.invalidateQueries({
				queryKey: ['profile']
			});
			toast.success('Store created');
			router.push(STORE_URL.home(store.id));
		},

		onError() {
			toast.error('Error while creating store');
		}
	});

	return useMemo(
		() => ({ createStore, isLoadingCreate }),
		[createStore, isLoadingCreate]
	);
}
