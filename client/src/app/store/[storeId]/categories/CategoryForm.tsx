import { ICategory, ICategoryInput } from '@/shared/types/category.interface';
import { useCreateCategory } from '@/hooks/queries/categories/useCreateCategory';
import { useUpdateCategory } from '@/hooks/queries/categories/useUpdateCategory';
import { useDeleteCategory } from '@/hooks/queries/categories/useDeleteCategory';
import { SubmitHandler, useForm } from 'react-hook-form';

import styles from '../Store.module.scss';

import { Heading } from '@/components/ui/Heading';
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form-elements/form';
import { Input } from '@/components/ui/input';

interface ICategoryForm {
	category?: ICategory | null;
}

export function CategoryForm({ category }: ICategoryForm) {
	const { createCategory, isLoadingCreate } = useCreateCategory();
	const { updateCategory, isLoadingUpdate } = useUpdateCategory();
	const { deleteCategory, isLoadingDelete } = useDeleteCategory();

	const title = category ? 'Edit category data' : 'Create category';

	const description = category
		? 'Edit category data'
		: 'Add a new category to the store';

	const action = category ? 'Save' : 'Create';

	const form = useForm<ICategoryInput>({
		mode: 'onChange',
		values: category
			? {
					title: category.title,
					description: category.description
				}
			: {
					title: '',
					description: ''
				}
	});

	const onSubmit: SubmitHandler<ICategoryInput> = (data) => {
		if (category) updateCategory(data);
		else createCategory(data);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<Heading title={title} description={description} />

				{category && (
					<ConfirmModal handleClick={() => deleteCategory()}>
						<Button size='icon' variant='primary' disabled={isLoadingDelete}>
							<Trash className='size-4' />
						</Button>
					</ConfirmModal>
				)}
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className={styles.fields}>
						<FormField
							control={form.control}
							name='title'
							rules={{
								required: 'Title is required'
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>

									<FormControl>
										<Input
											aria-label='Title'
											placeholder='Title'
											disabled={isLoadingCreate || isLoadingUpdate}
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name='description'
						rules={{
							required: 'Description is required'
						}}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>

								<FormControl>
									<Input
										aria-label='Description'
										placeholder='Description'
										disabled={isLoadingCreate || isLoadingUpdate}
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						variant='primary'
						disabled={isLoadingCreate || isLoadingUpdate}
					>
						{action}
					</Button>
				</form>
			</Form>
		</div>
	);
}
