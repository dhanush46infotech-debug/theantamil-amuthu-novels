import swethaAvatar from '../assets/swetha-avatar.png';
import thenmozhiAvatar from '../assets/thenmozhi-avatar.png';
import mohanaamozhiAvatar from '../assets/mohanaamozhi-avatar.png';

/**
 * AuthorSection Component
 * Displays three authors with round avatar images
 * Each author is clickable and links to their YouTube channel
 * Extracted from Image 2 content
 */
const AuthorSection = () => {
  const authors = [
    {
      name: 'Swetha swe',
      avatar: swethaAvatar,
      youtubeUrl: 'https://youtube.com/@swethaa_swe?si=GqKD38Gj9YAa6mhw',
      borderColor: 'border-neon-pink',
      shadowColor: 'shadow-neon-pink',
      hoverColor: 'text-neon-pink'
    },
    {
      name: 'Thenmozhi',
      avatar: thenmozhiAvatar,
      youtubeUrl: 'https://youtube.com/@thenthuzhinovels?si=-FiYHr2G3aXHJX27',
      borderColor: 'border-neon-cyan',
      shadowColor: 'shadow-neon-cyan',
      hoverColor: 'text-neon-cyan'
    },
    {
      name: 'Mohanaamozhi',
      avatar: mohanaamozhiAvatar,
      youtubeUrl: 'https://youtube.com/@mohanaamozhi_novels?si=P0DVBGcY7zzRtzzS',
      borderColor: 'border-neon-magenta',
      shadowColor: 'shadow-neon-magenta',
      hoverColor: 'text-neon-magenta'
    }
  ];

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-neon-cyan mb-12 drop-shadow-[0_0_20px_rgba(0,240,255,0.8)]">
          Follow us on Pratilipi for more stories!
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {authors.map((author, index) => (
            <a
              key={index}
              href={author.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group cursor-pointer transform transition-all duration-300 hover:scale-110"
              aria-label={`Visit ${author.name}'s YouTube channel`}
            >
              <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 ${author.borderColor} ${author.shadowColor} group-hover:shadow-glow-lg transition-all duration-300`}>
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className={`mt-4 text-xl md:text-2xl font-bold text-white group-hover:${author.hoverColor} transition-colors`}>
                {author.name}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorSection;
