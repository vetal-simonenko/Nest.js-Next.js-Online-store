import { UseFormReturn } from 'react-hook-form';

import { IAuthForm } from '@/shared/types/auth.interface';
import {
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from '@/components/ui/form-elements/form';
import { Input } from '@/components/ui/input';
import { validEmail } from '@/shared/regex';

interface AuthFieldsProps {
	form: UseFormReturn<IAuthForm>;
	isPending: boolean;
	isReg?: boolean;
}

export function AuthFields({
	form,
	isPending,
	isReg = false
}: AuthFieldsProps) {
	return (
		<>
			{isReg && (
				<FormField
					control={form.control}
					name='name'
					rules={{
						required: 'Name is required'
					}}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									type='text'
									aria-label='Name'
									placeholder='John'
									disabled={isPending}
									{...field}
									value={field.value ?? ''}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			)}
			<FormField
				control={form.control}
				name='email'
				rules={{
					required: 'Email is required',
					pattern: {
						value: validEmail,
						message: 'Invalid email address'
					}
				}}
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input
								aria-label='Email'
								placeholder='email@email.com'
								disabled={isPending}
								{...field}
								value={field.value ?? ''}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name='password'
				rules={{
					required: 'Password is required',
					minLength: {
						value: 6,
						message: 'Password must be at least 6 characters'
					}
				}}
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input
								aria-label='Password'
								type='password'
								placeholder='Password'
								disabled={isPending}
								{...field}
								value={field.value ?? ''}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
}
