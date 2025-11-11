import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import styles from '../styles/controls.module.scss';

const DarkModeToggle = ({ showText = true }) => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    toggleTheme();

    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // Get current label from translation
  const currentLabel = theme === 'dark' ? t('theme.darkMode') : t('theme.lightMode');

  // Icons for different theme modes
  const icon = theme === 'dark' ? '🌙' : '☀️';

  return (
    <motion.button
      type="button"
      className={styles.darkModeToggle}
      onClick={handleToggle}
      aria-label={t('theme.toggle')}
      aria-pressed={theme === 'dark'}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Icon with rotation animation */}
      <motion.span
        className={styles.darkModeIcon}
        animate={isAnimating ? { rotate: 360, scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {icon}
      </motion.span>

      {/* Text label (hidden on mobile if showText is false) */}
      {showText && (
        <span className={styles.darkModeText}>
          {currentLabel}
        </span>
      )}
    </motion.button>
  );
};

export default DarkModeToggle;
