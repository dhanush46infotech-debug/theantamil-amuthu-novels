import { useState } from 'react';

/**
 * AuthorCard Component
 * Displays circular author profile with YouTube link
 * Extracted from Image 2
 * @param {string} name - Author name
 * @param {string} youtubeUrl - YouTube channel URL
 * @param {string} color - Neon color for glow effect
 * @param {string} imageUrl - Author profile image URL
 */
const AuthorCard = ({ name, youtubeUrl, color, imageUrl }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.open(youtubeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="group cursor-pointer transition-all duration-300 hover:scale-105"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Visit ${name}'s YouTube channel`}
    >
      {/* Image border with subtle glow */}
      <div className="relative">
        <div
          className="relative w-32 h-32 md:w-36 md:h-36 rounded-full p-1 transition-all duration-300"
          style={{
            background: `linear-gradient(135deg, ${color}, ${color}CC)`,
            boxShadow: isHovered
              ? `0 0 15px ${color}80, 0 0 25px ${color}40`
              : `0 0 8px ${color}60`,
          }}
        >
          {/* Actual image */}
          <div
            className="w-full h-full rounded-full overflow-hidden bg-dark-bg"
            style={{
              border: '3px solid rgba(2, 6, 23, 0.9)',
            }}
          >
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </div>

        {/* YouTube play button overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center"
            style={{
              background: color,
              boxShadow: `0 0 25px ${color}`,
            }}
          >
            <svg
              className="w-6 h-6 md:w-7 md:h-7 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Author name */}
      <div className="mt-4 text-center">
        <h3
          className="text-base md:text-lg lg:text-xl font-bold transition-all duration-300 font-sans"
          style={{
            color: isHovered ? color : '#ffffff',
            textShadow: isHovered
              ? `0 0 15px ${color}, 0 0 25px ${color}`
              : 'none',
          }}
        >
          {name}
        </h3>
      </div>

      {/* Click hint */}
      <div
        className={`text-xs md:text-sm mt-2 text-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ color: color }}
        aria-hidden="true"
      >
        Click to visit →
      </div>
    </div>
  );
};

export default AuthorCard;
