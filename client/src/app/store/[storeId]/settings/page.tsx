import { Settings } from '@/app/store/[storeId]/settings/Settings';
import { Metadata } from 'next';
import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
	title: 'Store Settings',
	...NO_INDEX_PAGE
};

export default function SettingsPage() {
	return <Settings />;
}
