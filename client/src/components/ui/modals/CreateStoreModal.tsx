import { PropsWithChildren, useState } from 'react';
import { useCreateStore } from '@/hooks/queries/stores/useCreateStore';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IStoreCreate } from '@/shared/types/store.interface';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form-elements/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function CreateStoreModal({ children }: PropsWithChildren<unknown>) {
	const [isOpen, setIsOpen] = useState(false);

	const { createStore, isLoadingCreate } = useCreateStore();

	const form = useForm<IStoreCreate>({
		mode: 'onChange'
	});

	const onSubmit: SubmitHandler<IStoreCreate> = (data) => {
		createStore(data);
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger className='w-full'>{children}</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create store</DialogTitle>

					<DialogDescription>
						To create a store, you need to specify a name.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
											aria-label='Store name'
											type='text'
											placeholder='Store name'
											disabled={isLoadingCreate}
											{...field}
											value={field.value ?? ''}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='flex justify-end'>
							<Button variant='primary' disabled={isLoadingCreate}>
								Create
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
