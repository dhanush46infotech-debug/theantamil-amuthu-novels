import { motion } from 'framer-motion';
import styles from '../styles/welcome.module.scss';

const WelcomeSection = () => {
  return (
    <section className={styles.welcomeSection}>
      <div className={styles.welcomeContainer}>
        {/* Hearts decoration - top left */}
        <motion.div
          className={styles.heartsLeft}
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
          transition={{
            scale: { duration: 0.5, delay: 0.2 },
            rotate: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
          }}
        >
          ❤️💕
        </motion.div>

        {/* Tamil heading */}
        <motion.h1
          className={styles.tamilHeading}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          தேன்தமிழமுது தேடியடி
        </motion.h1>

        {/* Tamil subheading */}
        <motion.h2
          className={styles.tamilSubheading}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          அள்ளி அள்ளி படிக்க ஆசை பெருகுமே!
        </motion.h2>

        {/* Hearts decoration - after Tamil text */}
        <motion.div
          className={styles.heartsRight}
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
          transition={{
            scale: { duration: 0.5, delay: 0.6 },
            rotate: { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }
          }}
        >
          ❤️💕
        </motion.div>

        {/* English heading */}
        <motion.p
          className={styles.englishHeading}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Countless words to find in endless worlds. We welcome you!
        </motion.p>

        {/* Welcome scroll with animation */}
        <motion.div
          className={styles.welcomeScroll}
          initial={{ opacity: 0, x: -50, rotateY: -90 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <motion.div
            className={styles.scrollInner}
            animate={{ rotateZ: [0, 2, -2, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className={styles.scrollText}>Welcome</span>
          </motion.div>
        </motion.div>

        {/* Animated emoji reading books */}
        <motion.div
          className={styles.emojiReader}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <motion.div
            animate={{
              y: [-5, 5, -5],
              rotate: [-3, 3, -3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            📚📖😊
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WelcomeSection;
