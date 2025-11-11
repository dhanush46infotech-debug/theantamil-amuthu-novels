import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y, EffectFade } from 'swiper/modules';
import { gsap } from 'gsap';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Import images
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';

// Import author avatars
import swethaAvatar from '../assets/swetha-avatar.png';
import thenmozhiAvatar from '../assets/thenmozhi-avatar.png';
import mohanaamozhiAvatar from '../assets/mohanaamozhi-avatar.png';

const NeonBannerCarousel = () => {
  const slideRefs = useRef([]);

  // GSAP animation on slide change
  const handleSlideChange = (swiper) => {
    const activeSlide = slideRefs.current[swiper.activeIndex];
    if (activeSlide) {
      gsap.fromTo(
        activeSlide,
        { scale: 0.8, rotateY: -15, opacity: 0 },
        { scale: 1, rotateY: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    }
  };

  useEffect(() => {
    // Initial animation for first slide
    if (slideRefs.current[0]) {
      gsap.fromTo(
        slideRefs.current[0],
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' }
      );
    }
  }, []);

  return (
    <div className="neon-carousel-container w-full py-8 px-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, A11y, EffectFade]}
        effect="fade"
        spaceBetween={30}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination-custom',
        }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        onSlideChange={handleSlideChange}
        className="neon-swiper max-w-6xl mx-auto"
      >
        {/* Slide 1: Welcome Section */}
        <SwiperSlide>
          <div
            ref={(el) => (slideRefs.current[0] = el)}
            className="relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden border-2 border-neon-cyan shadow-glow-lg"
            style={{
              backgroundImage: `linear-gradient(rgba(2, 6, 23, 0.7), rgba(2, 6, 23, 0.7)), url(${image1})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold text-neon-pink drop-shadow-[0_0_20px_rgba(255,20,147,0.8)]">
                  தேன்தமிழமுது தேடியடி
                </h1>
                <h2 className="text-3xl md:text-5xl font-bold text-neon-cyan drop-shadow-[0_0_20px_rgba(0,240,255,0.8)]">
                  அள்ளி அள்ளி படுக ஆசை பெருகுமே!
                </h2>
                <div className="mt-8 space-y-4">
                  <p className="text-2xl md:text-4xl font-semibold text-white italic">
                    Countless words to find in endless worlds.
                  </p>
                  <p className="text-3xl md:text-5xl font-bold text-neon-magenta drop-shadow-[0_0_25px_rgba(255,0,255,0.9)]">
                    We welcome you!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2: Authors Section */}
        <SwiperSlide>
          <div
            ref={(el) => (slideRefs.current[1] = el)}
            className="relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden border-2 border-neon-magenta shadow-glow-lg"
            style={{
              backgroundImage: `linear-gradient(rgba(2, 6, 23, 0.8), rgba(2, 6, 23, 0.8)), url(${image2})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
              <h2 className="text-3xl md:text-5xl font-bold text-neon-cyan mb-12 drop-shadow-[0_0_20px_rgba(0,240,255,0.8)]">
                Follow us on Pratilipi for more stories!
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full max-w-4xl">
                {/* Author 1: Swetha */}
                <a
                  href="https://youtube.com/@swethaa_swe?si=GqKD38Gj9YAa6mhw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center group cursor-pointer transform transition-all duration-300 hover:scale-110"
                >
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-neon-pink shadow-neon-pink group-hover:shadow-glow-lg transition-all duration-300">
                    <img
                      src={swethaAvatar}
                      alt="Swetha swe"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="mt-4 text-xl md:text-2xl font-bold text-white group-hover:text-neon-pink transition-colors">
                    Swetha swe
                  </h3>
                </a>

                {/* Author 2: Thenmozhi */}
                <a
                  href="https://youtube.com/@thenthuzhinovels?si=-FiYHr2G3aXHJX27"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center group cursor-pointer transform transition-all duration-300 hover:scale-110"
                >
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-neon-cyan shadow-neon-cyan group-hover:shadow-glow-lg transition-all duration-300">
                    <img
                      src={thenmozhiAvatar}
                      alt="Thenmozhi"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="mt-4 text-xl md:text-2xl font-bold text-white group-hover:text-neon-cyan transition-colors">
                    Thenmozhi
                  </h3>
                </a>

                {/* Author 3: Mohanaamozhi */}
                <a
                  href="https://youtube.com/@mohanaamozhi_novels?si=P0DVBGcY7zzRtzzS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center group cursor-pointer transform transition-all duration-300 hover:scale-110"
                >
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-neon-magenta shadow-neon-magenta group-hover:shadow-glow-lg transition-all duration-300">
                    <img
                      src={mohanaamozhiAvatar}
                      alt="Mohanaamozhi"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="mt-4 text-xl md:text-2xl font-bold text-white group-hover:text-neon-magenta transition-colors">
                    Mohanaamozhi
                  </h3>
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3: Community Section */}
        <SwiperSlide>
          <div
            ref={(el) => (slideRefs.current[2] = el)}
            className="relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden border-2 border-neon-pink shadow-glow-lg"
            style={{
              backgroundImage: `linear-gradient(rgba(2, 6, 23, 0.8), rgba(2, 6, 23, 0.8)), url(${image3})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="space-y-8">
                <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">
                  Let&apos;s build a world together!
                </h1>

                <p className="text-2xl md:text-3xl italic text-neon-cyan drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]">
                  Join our community
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="flex justify-center gap-4 mt-8">
        <button className="swiper-button-prev-custom w-12 h-12 rounded-full bg-dark-secondary border-2 border-neon-cyan text-neon-cyan flex items-center justify-center hover:bg-neon-cyan hover:text-dark-bg transition-all shadow-neon-cyan hover:shadow-glow-md">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="swiper-pagination-custom flex gap-2 items-center"></div>

        <button className="swiper-button-next-custom w-12 h-12 rounded-full bg-dark-secondary border-2 border-neon-magenta text-neon-magenta flex items-center justify-center hover:bg-neon-magenta hover:text-dark-bg transition-all shadow-neon-magenta hover:shadow-glow-md">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <style jsx>{`
        .swiper-pagination-custom .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #0ea5e9;
          opacity: 0.5;
          border-radius: 50%;
          transition: all 0.3s;
        }

        .swiper-pagination-custom .swiper-pagination-bullet-active {
          opacity: 1;
          background: #ff00ff;
          box-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff;
          transform: scale(1.3);
        }
      `}</style>
    </div>
  );
};

export default NeonBannerCarousel;