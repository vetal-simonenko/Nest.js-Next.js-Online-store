import { IProduct } from '@/shared/types/product.interface';
import styles from './ProductReviews.module.scss';
import { useProfile } from '@/hooks/useProfile';
import { useDeleteReview } from '@/hooks/queries/reviews/useDeleteReviews';
import { ReviewModal } from '@/components/ui/modals/ReviewModal';
import { Button } from '@/components/ui/button';
import { Plus, Trash } from 'lucide-react';
import Image from 'next/image';
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal';
import { Rating } from 'react-simple-star-rating';

interface ProductReviewsProps {
	product: IProduct;
}

export function ProductReviews({ product }: ProductReviewsProps) {
	const { user } = useProfile();

	const { deleteReview } = useDeleteReview();

	return (
		<>
			<div className={styles.header}>
				<h1>Reviews</h1>

				{user && (
					<ReviewModal storeId={product.storeId}>
						<Button variant='ghost'>
							<Plus />
							Add review
						</Button>
					</ReviewModal>
				)}
			</div>
			<div className={styles.reviews}>
				{product?.reviews?.length ? (
					product?.reviews?.map((review) => (
						<div key={review.id} className={styles.review}>
							<div className={styles.header}>
								<div className={styles.user}>
									<Image
										src={review.user.picture}
										alt={review.user.name}
										width={40}
										height={40}
										style={{
											width: '100%',
											height: 'auto'
										}}
									/>

									{review.user.name}
								</div>

								{review.user.id === user?.id && (
									<ConfirmModal handleClick={() => deleteReview(review.id)}>
										<button className={styles.delete}>
											<Trash />
										</button>
									</ConfirmModal>
								)}
							</div>
							<Rating
								readonly
								initialValue={review.rating}
								SVGstyle={{
									display: 'inline-block'
								}}
								size={18}
								allowFraction
								transition
							/>

							<div className={styles.text}>{review.text}</div>
						</div>
					))
				) : (
					<div className={styles.not_found}>No reviews</div>
				)}
			</div>
		</>
	);
}
