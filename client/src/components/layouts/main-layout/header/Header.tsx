import styles from './Header.module.scss';
import { Logo } from './logo/Logo';
import { HeaderMenu } from './header-menu/HeaderMenu';
import { SearchInput } from '@/components/layouts/main-layout/header/search-input/SearchInput';

export function Header() {
	return (
		<div className={styles.header}>
			<Logo />
			<div className={styles.search}>
				<SearchInput />
			</div>
			<HeaderMenu />
		</div>
	);
}
