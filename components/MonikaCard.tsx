"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Mail, Globe, MapPin } from "lucide-react";

interface MonikaCardProps {
  isDark: boolean;
}

export default function MonikaCard({ isDark }: MonikaCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0.5, y: 0.5 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const rotateX = (mousePosition.y - 0.5) * 15;
  const rotateY = (mousePosition.x - 0.5) * -15;

  const colors = {
    cardBg: isDark ? "#2a2a2a" : "#e8d5f2", // Light purple like Monika's card
    cardDark: isDark ? "#1a1a1a" : "#d4b5e8",
    text: isDark ? "#f4f4f5" : "#2a2a2a",
    textLight: isDark ? "#a0a0a0" : "#666666",
    accent: isDark ? "#8b5cf6" : "#7c3aed",
    globe: isDark ? "#4a4a4a" : "#f3e8ff",
    shadow: isDark 
      ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)" 
      : "0 25px 50px -12px rgba(124, 58, 237, 0.15)",
    innerShadow: isDark
      ? "inset 0 2px 4px rgba(255, 255, 255, 0.1), inset 0 -2px 4px rgba(0, 0, 0, 0.3)"
      : "inset 0 2px 4px rgba(255, 255, 255, 0.8), inset 0 -2px 4px rgba(124, 58, 237, 0.2)",
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <motion.div
        ref={cardRef}
        className="relative w-full max-w-md mx-auto"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          perspective: "1500px",
        }}
      >
        {/* Card Container */}
        <motion.div
          className="relative rounded-3xl p-8 backdrop-blur-sm transition-all duration-500"
          style={{
            backgroundColor: colors.cardBg,
            boxShadow: colors.shadow,
            transform: isHovered
              ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(30px) scale(1.02)`
              : "rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)",
            transformStyle: "preserve-3d",
          }}
          whileHover={{
            scale: 1.02,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
        >
          {/* Texture Overlay */}
          <div 
            className="absolute inset-0 rounded-3xl opacity-30 pointer-events-none"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 1px,
                  ${isDark ? 'rgba(255,255,255,0.02)' : 'rgba(124,58,237,0.03)'} 1px,
                  ${isDark ? 'rgba(255,255,255,0.02)' : 'rgba(124,58,237,0.03)'} 2px
                )
              `,
            }}
          />

          {/* Inner Shadow for Depth */}
          <div 
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              boxShadow: colors.innerShadow,
            }}
          />

          {/* 3D Globe Emblem - Center Top */}
          <motion.div
            className="relative w-24 h-24 mx-auto mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* Globe Background */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                backgroundColor: colors.globe,
                boxShadow: isHovered
                  ? "inset -5px -5px 10px rgba(0,0,0,0.2), inset 5px 5px 10px rgba(255,255,255,0.1)"
                  : "inset -3px -3px 6px rgba(0,0,0,0.15), inset 3px 3px 6px rgba(255,255,255,0.05)",
              }}
            />
            
            {/* Globe Grid Lines */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              style={{
                transform: `rotateY(${rotateY * 2}deg) rotateX(${rotateX * 2}deg)`,
              }}
            >
              {/* Horizontal lines */}
              {[20, 40, 60, 80].map((y) => (
                <ellipse
                  key={`h-${y}`}
                  cx="50"
                  cy={y}
                  rx="45"
                  ry="8"
                  fill="none"
                  stroke={colors.textLight}
                  strokeWidth="0.5"
                  opacity="0.3"
                />
              ))}
              {/* Vertical lines */}
              {[20, 40, 60, 80].map((x) => (
                <ellipse
                  key={`v-${x}`}
                  cx={x}
                  cy="50"
                  rx="8"
                  ry="45"
                  fill="none"
                  stroke={colors.textLight}
                  strokeWidth="0.5"
                  opacity="0.3"
                  transform={`rotate(${rotateY} 50 50)`}
                />
              ))}
            </svg>

            {/* Globe Highlight */}
            <motion.div
              className="absolute top-2 left-2 w-8 h-8 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
              }}
              animate={{
                opacity: isHovered ? 0.6 : 0.3,
              }}
            />
          </motion.div>

          {/* Name Section */}
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3
              className="text-2xl font-bold tracking-tight mb-2"
              style={{ color: colors.text }}
            >
              DIVYANSH BAGHEL
            </h3>
            <div className="space-y-1">
              <p
                className="text-sm font-medium"
                style={{ color: colors.textLight }}
              >
                VISUAL AND WEB DESIGN
              </p>
              <p
                className="text-sm font-medium"
                style={{ color: colors.textLight }}
              >
                DESIGNING AMAZING EXPERIENCES
              </p>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            className="flex justify-between items-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Contact Info */}
            <div className="space-y-2">
              <motion.a
                href="mailto:divyansh.baghel@example.com"
                className="flex items-center space-x-2 group"
                whileHover={{ x: 3 }}
              >
                <Mail size={16} style={{ color: colors.textLight }} />
                <span
                  className="text-sm font-medium"
                  style={{ color: colors.textLight }}
                >
                  divyansh.baghel@example.com
                </span>
              </motion.a>
              
              <motion.a
                href="https://github.com/divinedbs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 group"
                whileHover={{ x: 3 }}
              >
                <Globe size={16} style={{ color: colors.textLight }} />
                <span
                  className="text-sm font-medium"
                  style={{ color: colors.textLight }}
                >
                  github.com/divinedbs
                </span>
              </motion.a>
              
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ x: 3 }}
              >
                <MapPin size={16} style={{ color: colors.textLight }} />
                <span
                  className="text-sm font-medium"
                  style={{ color: colors.textLight }}
                >
                  San Francisco, CA
                </span>
              </motion.div>
            </div>

            {/* Contact Label */}
            <div className="text-right">
              <p
                className="text-sm font-bold tracking-wider mb-1"
                style={{ color: colors.text }}
              >
                CONTACT
              </p>
              <div
                className="w-16 h-0.5 mx-auto"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    90deg,
                    ${colors.textLight} 0,
                    ${colors.textLight} 2px,
                    transparent 2px,
                    transparent 4px
                  )`,
                }}
              />
            </div>
          </motion.div>

          {/* Floating Depth Elements */}
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full opacity-40"
            style={{ backgroundColor: colors.accent }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <motion.div
            className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full opacity-30"
            style={{ backgroundColor: colors.accent }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </motion.div>

        {/* Shadow beneath card */}
        <motion.div
          className="absolute inset-0 rounded-3xl -z-10"
          style={{
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, transparent 70%)",
            transform: `translateZ(-50px) translateY(20px) scale(0.95)`,
          }}
          animate={{
            opacity: isHovered ? 0.6 : 0.3,
          }}
        />
      </motion.div>
    </div>
  );
}
