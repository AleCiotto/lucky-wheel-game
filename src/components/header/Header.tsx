import LanguageSelector from '../language-selector/LanguageSelector';
import ThemeSwitcher from '../theme-switcher/ThemeSwitcher';
import './header.scss';

const Header = () => {
    return (
        <header className='header p-4 flex justify-between bg-stoa dark:bg-stoa-dark'>
            <ThemeSwitcher />
            <LanguageSelector />
        </header>
    )
}

export default Header;
