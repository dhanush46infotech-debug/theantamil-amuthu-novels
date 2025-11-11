import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/menu.module.scss';
import { useLanguage } from '../context/LanguageContext';

const Menu = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  const menuItems = [
    { label: t('menu.home'), id: 'home' },
    { label: t('menu.contact'), id: 'contact' },
    { label: t('menu.about'), id: 'about' },
  ];

  const menuVariants = {
    hidden: {
      x: '-100%',
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
    exit: {
      x: '-100%',
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className={styles.menu}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ul className={styles.menuList}>
              {menuItems.map((item, index) => (
                <motion.li
                  key={item.id}
                  variants={itemVariants}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                >
                  <button
                    className={styles.menuItem}
                    onClick={() => {
                      console.log(`Navigating to ${item.id}`);
                      onClose();
                    }}
                  >
                    {item.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Menu;
