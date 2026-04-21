"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Mail, Phone, MapPin, Globe, Link, MessageSquare } from "lucide-react";

interface ContactCardProps {
  isDark: boolean;
}

export default function ContactCard({ isDark }: ContactCardProps) {
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

  const rotateX = (mousePosition.y - 0.5) * 20;
  const rotateY = (mousePosition.x - 0.5) * -20;

  const colors = {
    bg: isDark ? "rgba(36, 33, 33, 0.9)" : "rgba(255, 255, 255, 0.9)",
    border: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
    text: isDark ? "#F4F4F5" : "#000000",
    accent: "#4A9E61",
    glow: isDark 
      ? "0 25px 50px -12px rgba(74, 158, 97, 0.25)"
      : "0 25px 50px -12px rgba(74, 158, 97, 0.15)",
    cardShadow: isHovered
      ? isDark
        ? "0 20px 40px rgba(0, 0, 0, 0.3), 0 0 60px rgba(74, 158, 97, 0.1)"
        : "0 20px 40px rgba(0, 0, 0, 0.1), 0 0 60px rgba(74, 158, 97, 0.05)"
      : "0 10px 30px rgba(0, 0, 0, 0.1)",
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
          perspective: "1000px",
        }}
      >
        <motion.div
          className="relative rounded-3xl p-8 backdrop-blur-xl border transition-all duration-300"
          style={{
            backgroundColor: colors.bg,
            borderColor: colors.border,
            boxShadow: colors.cardShadow,
            transform: isHovered
              ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`
              : "rotateX(0deg) rotateY(0deg) translateZ(0px)",
            transformStyle: "preserve-3d",
          }}
          whileHover={{
            scale: 1.02,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          {/* 3D Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-3xl opacity-0"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(74, 158, 97, 0.1) 0%, transparent 50%)`,
            }}
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2
              className="text-3xl font-bold mb-2"
              style={{ color: colors.text }}
            >
              Get In Touch
            </h2>
            <div
              className="w-16 h-1 mx-auto rounded-full"
              style={{ backgroundColor: colors.accent }}
            />
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Email */}
            <motion.a
              href="mailto:divyansh.baghel@example.com"
              className="flex items-center space-x-4 p-3 rounded-xl transition-all duration-300 hover:bg-black/5"
              whileHover={{ x: 5 }}
              style={{ color: colors.text }}
            >
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${colors.accent}20` }}
              >
                <Mail size={20} color={colors.accent} />
              </div>
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm opacity-70">divyansh.baghel@example.com</p>
              </div>
            </motion.a>

            {/* Phone */}
            <motion.a
              href="tel:+1234567890"
              className="flex items-center space-x-4 p-3 rounded-xl transition-all duration-300 hover:bg-black/5"
              whileHover={{ x: 5 }}
              style={{ color: colors.text }}
            >
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${colors.accent}20` }}
              >
                <Phone size={20} color={colors.accent} />
              </div>
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-sm opacity-70">+1 (234) 567-890</p>
              </div>
            </motion.a>

            {/* Location */}
            <motion.div
              className="flex items-center space-x-4 p-3 rounded-xl"
              whileHover={{ x: 5 }}
              style={{ color: colors.text }}
            >
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${colors.accent}20` }}
              >
                <MapPin size={20} color={colors.accent} />
              </div>
              <div>
                <p className="font-medium">Location</p>
                <p className="text-sm opacity-70">San Francisco, CA</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center space-x-4 mt-8 pt-6 border-t"
            style={{ borderColor: colors.border }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {[
              { icon: Globe, href: "https://github.com", label: "GitHub" },
              { icon: Link, href: "https://linkedin.com", label: "LinkedIn" },
              { icon: MessageSquare, href: "https://twitter.com", label: "Twitter" },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl transition-all duration-300"
                style={{
                  backgroundColor: `${colors.accent}10`,
                  color: colors.text,
                }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: colors.accent,
                  color: "white",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </motion.div>

          {/* Floating Elements for 3D Effect */}
          <motion.div
            className="absolute -top-2 -right-2 w-4 h-4 rounded-full"
            style={{ backgroundColor: colors.accent }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full"
            style={{ backgroundColor: colors.accent, opacity: 0.3 }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
