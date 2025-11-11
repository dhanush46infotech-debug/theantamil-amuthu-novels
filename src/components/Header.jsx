import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Menu from './Menu';
import SearchBar from './SearchBar';
import DarkModeToggle from './DarkModeToggle';
import FontSelector from './FontSelector';
import IconButton from './IconButton';
import HeaderSocialIcons from './HeaderSocialIcons';
import Logo from '../assets/TTM NOVRLS.png';
import styles from '../styles/header.module.scss';
import { useLanguage } from '../context/LanguageContext';

const HamburgerMenu = ({ isOpen, onClick, ariaLabel }) => {
  return (
    <button
      className={styles.hamburger}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={isOpen}
    >
      <motion.span
        animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.28 }}
      />
      <motion.span
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.28 }}
      />
    </button>
  );
};

const LanguageSwitcher = ({ currentLanguage, setCurrentLanguage }) => {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  const languages = ['TAMIL', 'ENGLISH'];

  const handleSelect = (lang) => {
    setCurrentLanguage(lang);
    setOpen(false);
  };

  return (
    <div className={styles.languageSwitcher}>
      <button
        className={styles.languageButton}
        onClick={() => setOpen(!open)}
        aria-label={t('aria.selectLanguage')}
        aria-expanded={open}
      >
        🌐
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.languageMenu}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            <ul className={styles.languageList}>
              {languages.map((lang) => (
                <li key={lang}>
                  <button
                    className={`${styles.languageItem} ${
                      currentLanguage === lang ? styles.active : ''
                    }`}
                    onClick={() => handleSelect(lang)}
                  >
                    {lang}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationCount] = useState(3); // Example notification count
  const { currentLanguage, setCurrentLanguage, t } = useLanguage();

  // Detect if mobile viewport
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Search handler
  const handleSearch = (query) => {
    console.log('Search query:', query);
    // Implement search logic here
  };

  // Notification handler
  const handleNotificationClick = () => {
    console.log('Notifications clicked');
    // Implement notification logic here
  };

  // User login handler
  const handleUserLoginClick = () => {
    console.log('User login clicked');
    // Implement user login logic here
  };

  // Admin login handler
  const handleAdminLoginClick = () => {
    console.log('Admin login clicked');
    // Implement admin login logic here
  };

  return (
    <>
      <header className={styles.header}>
        {/* Left Section: Hamburger Menu */}
        <div className={styles.leftSection}>
          <HamburgerMenu
            isOpen={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            ariaLabel={menuOpen ? t('aria.closeMenu') : t('aria.openMenu')}
          />
        </div>

        {/* Center Section: Logo + Search Bar + Controls */}
        <div className={styles.centerSection}>
          <img src={Logo} alt="TTM Novels Logo" className={styles.logo} />

          {/* Search Bar - Now in center with name */}
          <SearchBar
            onSearch={handleSearch}
            isMobile={isMobile}
          />

          {/* Dark Mode Toggle - Hidden on mobile */}
          {!isMobile && <DarkModeToggle showText={false} />}

          {/* Notification Bell Icon */}
          <IconButton
            icon="🔔"
            label="Notifications"
            ariaLabel={t('notifications.label') || 'Notifications'}
            onClick={handleNotificationClick}
            badge={notificationCount}
          />

          {/* User Login Icon with 3 people emoji */}
          <IconButton
            icon="👥"
            label="User Login"
            ariaLabel={t('user.login')}
            onClick={handleUserLoginClick}
            className={styles.yellowIcon}
          />

          {/* Admin Login Icon */}
          <IconButton
            icon="👤"
            label="Admin Login"
            ariaLabel={t('user.adminLogin')}
            onClick={handleAdminLoginClick}
            className={styles.yellowIcon}
          />
        </div>

        {/* Right Section: Font Selector & Social Icons */}
        <div className={styles.rightSection}>
          {/* Font Selector - Hidden on mobile */}
          {!isMobile && <FontSelector />}

          {/* Social Icons - Compact horizontal layout */}
          <div className="flex items-center ml-2" style={{ flexShrink: 0 }}>
            <HeaderSocialIcons />
          </div>
        </div>
      </header>

      {/* Menu Drawer */}
      <Menu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Header;
