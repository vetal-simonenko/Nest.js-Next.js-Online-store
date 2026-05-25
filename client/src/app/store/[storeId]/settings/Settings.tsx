'use client';

import { useUpdateStore } from '@/hooks/queries/stores/useUpdateStore';
import { useDeleteStore } from '@/hooks/queries/stores/useDeleteStore';
import { IStoreEdit } from '@/shared/types/store.interface';
import { SubmitHandler, useForm } from 'react-hook-form';

import styles from './Settings.module.scss';

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

	return <div>Settings</div>;
}
