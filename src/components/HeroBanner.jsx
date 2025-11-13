import React, { useState, useEffect, useRef } from 'react';
import styles from './heroBanner.module.scss';
import { useLanguage } from '../context/LanguageContext';

/**
 * HeroBanner - Multi-slide carousel with fixed 252×371 container
 * Slide 1: Welcome
 * Slide 2: Featured authors with avatars
 * Slide 3: Social icons and links
 */
const HeroBanner = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Welcome';
  const { currentLanguage } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideStartX, setSlideStartX] = useState(0);
  const [shouldPlayAnimation, setShouldPlayAnimation] = useState(false);
  const slideContainerRef = useRef(null);
  const intersectionObserverRef = useRef(null);

  // Slider 2 - Authors data
  const authorSlides = [
    {
      name: 'Swetha swe',
      avatar: '👩‍💼',
      link: 'https://tamil.pratilipi.com/user/%F0%9F%92%99swetha%F0%9F%92%99-8cuvz20w13'
    },
    {
      name: 'Thenmozhi',
      avatar: '📚',
      link: 'https://tamil.pratilipi.com/user/%E2%9C%8D%EF%B8%8F%E0%AE%A4%E0%AF%87%E0%AE%A8%E0%AF%8D%E0%AE%AE%E0%AF%8A%E0%AE%B4%E0%AE%BF-%E2%9C%8D%EF%B8%8F-34-thenmozhi-34-u0958h9i3f?utm_campaign=authorprofile_share&utm_source=ios'
    },
    {
      name: 'Mohanaamozhi',
      avatar: '✨',
      link: 'https://tamil.pratilipi.com/user/%E2%9C%8D%EF%B8%8F-%E0%AE%AE%E0%AF%8B%E0%AE%95%E0%AE%A9%E0%AE%BE-%E2%9C%8D%EF%B8%8F-697n99g2nt'
    }
  ];

  // Slider 3 - Social links data
  const socialLinks = [
    { name: 'Gmail', url: 'mailto:thentamizhamuzhunovels@gmail.com', icon: '✉️', ariaLabel: 'Send email' },
    { name: 'Facebook', url: 'https://www.facebook.com/share/g/1FKze6xJV1/', icon: '👥', ariaLabel: 'Visit Facebook' },
    { name: 'Instagram', url: 'https://instagram.com/', icon: '📷', ariaLabel: 'Visit Instagram' },
    { name: 'WhatsApp', url: 'https://whatsapp.com/channel/0029VbB0Wxt65yDK3ZTYCC1D', icon: '💬', ariaLabel: 'Join WhatsApp' },
    { name: 'YouTube - Thenmozhi', url: 'https://www.youtube.com/@thenthuzhinovels', icon: '📺', ariaLabel: 'Watch Thenmozhi' },
    { name: 'YouTube - Mohanaamozhi', url: 'https://www.youtube.com/@mohanaamozhi_novels', icon: '🎬', ariaLabel: 'Watch Mohanaamozhi' },
    { name: 'YouTube - Swetha', url: 'https://youtube.com/@swethaa_swe?si=GqKD38Gj9YAa6mhw', icon: '🎥', ariaLabel: 'Watch Swetha' }
  ];

  // Typing animation for Slide 1
  useEffect(() => {
    if (!shouldPlayAnimation) return;
    
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [shouldPlayAnimation]);

  // IntersectionObserver for performance: only animate when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShouldPlayAnimation(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (slideContainerRef.current) {
      observer.observe(slideContainerRef.current);
    }

    intersectionObserverRef.current = observer;
    return () => observer.disconnect();
  }, []);

  // Lazy-load scripts
  useEffect(() => {
    const loadScript = (id, src) => {
      if (!document.getElementById(id)) {
        const script = document.createElement('script');
        script.id = id;
        script.src = src;
        script.defer = true;
        document.head.appendChild(script);
      }
    };

    loadScript('rotating-card-stack-script', '/rotating-card-stack.js');
    loadScript('book-flip-script', '/book-flip.js');
    loadScript('crime-thriller-book-script', '/crime-thriller-book.js');
  }, []);

  // Slide navigation
  const goToSlide = (index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(index % 3);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const nextSlide = () => goToSlide(currentSlide + 1);
  const prevSlide = () => goToSlide(currentSlide - 1 + 3);

  // Touch/Swipe handlers
  const handleTouchStart = (e) => {
    setSlideStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = slideStartX - endX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setSlideStartX(e.clientX);
  };

  const handleMouseUp = (e) => {
    const diff = slideStartX - e.clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  // Keyboard handlers
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, isAnimating]);

  return (
    <div className={styles['hero-banner-wrapper']}>
      {/* Full-page background container */}
      <div className={styles['hero-banner-container']}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        ref={slideContainerRef}>
        
        {/* Background floating letters */}
        <style>{`
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }

          @keyframes floatLetters {
            0% { transform: translateY(0) translateX(-30px) rotate(0deg); opacity: 0.22; }
            25% { transform: translateY(-18px) translateX(8px) rotate(6deg); opacity: 0.32; }
            50% { transform: translateY(-14px) translateX(35px) rotate(-2deg); opacity: 0.28; }
            75% { transform: translateY(-8px) translateX(10px) rotate(4deg); opacity: 0.30; }
            100% { transform: translateY(0) translateX(-30px) rotate(-4deg); opacity: 0.22; }
          }

          @keyframes floatLetters2 {
            0% { transform: translateY(0) translateX(35px) rotate(0deg); opacity: 0.22; }
            25% { transform: translateY(-22px) translateX(-10px) rotate(-6deg); opacity: 0.30; }
            50% { transform: translateY(-12px) translateX(-40px) rotate(3deg); opacity: 0.26; }
            75% { transform: translateY(-6px) translateX(-15px) rotate(-2deg); opacity: 0.32; }
            100% { transform: translateY(0) translateX(35px) rotate(4deg); opacity: 0.22; }
          }

          @keyframes floatLetters3 {
            0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.22; }
            25% { transform: translateY(-14px) translateX(28px) rotate(8deg); opacity: 0.34; }
            50% { transform: translateY(-10px) translateX(-25px) rotate(-5deg); opacity: 0.29; }
            75% { transform: translateY(-18px) translateX(15px) rotate(2deg); opacity: 0.33; }
            100% { transform: translateY(0) translateX(0) rotate(-6deg); opacity: 0.22; }
          }

          .floating-letter {
            position: absolute;
            font-size: 30px;
            font-weight: 700;
            color: #FF1493;
            opacity: 0.22;
            pointer-events: none;
            text-shadow: 0 0 10px rgba(255, 20, 147, 0.25);
            z-index: 1;
            filter: drop-shadow(0 0 6px rgba(255, 20, 147, 0.15));
            will-change: transform, opacity;
            animation-fill-mode: both;
          }
        `}</style>

        {/* Floating language letters background - only on slide 1 */}
        {currentSlide === 0 && (() => {
          let letters = [];
          if (currentLanguage === 'ENGLISH') {
            letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').slice(0, 18);
          } else if (currentLanguage === 'TELUGU') {
            letters = ['క','ఖ','గ','ఘ','ఙ','చ','ఛ','జ','ఝ','ఞ','ట','ఠ','డ','ఢ','ణ','త','థ','ద'];
          } else if (currentLanguage === 'KANNADA') {
            letters = ['ಕ','ಖ','ಗ','ಘ','ಙ','ಚ','ಛ','ಜ','ಝ','ಞ','ಟ','ಠ','ಡ','ಢ','ಣ','ತ','ಥ','ದ'];
          } else if (currentLanguage === 'MALAYALAM') {
            letters = ['ക','ഖ','ഗ','ഘ','ങ','ച','ഛ','ജ','ഝ','ഞ','ട','ഠ','ഡ','ഢ','ണ','ത','ഥ','ദ'];
          } else if (currentLanguage === 'HINDI') {
            letters = ['क','ख','ग','घ','ङ','च','छ','ज','झ','ञ','ट','ठ','ड','ढ','ण','त','थ','द'];
          } else {
            // default Tamil
            letters = ['க', 'ங', 'ச', 'ஞ', 'ட', 'ண', 'த', 'ந', 'ப', 'ம', 'ய', 'ர', 'ல', 'வ', 'ழ', 'ள', 'ற', 'ன'];
          }

          return letters.map((letter, idx) => {
            const names = ['floatLetters', 'floatLetters2', 'floatLetters3'];
            const animName = names[idx % names.length];
            return (
              <div
                key={idx}
                className="floating-letter"
                style={{
                  left: `${6 + (idx * 5) % 84}%`,
                  top: `${28 + (idx * 6) % 44}%`,
                  animationName: animName,
                  animationDuration: `${3 + (idx % 3) * 0.5}s`,
                  animationTimingFunction: 'ease-in-out',
                  animationIterationCount: 'infinite',
                  animationDirection: 'alternate',
                  animationDelay: `${(idx % 4) * 0.25}s`,
                  zIndex: 1,
                }}
              >
                {letter}
              </div>
            );
          });
        })()}

        {/* Slides container */}
        <div className={styles['slides-container']}>
          {/* SLIDE 1: Welcome */}
          <div
            className={styles.slide}
            style={{
              opacity: currentSlide === 0 ? 1 : 0,
              visibility: currentSlide === 0 ? 'visible' : 'hidden',
              position: 'absolute',
              transition: 'opacity 0.3s ease-in-out'
            }}
          >
            <div style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
              width: '100%',
              height: '100%',
              padding: '40px 20px',
              margin: '0 auto',
              position: 'relative'
            }}>

              {/* Book flip (left-centered) */}
              <div style={{
                position: 'absolute',
                left: 'clamp(12px, 4vw, 48px)',
                top: '50%',
                transform: 'translateY(-50%) scale(0.525)',
                transformOrigin: 'center center',
                zIndex: 3,
                pointerEvents: 'none'
              }}>
                <book-flip 
                  title="Romantic Novels" 
                  subtitle="Amuthu Collection" 
                  author="Antha Tamil" 
                  size="220" 
                  duration="15s"
                ></book-flip>
              </div>

              {/* Crime & Thriller book (right-centered) with red cover */}
              <div style={{
                position: 'absolute',
                right: 'clamp(12px, 4vw, 48px)',
                top: '50%',
                transform: 'translateY(-50%) scale(0.525)',
                transformOrigin: 'center center',
                zIndex: 3,
                pointerEvents: 'none'
              }}>
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%'
                }}>
                  {/* Red overlay for cover */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: '#E53935',
                    opacity: 0.85,
                    mixBlendMode: 'multiply',
                    pointerEvents: 'none',
                    zIndex: 5,
                    borderRadius: '4px'
                  }} />
                  <crime-thriller-book 
                    title="குற்றம் திகில் நாவல்கள்" 
                    subtitle="Dark Secrets" 
                    author="Mystery Author" 
                    size="200" 
                    duration="14s"
                    style={{
                      position: 'relative',
                      zIndex: 3
                    }}
                  ></crime-thriller-book>
                </div>
              </div>

              {/* Centered container for content */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '24px',
                maxWidth: '100%',
                width: '100%',
                margin: '0 auto'
              }}>

                {/* Tamil text with three heart icons beside it */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '20px',
                  flexWrap: 'wrap'
                }}>
                  {/* Left hearts */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    flexShrink: 0
                  }} aria-hidden>
                    <div style={{ fontSize: 'clamp(32px, 4vw, 42px)', lineHeight: 1 }}>❤️</div>
                    <div style={{ fontSize: 'clamp(32px, 4vw, 42px)', lineHeight: 1 }}>❤️</div>
                    <div style={{ fontSize: 'clamp(32px, 4vw, 42px)', lineHeight: 1 }}>❤️</div>
                  </div>

                  {/* Tamil heading */}
                  <h1 style={{
                    fontSize: 'clamp(20px, 5vw, 32px)',
                    fontWeight: '700',
                    color: '#ffffff',
                    margin: 0,
                    lineHeight: '1.5',
                    letterSpacing: '0.5px',
                    textAlign: 'center'
                  }}>
                    தேன்தமிழமுது தேடிப்படி <br />
                    அள்ளி அள்ளி பருக ஆசை பெருகுமே!
                  </h1>

                  {/* Right hearts */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    flexShrink: 0
                  }} aria-hidden>
                    <div style={{ fontSize: 'clamp(32px, 4vw, 42px)', lineHeight: 1 }}>❤️</div>
                    <div style={{ fontSize: 'clamp(32px, 4vw, 42px)', lineHeight: 1 }}>❤️</div>
                    <div style={{ fontSize: 'clamp(32px, 4vw, 42px)', lineHeight: 1 }}>❤️</div>
                  </div>
                </div>

                {/* Typing Welcome text */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '90px',
                  position: 'relative'
                }}>
                  {/* Typing Welcome text */}
                  <h2 style={{
                    fontSize: 'clamp(48px, 8vw, 72px)',
                    fontWeight: 'bold',
                    color: '#FFD700',
                    fontFamily: 'Georgia, serif',
                    letterSpacing: '4px',
                    textShadow: '0 0 25px rgba(255,215,0,0.6), 2px 2px 4px rgba(0,0,0,0.5)',
                    margin: 0
                  }}>
                    {typedText}
                    <span style={{
                      display: typedText.length < fullText.length ? 'inline-block' : 'none',
                      width: '4px',
                      height: '1em',
                      backgroundColor: '#FFD700',
                      marginLeft: '6px',
                      animation: 'blink 1s infinite',
                      verticalAlign: 'middle'
                    }} />
                  </h2>
                </div>
              </div>

              {/* English text - Below everything */}
              <p style={{
                fontSize: 'clamp(16px, 2.5vw, 20px)',
                fontWeight: '500',
                color: '#e0e0e0',
                margin: '0',
                fontStyle: 'italic',
                letterSpacing: '0.5px',
                textAlign: 'center'
              }}>
                Countless words to find in endless worlds.
              </p>
            </div>
          </div>

          {/* SLIDE 2: Authors */}
          <div
            className={styles.slide}
            style={{
              opacity: currentSlide === 1 ? 1 : 0,
              visibility: currentSlide === 1 ? 'visible' : 'hidden',
              position: 'absolute',
              transition: 'opacity 0.3s ease-in-out'
            }}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '18px',
              width: '100%',
              height: '100%',
              padding: '18px',
              textAlign: 'center'
            }}>
              <h3 style={{
                fontSize: 'clamp(20px, 5.5vw, 30px)',
                fontWeight: '700',
                color: '#FFD700',
                margin: 0,
                marginBottom: '12px'
              }}>
                Follow us on Pratilipi for more stories!
              </h3>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '18px',
                flex: 1,
                flexWrap: 'wrap'
              }}>
                {authorSlides.map((author, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                    <button
                      onClick={() => window.open(author.link, '_blank')}
                      style={{
                        width: 'clamp(56px, 12vw, 70px)',
                        height: 'clamp(56px, 12vw, 70px)',
                        borderRadius: '50%',
                        border: '2px solid #FF1493',
                        backgroundColor: 'rgba(255, 20, 147, 0.15)',
                        fontSize: 'clamp(18px, 6.5vw, 40px)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.18s ease',
                        padding: 0,
                        boxSizing: 'border-box'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 20, 147, 0.28)';
                        e.currentTarget.style.transform = 'scale(1.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 20, 147, 0.15)';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                      aria-label={`Visit ${author.name} on Pratilipi`}
                    >
                      {author.avatar}
                    </button>
                    <span style={{
                      fontSize: 'clamp(16px, 3vw, 20px)',
                      color: '#ffffff',
                      fontWeight: '600',
                      textAlign: 'center'
                    }}>
                      {author.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SLIDE 3: Social Links */}
          <div
            className={styles.slide}
            style={{
              opacity: currentSlide === 2 ? 1 : 0,
              visibility: currentSlide === 2 ? 'visible' : 'hidden',
              position: 'absolute',
              transition: 'opacity 0.3s ease-in-out'
            }}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              width: '100%',
              height: '100%',
              padding: '16px',
              textAlign: 'center'
            }}>
              <h3 style={{
                fontSize: 'clamp(20px, 5.5vw, 30px)',
                fontWeight: '700',
                color: '#FFD700',
                margin: 0,
                marginBottom: '8px'
              }}>
                Let's build a world together!
              </h3>
              <p style={{
                fontSize: 'clamp(12px, 2.7vw, 15px)',
                color: '#e0e0e0',
                margin: 0,
                marginBottom: '8px'
              }}>
                Join our community
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
                flex: 1,
                width: '100%',
                maxWidth: '240px',
                justifyContent: 'center',
                margin: '0 auto'
              }}>
                {socialLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '3px',
                      padding: '6px',
                      borderRadius: '6px',
                      backgroundColor: 'rgba(255, 20, 147, 0.1)',
                      border: '1px solid rgba(255, 20, 147, 0.3)',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 20, 147, 0.2)';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 20, 147, 0.1)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    aria-label={link.ariaLabel}
                  >
                    <span style={{ fontSize: '25px' }}>{link.icon}</span>
                    <span style={{
                      fontSize: 'clamp(12px, 3.2vw, 18px)',
                      color: '#FFD700',
                      fontWeight: '600',
                      lineHeight: '1.1'
                    }}>
                      {link.name.split(' - ')[0]}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          style={{
            position: 'absolute',
            left: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255, 20, 147, 0.7)',
            border: 'none',
            color: '#fff',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            cursor: 'pointer',
            zIndex: 20,
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 20, 147, 1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 20, 147, 0.7)';
          }}
          aria-label="Previous slide"
        >
          ◀
        </button>

        <button
          onClick={nextSlide}
          style={{
            position: 'absolute',
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255, 20, 147, 0.7)',
            border: 'none',
            color: '#fff',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            cursor: 'pointer',
            zIndex: 20,
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 20, 147, 1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 20, 147, 0.7)';
          }}
          aria-label="Next slide"
        >
          ▶
        </button>

        {/* Navigation Dots */}
        <div style={{
          position: 'absolute',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
          zIndex: 20
        }}>
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              style={{
                width: currentSlide === idx ? '10px' : '6px',
                height: '6px',
                borderRadius: '3px',
                border: 'none',
                backgroundColor: currentSlide === idx ? '#FFD700' : 'rgba(255, 215, 0, 0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={currentSlide === idx ? 'page' : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
