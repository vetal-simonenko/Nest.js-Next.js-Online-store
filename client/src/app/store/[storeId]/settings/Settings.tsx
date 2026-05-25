'use client';

import { useUpdateStore } from '@/hooks/queries/stores/useUpdateStore';
import { useDeleteStore } from '@/hooks/queries/stores/useDeleteStore';
import { IStoreEdit } from '@/shared/types/store.interface';
import { SubmitHandler, useForm } from 'react-hook-form';

import styles from './Settings.module.scss';
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { Heading } from '@/components/ui/Heading';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form-elements/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function Settings() {
	const { store, updateStore, isLoadingUpdate } = useUpdateStore();

	const { deleteStore, isLoadingDelete } = useDeleteStore();

	const form = useForm<IStoreEdit>({
		mode: 'onChange',
		values: {
			title: store?.title || '',
			description: store?.description || ''
		}
	});

	const onSubmit: SubmitHandler<IStoreEdit> = (data) => {
		updateStore(data);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<Heading title='Settings' description='Manage store settings' />

				<ConfirmModal handleClick={() => deleteStore()}>
					<Button size='icon' variant='primary' disabled={isLoadingDelete}>
						<Trash className='size-4' />
					</Button>
				</ConfirmModal>
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
									<FormLabel htmlFor={'title'}>Title</FormLabel>
									<FormControl>
										<Input
											id={'title'}
											aria-label='Title'
											type='text'
											placeholder='Title'
											disabled={isLoadingUpdate}
											{...field}
											value={field.value ?? ''}
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
								<FormLabel htmlFor={'description'}>Description</FormLabel>
								<FormControl>
									<Textarea
										id={'description'}
										aria-label='Description'
										placeholder='Description'
										disabled={isLoadingUpdate}
										{...field}
										value={field.value ?? ''}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button variant='primary' disabled={isLoadingUpdate}>
						Save
					</Button>
				</form>
			</Form>
		</div>
	);
}
