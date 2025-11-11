import { useEffect, useRef } from 'react';

/**
 * BackgroundVowels Component
 * Displays animated Tamil vowels floating in the background
 */
const BackgroundVowels = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Tamil vowels
    const vowels = ['அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ஊ', 'எ', 'ஏ', 'ஐ', 'ஒ', 'ஓ', 'ஔ'];

    class FloatingVowel {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.char = vowels[Math.floor(Math.random() * vowels.length)];
        this.speed = 0.2 + Math.random() * 0.5;
        this.size = 20 + Math.random() * 30;
        this.opacity = 0.1 + Math.random() * 0.2;
        this.angle = Math.random() * Math.PI * 2;
      }

      update() {
        this.y -= this.speed;
        this.x += Math.sin(this.angle) * 0.5;
        this.angle += 0.01;

        if (this.y < -50) {
          this.y = canvas.height + 50;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.font = `${this.size}px Arial`;
        ctx.fillStyle = '#00f0ff';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00f0ff';
        ctx.fillText(this.char, this.x, this.y);
        ctx.restore();
      }
    }

    const particles = Array.from({ length: 30 }, () => new FloatingVowel());

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default BackgroundVowels;