import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, Pencil } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { STORE_URL } from '@/config/url.config';

export interface ICategoryColumn {
	id: string;
	createdAt: string;
	title: string;
	storeId: string;
}

export const categoryColumns: ColumnDef<ICategoryColumn>[] = [
	{
		accessorKey: 'title',

		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Name
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			);
		}
	},
	{
		accessorKey: 'createdAt',

		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Created At
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			);
		}
	},
	{
		accessorKey: 'actions',
		header: 'Actions',
		cell: ({ row }) => (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' className='size-8 p-0'>
						<MoreHorizontal className='size-4' />
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align='end'>
					<DropdownMenuLabel>Actions</DropdownMenuLabel>

					<Link
						href={STORE_URL.categoryEdit(row.original.storeId, row.original.id)}
					>
						<DropdownMenuItem>
							<Pencil className='mr-2 size-4' />
							Edit Category
						</DropdownMenuItem>
					</Link>
				</DropdownMenuContent>
			</DropdownMenu>
		)
	}
];
