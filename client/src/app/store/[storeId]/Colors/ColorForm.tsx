import { IColor, IColorInput } from '@/shared/types/color.interface';
import { useCreateColor } from '@/hooks/queries/colors/useCreateColor';
import { useUpdateColor } from '@/hooks/queries/colors/useUpdateColor';
import { useDeleteColor } from '@/hooks/queries/colors/useDeleteColor';
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

interface ColorFormProps {
	color?: IColor;
}

export function ColorForm({ color }: ColorFormProps) {
	const { createColor, isLoadingCreate } = useCreateColor();
	const { updateColor, isLoadingUpdate } = useUpdateColor();
	const { deleteColor, isLoadingDelete } = useDeleteColor();

	const title = color ? 'Edit color data' : 'Create color';

	const description = color
		? 'Edit color data'
		: 'Add a new color to the store';

	const action = color ? 'Save' : 'Create';

	const form = useForm<IColorInput>({
		mode: 'onChange',
		values: color
			? {
					name: color?.name || '',
					value: color?.value || ''
				}
			: {
					name: '',
					value: ''
				}
	});

	const onSubmit: SubmitHandler<IColorInput> = (data) => {
		if (color) updateColor(data);
		else createColor(data);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<Heading title={title} description={description} />

				{color && (
					<ConfirmModal handleClick={() => deleteColor()}>
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
							name='name'
							rules={{
								required: 'Name is required'
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>

									<FormControl>
										<Input
											aria-label='Color name'
											placeholder='Color name'
											disabled={isLoadingCreate || isLoadingUpdate}
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='value'
							rules={{
								required: 'Value is required'
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Value</FormLabel>

									<FormControl>
										<Input
											aria-label='Color value'
											placeholder='Color value'
											disabled={isLoadingCreate || isLoadingUpdate}
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

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
