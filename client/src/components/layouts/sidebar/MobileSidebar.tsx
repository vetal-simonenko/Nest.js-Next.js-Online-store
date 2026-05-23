import { Menu } from 'lucide-react';

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger
} from '@/components/ui/sheet';

import { Sidebar } from './Sidebar';

export function MobileSidebar() {
	return (
		<Sheet>
			<SheetTrigger className='lg:hidden pr-4 hover:opacity-75 transition'>
				<Menu />
			</SheetTrigger>

			<SheetContent side='left' className='p-0'>
				<SheetTitle className='sr-only'>Navigation menu</SheetTitle>
				<SheetDescription className='sr-only'>
					Mobile sidebar navigation
				</SheetDescription>
				<Sidebar />
			</SheetContent>
		</Sheet>
	);
}
