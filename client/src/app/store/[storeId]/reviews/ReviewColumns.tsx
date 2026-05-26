import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

export interface IReviewColumn {
	id: string;
	createdAt: string;
	rating: string;
	username: string;
}

export const reviewColumns: ColumnDef<IReviewColumn>[] = [
	{
		accessorKey: 'createdAt',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Created At
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		}
	},
	{
		accessorKey: 'rating',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Rating
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		}
	},
	{
		accessorKey: 'username',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					User
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		}
	}
];
