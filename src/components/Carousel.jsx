import { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { gsap } from 'gsap';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

/**
 * DESIGN SOURCE: Carousel layout and colors based on provided blue theme mockup
 * 3D carousel with Swiper.js + GSAP animations
 * Content from images 1-3 (pink design mockups)
 */
const Carousel = () => {
  const swiperRef = useRef(null);
  const slidesRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Carousel slides data
  const slides = [
    {
      id: 1,
      image: image1,
      title: 'தேன்தமிழமுது தேடிப்படி அள்ளி அள்ளி பருக ஆசை பெருகுமே!',
      description: 'Countless words to find in endless worlds. We welcome you!',
    },
    {
      id: 2,
      image: image2,
      title: 'Follow us on Pratilipi',
      subtitle: 'for more stories!',
  
    },
    {
      id: 3,
      image: image3,
      title: "Let's build a world together!",
      subtitle: 'Join our community',
      description: 'Connect and share your love for Tamil literature',
    },
  ];

  // GSAP 3D animation on slide change
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);

    // Animate all slides
    slidesRef.current.forEach((slide, index) => {
      if (slide) {
        const isActive = index === swiper.activeIndex;
        const isNext = index === (swiper.activeIndex + 1) % slides.length;
        const isPrev = index === (swiper.activeIndex - 1 + slides.length) % slides.length;

        if (isActive) {
          gsap.to(slide, {
            scale: 1,
            opacity: 1,
            rotationY: 0,
            z: 0,
            duration: 0.8,
            ease: 'power3.out',
          });
        } else if (isNext) {
          gsap.to(slide, {
            scale: 0.85,
            opacity: 0.7,
            rotationY: -35,
            z: -200,
            duration: 0.8,
            ease: 'power3.out',
          });
        } else if (isPrev) {
          gsap.to(slide, {
            scale: 0.85,
            opacity: 0.7,
            rotationY: 35,
            z: -200,
            duration: 0.8,
            ease: 'power3.out',
          });
        }
      }
    });
  };

  useEffect(() => {
    // Initial animation
    if (slidesRef.current[0]) {
      gsap.set(slidesRef.current[0], { scale: 1, opacity: 1, rotationY: 0 });
      gsap.set(slidesRef.current[1], { scale: 0.85, opacity: 0.7, rotationY: -35 });
      gsap.set(slidesRef.current[2], { scale: 0.85, opacity: 0.7, rotationY: 35 });
    }
  }, []);

  return (
    <div
      className="w-full h-screen flex items-center justify-center"
      style={{
        background: 'linear-gradient(90deg, #064EA6 0%, #0A57B8 30%, #083E8A 100%)',
      }}
    >
      <div className="w-full max-w-7xl mx-auto h-[80vh] flex items-center justify-between px-8 relative">
        {/* LEFT: Text / Heading column (matches layout/color of pasted image) */}
        <div className="w-1/2 pr-8 text-white" style={{minWidth: '480px'}}>
          <div className="mb-6">
            <h1 className="text-6xl font-extrabold tracking-wide leading-tight">NEW ARRIVAL</h1>
            <h2 className="text-6xl italic font-serif mt-4 opacity-95">Romantic collection</h2>
          </div>

          <div className="mt-8">
            <p className="text-lg text-white/80 max-w-lg">அள்ளி அள்ளி படிக்க ஆசை பெருகுமே!</p>
          </div>

          <div className="mt-10 inline-flex items-center gap-4">
            <div className="px-4 py-2 border border-white/60 rounded-md text-white/90">www.lovebeatnovels.com</div>
            <div className="px-3 py-2 border border-white/40 rounded-md text-white/90">+++</div>
          </div>
        </div>

        {/* Nav arrows (flank the phone cluster) */}
        <button className="swiper-button-prev absolute z-30" aria-label="Previous" style={{ left: 'calc(50% - 420px)', top: '50%', transform: 'translateY(-50%)' }}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2"><path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

        <Swiper
            ref={swiperRef}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 300,
              modifier: 1.2,
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            onSlideChange={handleSlideChange}
            className="w-[740px] h-[560px]"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={slide.id} style={{ width: '260px', height: '520px' }}>
                <div
                  ref={(el) => (slidesRef.current[index] = el)}
                  className="w-full h-full rounded-2xl overflow-hidden relative"
                  style={{
                    background: `url(${slide.image}) center/cover no-repeat`,
                    boxShadow: '0 28px 64px rgba(0,0,0,0.55)',
                    border: '8px solid rgba(0,0,0,0.8)',
                    borderRadius: '28px',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/30"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        {/* Right arrow (flank) */}
        <button className="swiper-button-next absolute z-30" aria-label="Next" style={{ left: 'calc(50% + 340px)', top: '50%', transform: 'translateY(-50%)' }}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

        {/* Small pagination styling */}
        <style>{`
          .swiper-button-next, .swiper-button-prev {
            background: rgba(0,0,0,0.18);
            width: 48px; height: 48px; display:flex; align-items:center; justify-content:center; border-radius:50%; border:1px solid rgba(0,212,255,0.18);
            box-shadow: 0 6px 18px rgba(0,0,0,0.4);
          }
          .swiper-button-next:hover, .swiper-button-prev:hover{ transform: scale(1.06); box-shadow: 0 10px 30px rgba(0,212,255,0.25); }
          .swiper-pagination-bullet { background: rgba(255,255,255,0.35); }
          .swiper-pagination-bullet-active { background: #00d4ff; box-shadow: 0 0 12px rgba(0,212,255,0.8); }
          /* center pagination under the phone cluster */
          .swiper-pagination { left: 50% !important; transform: translateX(-50%) !important; width: auto !important; bottom: 22px !important; }
        `}</style>
      </div>
    </div>
  );
};

export default Carousel;
