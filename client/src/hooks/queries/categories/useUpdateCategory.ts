import { useParams } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ICategoryInput } from '@/shared/types/category.interface';
import { categoryService } from '@/services/category.service';
import toast from 'react-hot-toast';
import { useMemo } from 'react';

export const useUpdateCategory = () => {
	const params = useParams<{ categoryId: string }>();
	const queryClient = useQueryClient();

	const { mutate: updateCategory, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update category'],
		mutationFn: (data: ICategoryInput) =>
			categoryService.update(params.categoryId, data),

		onSuccess() {
			void queryClient.invalidateQueries({
				queryKey: ['get categories for store dashboard']
			});

			toast.success('Category updated');
		},

		onError() {
			toast.error('Error while updating category');
		}
	});

	return useMemo(
		() => ({ updateCategory, isLoadingUpdate }),
		[updateCategory, isLoadingUpdate]
	);
};
