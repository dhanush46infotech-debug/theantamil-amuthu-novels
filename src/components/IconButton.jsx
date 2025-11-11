import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/controls.module.scss';

const IconButton = ({
  icon,
  label,
  onClick,
  badge = null,
  className = '',
  ariaLabel,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={styles.iconButtonWrapper}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.button
        type="button"
        className={`${styles.iconButton} ${className}`}
        onClick={onClick}
        aria-label={ariaLabel || label}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Icon */}
        <span aria-hidden="true">{icon}</span>

        {/* Notification Badge (if provided) */}
        {badge !== null && badge > 0 && (
          <motion.span
            className={styles.notificationBadge}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          >
            {badge > 99 ? '99+' : badge}
          </motion.span>
        )}
      </motion.button>

      {/* Hover Tooltip */}
      <AnimatePresence>
        {isHovered && label && (
          <motion.div
            className={styles.iconButtonTooltip}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IconButton;
