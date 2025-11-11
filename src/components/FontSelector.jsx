import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import styles from '../styles/fontSelector.module.scss';

const FontSelector = () => {
  const [fontMenuOpen, setFontMenuOpen] = useState(false);
  const [selectedFont, setSelectedFont] = useState('Segoe UI');
  const { isDarkMode } = useTheme();

  // Font list with 20+ options
  const fonts = [
    'Segoe UI',
    'Arial',
    'Verdana',
    'Times New Roman',
    'Georgia',
    'Courier New',
    'Comic Sans MS',
    'Trebuchet MS',
    'Impact',
    'Palatino Linotype',
    'Garamond',
    'Bookman',
    'Tahoma',
    'Lucida Console',
    'Liberation Mono',
    'Noto Sans Tamil',
    'Mukta Malar',
    'Vijaya',
    'Kalimati',
    'Kalpurush',
    'Lora',
    'Playfair Display',
    'Montserrat',
  ];

  const handleFontChange = (font) => {
    setSelectedFont(font);
    setFontMenuOpen(false);
    
    // Apply font to entire document
    document.documentElement.style.setProperty('--font-family-primary', `'${font}', sans-serif`);
    
    // Store in localStorage for persistence
    localStorage.setItem('selectedFont', font);
  };

  return (
    <div className={styles.fontSelectorContainer}>
      <button
        type="button"
        className={styles.fontButton}
        onClick={() => setFontMenuOpen(!fontMenuOpen)}
        aria-label="Select Font"
        aria-expanded={fontMenuOpen}
        title="Change Font"
      >
        <span className={styles.fontIcon}>🔤</span>
      </button>

      {/* Font Dropdown Menu */}
      <AnimatePresence>
        {fontMenuOpen && (
          <motion.div
            className={styles.fontDropdown}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.fontDropdownHeader}>
              <span className={styles.dropdownTitle}>Select Font</span>
            </div>
            
            <div className={styles.fontList}>
              {fonts.map((font) => (
                <button
                  key={font}
                  type="button"
                  className={`${styles.fontOption} ${
                    selectedFont === font ? styles.active : ''
                  }`}
                  onClick={() => handleFontChange(font)}
                  style={{ fontFamily: `'${font}', sans-serif` }}
                >
                  {/* Radio button indicator */}
                  <span className={styles.radioButton}>
                    {selectedFont === font ? '🔘' : '⭕'}
                  </span>
                  <span className={styles.fontName}>{font}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FontSelector;
