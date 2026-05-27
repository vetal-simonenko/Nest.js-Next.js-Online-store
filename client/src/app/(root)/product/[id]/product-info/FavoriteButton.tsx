import { Button } from '@/components/ui/button';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useProfile } from '@/hooks/useProfile';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/services/user.service';
import { IProduct } from '@/shared/types/product.interface';

interface IFavoriteButtonProps {
	product: IProduct;
}

const FavoriteButton = ({ product }: IFavoriteButtonProps) => {
	const { user } = useProfile();

	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationKey: ['toggle favorite'],
		mutationFn: () => userService.toggleFavorite(product.id),
		onSuccess() {
			void queryClient.invalidateQueries({
				queryKey: ['profile']
			});
		}
	});

	if (!user) return null;

	const isExists = user.favorites.some(
		(favorite) => favorite.id === product.id
	);

	return (
		<Button
			variant='secondary'
			size='icon'
			onClick={() => mutate()}
			disabled={isPending}
		>
			{isExists ? (
				<AiFillHeart color='#F43F5E' className='size-5' />
			) : (
				<AiOutlineHeart className='size-5' />
			)}
		</Button>
	);
};

export default FavoriteButton;
