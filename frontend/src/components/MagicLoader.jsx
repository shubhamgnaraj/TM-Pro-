import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const colors = ["#22d3ee", "#a78bfa", "#f472b6", "#34d399", "#facc15"];

const MagicLoader = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start((i) => ({
      y: [0, -20, 0],
      backgroundColor: [colors[i], colors[(i + 1) % colors.length]],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay: i * 0.15,
      },
    }));
  }, [controls]);

  return (
    <div className="flex items-center justify-center h-screen bg-transparent">
      <div className="flex gap-2">
        {colors.map((_, i) => (
          <motion.span
            key={i}
            className="w-4 h-4 rounded-full"
            custom={i}
            animate={controls}
          />
        ))}
      </div>
    </div>
  );
};

export default MagicLoader;
