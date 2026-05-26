import { Metadata } from 'next';
import { NO_INDEX_PAGE } from '@/constants/seo.constants';
import { Reviews } from './Reviews';

export const metadata: Metadata = {
	title: 'Store Review',
	...NO_INDEX_PAGE
};

export default function ReviewPage() {
	return <Reviews />;
}
