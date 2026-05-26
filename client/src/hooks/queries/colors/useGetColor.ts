import { useParams } from 'next/navigation';
import { colorService } from '@/services/color.service';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

export const useGetColors = () => {
	const params = useParams<{ storeId: string }>();

	const { data: colors, isLoading } = useQuery({
		queryKey: ['get colors for store dashboard'],
		queryFn: () => colorService.getByStoreId(params.storeId)
	});

	return useMemo(
		() => ({
			colors,
			isLoading
		}),
		[colors, isLoading]
	);
};
