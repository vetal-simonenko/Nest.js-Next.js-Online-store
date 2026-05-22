'use client';

import { useState } from 'react';
import { useAuthForm } from '@/app/auth/useAuthForm';
import styles from './Auth.module.scss';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import Image from 'next/image';
import { Form } from '@/components/ui/form-elements/form';
import { Button } from '@/components/ui/button';
import { AuthFields } from '@/app/auth/AuthFields';
import { Social } from '@/app/auth/Social';

export function Auth() {
	const [isReg, setIsReg] = useState(false);

	const { onSubmit, form, isPending } = useAuthForm(isReg);

	return (
		<div className={styles.wrapper}>
			<div className={styles.left}>
				<Image
					src='/images/auth.svg'
					alt='TeaShop auth'
					width={100}
					height={100}
					loading='eager'
				/>
			</div>

			<div className={styles.right}>
				<Card className={styles.card}>
					<CardHeader className={styles.header}>
						<CardTitle>
							{isReg ? 'Create account' : 'Sign in to account'}
						</CardTitle>

						<CardDescription>
							Sign in or create an account to place orders!
						</CardDescription>
					</CardHeader>

					<CardContent className={styles.content}>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)}>
								<AuthFields form={form} isPending={isPending} isReg={isReg} />
								<Button disabled={isPending}>Continue</Button>
							</form>
						</Form>
						<Social />
					</CardContent>

					<CardFooter className={styles.footer}>
						{isReg ? 'Already have an account?' : "Don't have an account yet?"}

						<button onClick={() => setIsReg(!isReg)}>
							{isReg ? 'Sign in' : 'Create account'}
						</button>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
