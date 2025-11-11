import { useEffect, useRef } from 'react';

/**
 * MovingStars Component
 * Creates an animated starfield background using Canvas API
 * Stars drift downward with parallax effect and neon glow
 * Performance-optimized with requestAnimationFrame
 */
const MovingStars = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas to full viewport size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Star class - represents individual star particles
    class Star {
      constructor(layer) {
        this.layer = layer; // 0, 1, or 2 for parallax layers
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 2; // Depth for size variation

        // Speed varies by layer for parallax effect
        // Layer 0 = slow background, Layer 2 = fast foreground
        this.speed = this.layer === 0 ? 0.3 : this.layer === 1 ? 0.6 : 1.2;

        // Size based on layer
        this.size = (this.layer + 1) * (0.8 + this.z * 0.5);

        // Neon color variations
        const colors = [
          'rgba(0, 240, 255, ', // Cyan
          'rgba(255, 0, 255, ', // Magenta
          'rgba(255, 20, 147, ', // Pink
          'rgba(255, 255, 255, ' // White
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        // Move star downward
        this.y += this.speed;

        // Reset when off-screen
        if (this.y > canvas.height) {
          this.y = 0;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        // Create radial gradient for glow effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 3
        );

        gradient.addColorStop(0, this.color + '1)');
        gradient.addColorStop(0.5, this.color + '0.5)');
        gradient.addColorStop(1, this.color + '0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Add extra glow for larger stars
        if (this.size > 2) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = this.color + '0.8)';
          ctx.fillStyle = this.color + '0.9)';
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * 0.6, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    }

    // Create star arrays for 3 parallax layers
    // Adjust counts here to increase/decrease star density
    const starLayers = [
      Array.from({ length: 80 }, () => new Star(0)),  // Background layer
      Array.from({ length: 60 }, () => new Star(1)),  // Middle layer
      Array.from({ length: 40 }, () => new Star(2))   // Foreground layer
    ];

    // Animation loop
    const animate = () => {
      // Semi-transparent black for trail effect
      ctx.fillStyle = 'rgba(2, 6, 23, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw all stars
      starLayers.forEach(layer => {
        layer.forEach(star => {
          star.update();
          star.draw();
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ background: '#020617' }}
      aria-hidden="true"
    />
  );
};

export default MovingStars;
