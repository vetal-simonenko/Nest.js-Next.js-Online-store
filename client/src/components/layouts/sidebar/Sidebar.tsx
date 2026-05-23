import { Logo } from '@/components/layouts/main-layout/header/logo/Logo';
import { Navigation } from '@/components/layouts/sidebar/navigation/Navigation';
import styles from './Sidebar.module.scss';

export const Sidebar = () => {
	return (
		<div className={styles.sidebar}>
			<Logo />
			<Navigation />
		</div>
	);
};
