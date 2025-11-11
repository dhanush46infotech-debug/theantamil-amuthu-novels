import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import styles from '../styles/search.module.scss';

const SearchBar = ({ onSearch, isMobile = false }) => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { currentLanguage, setCurrentLanguage, t } = useLanguage();
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Available languages for search
  const languages = [
    { code: 'TAMIL', name: t('languages.tamil'), icon: '🇮🇳' },
    { code: 'ENGLISH', name: t('languages.english'), icon: '🇬🇧' },
    { code: 'TELUGU', name: t('languages.telugu'), icon: '🇮🇳' }
  ];

  const translatedPlaceholder = t('search.placeholder');

  // Handle input change
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Call parent onSearch callback if provided
    if (onSearch) {
      onSearch(value);
    }
  };

  // Clear search input
  const handleClear = () => {
    setQuery('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (onSearch) {
      onSearch('');
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform search action
    if (query.trim() && onSearch) {
      onSearch(query.trim());
    }
  };

  // Handle ESC key to close on mobile
  useEffect(() => {
    if (!isMobile || !isExpanded) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsExpanded(false);
        setQuery('');
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobile, isExpanded]);

  // Handle click outside to close dropdown/mobile overlay
  useEffect(() => {
    if (!isFocused && !isExpanded) return;

    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsFocused(false);
        if (isMobile) {
          setIsExpanded(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isFocused, isExpanded, isMobile]);

  // Auto-focus when expanded on mobile
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  // Mobile collapsed button view
  if (isMobile && !isExpanded) {
    return (
      <>
        <button
          type="button"
          className={styles.searchButton}
          onClick={() => setIsExpanded(true)}
          aria-label={t('aria.openSearch')}
          aria-expanded={isExpanded}
        >
          🔍
        </button>
      </>
    );
  }

  // Mobile expanded overlay view
  if (isMobile && isExpanded) {
    return (
      <>
        {/* Overlay background */}
        <AnimatePresence>
          <motion.div
            className={styles.searchOverlay}
            onClick={() => setIsExpanded(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        </AnimatePresence>

        {/* Mobile search container */}
        <motion.div
          className={styles.searchContainerMobile}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          ref={containerRef}
        >
          {/* Language Selector - Outside and Left of Search Bar */}
          <div className={styles.languageSelectorExternal}>
            <button
              type="button"
              className={styles.languageIconButton}
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              aria-label={t('search.selectLanguage')}
              aria-expanded={langMenuOpen}
            >
              🌐
            </button>

            {/* Language Dropdown Menu */}
            <AnimatePresence>
              {langMenuOpen && (
                <motion.div
                  className={styles.languageDropdown}
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      className={`${styles.languageOption} ${
                        currentLanguage === lang.code ? styles.active : ''
                      }`}
                      onClick={() => {
                        setCurrentLanguage(lang.code);
                        setLangMenuOpen(false);
                      }}
                    >
                      <span className={styles.langIcon}>{lang.icon}</span>
                      <span className={styles.langName}>{lang.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search Form */}
          <form
            className={styles.searchForm}
            onSubmit={handleSubmit}
            role="search"
          >
            <div className={styles.searchWrapper}>
              {/* Search Input */}
              <input
                ref={inputRef}
                type="search"
                className={styles.searchInput}
                placeholder={translatedPlaceholder}
                value={query}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                aria-label={t('search.label')}
                autoComplete="off"
              />

              {/* Clear Button */}
              {query && (
                <motion.button
                  type="button"
                  className={styles.clearButton}
                  onClick={handleClear}
                  aria-label={t('aria.clearSearch')}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  ✕
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>
      </>
    );
  }

  // Desktop view (always visible)
  return (
    <div className={styles.searchContainer} ref={containerRef}>
      {/* Language Selector - Outside and Left of Search Bar */}
      <div className={styles.languageSelectorExternal}>
        <button
          type="button"
          className={styles.languageIconButton}
          onClick={() => setLangMenuOpen(!langMenuOpen)}
          aria-label="Select search language"
          aria-expanded={langMenuOpen}
        >
          🌐
        </button>

        {/* Language Dropdown Menu */}
        <AnimatePresence>
          {langMenuOpen && (
            <motion.div
              className={styles.languageDropdown}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  className={`${styles.languageOption} ${
                    currentLanguage === lang.code ? styles.active : ''
                  }`}
                  onClick={() => {
                    setCurrentLanguage(lang.code);
                    setLangMenuOpen(false);
                  }}
                >
                  <span className={styles.langIcon}>{lang.icon}</span>
                  <span className={styles.langName}>{lang.name}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search Bar */}
      <form
        className={styles.searchForm}
        onSubmit={handleSubmit}
        role="search"
      >
        <motion.div
          className={styles.searchWrapper}
          initial={false}
          animate={{
            width: isFocused ? 'var(--search-width-expanded)' : 'var(--search-width-expanded)',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Search Input */}
          <input
            ref={inputRef}
            type="search"
            className={styles.searchInput}
            placeholder={translatedPlaceholder}
            value={query}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            aria-label={t('search.label')}
            autoComplete="off"
          />

          {/* Clear Button */}
          <AnimatePresence>
            {query && (
              <motion.button
                type="button"
                className={styles.clearButton}
                onClick={handleClear}
                aria-label="Clear search"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                ✕
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </form>

      {/* Search Results Dropdown - Future Implementation */}
      {/* Uncomment when ready to add search results
      <AnimatePresence>
        {isFocused && query && (
          <motion.div
            className={styles.searchDropdown}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.noResults}>No results found</div>
          </motion.div>
        )}
      </AnimatePresence>
      */}
    </div>
  );
};

export default SearchBar;
