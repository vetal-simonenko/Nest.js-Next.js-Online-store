import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/Heading';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/components/ui/sheet';

export function HeaderCart() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='ghost'>Cart</Button>
			</SheetTrigger>

			<SheetContent>
				<SheetHeader>
					<SheetTitle>Shopping cart</SheetTitle>

					<SheetDescription className={'sr-only'}>
						Your cart items are shown here
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
}
