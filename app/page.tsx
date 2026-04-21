"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MoonStar, ArrowUp } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import ContactCard from "@/components/ContactCard";

const navItems = ["Home", "Work", "Photos", "Contact"];

const projects = [
  {
    id: 1,
    title: "Project Alpha",
    description: "A modern web application built with React and TypeScript",
    tags: ["React", "TypeScript", "Tailwind"],
    size: "large",
    color: "#4A9E61"
  },
  {
    id: 2,
    title: "Design System",
    description: "Component library for consistent UI across products",
    tags: ["UI/UX", "Figma", "Storybook"],
    size: "medium",
    color: "#B918EF"
  },
  {
    id: 3,
    title: "Mobile App",
    description: "Cross-platform mobile application with React Native",
    tags: ["React Native", "Expo", "Firebase"],
    size: "small",
    color: "#FF6B6B"
  },
  {
    id: 4,
    title: "Data Dashboard",
    description: "Analytics dashboard with real-time data visualization",
    tags: ["D3.js", "Node.js", "MongoDB"],
    size: "medium",
    color: "#4ECDC4"
  },
  {
    id: 5,
    title: "AI Assistant",
    description: "Chatbot powered by machine learning algorithms",
    tags: ["Python", "TensorFlow", "NLP"],
    size: "small",
    color: "#FFE66D"
  },
  {
    id: 6,
    title: "Cloud Platform",
    description: "Scalable cloud infrastructure for modern applications",
    tags: ["AWS", "Docker", "Kubernetes"],
    size: "small",
    color: "#FF8C94"
  }
];

interface Photo {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  location: string;
  image: string;
}

const photos: Photo[] = [
  {
    id: 1,
    title: "Mountain Vista",
    description: "Golden hour lighting over mountain peaks",
    category: "Landscape",
    date: "March 2024",
    location: "Swiss Alps",
    image: "/1766085356758.jpg"
  },
  {
    id: 2,
    title: "Urban Architecture",
    description: "Modern city design and structure",
    category: "Architecture",
    date: "February 2024",
    location: "Tokyo, Japan",
    image: "/IMG-img1217-WA0025.jpg"
  },
  {
    id: 3,
    title: "City Lights",
    description: "Vibrant urban nightscape",
    category: "Street Photography",
    date: "January 2024",
    location: "Big Sur, California",
    image: "/img1217_143315.jpg"
  },
  {
    id: 4,
    title: "Street Scene",
    description: "Urban life in motion",
    category: "Street Photography",
    date: "December 2023",
    location: "New York City",
    image: "/img1217_144751.jpg"
  },
  {
    id: 5,
    title: "Coastal View",
    description: "Ocean meeting the shoreline",
    category: "Landscape",
    date: "November 2023",
    location: "California Coast",
    image: "/img1217_145426.jpg"
  },
  {
    id: 6,
    title: "Sunset Moments",
    description: "Golden hour photography",
    category: "Nature",
    date: "October 2023",
    location: "Pacific Northwest",
    image: "/img1217_151804.jpg"
  },
  {
    id: 7,
    title: "Forest Light",
    description: "Sunlight through ancient trees",
    category: "Landscape",
    date: "September 2023",
    location: "Redwood Forest",
    image: "/img1217_153815.jpg"
  },
  {
    id: 8,
    title: "Mountain Path",
    description: "Trail through the peaks",
    category: "Nature",
    date: "August 2023",
    location: "Rocky Mountains",
    image: "https://picsum.photos/seed/mountain-path/400/400.jpg"
  },
  {
    id: 9,
    title: "Urban Reflection",
    description: "City lights on water",
    category: "Street Photography",
    date: "July 2023",
    location: "Vancouver",
    image: "https://picsum.photos/seed/urban-reflection/400/400.jpg"
  },
  {
    id: 10,
    title: "Nature Abstract",
    description: "Organic patterns and forms",
    category: "Abstract",
    date: "June 2023",
    location: "Pacific Northwest",
    image: "https://picsum.photos/seed/nature-abstract/400/400.jpg"
  }
];

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const colors = useMemo(
    () => ({
      background: isDark ? "#000000" : "#E6F9F4",
      textPrimary: isDark ? "#F4F4F5" : "#000000",
      accent: "#4A9E61",
      muted: isDark ? "#F4F4F5" : "#111111",
      frame: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.28)",
      navBg: isDark ? "rgba(36, 33, 33, 0.2)" : "rgba(248, 252, 250, 0.92)",
      navBorder: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.06)",
      toggleBg: isDark ? "#B918EF" : "#DDEFE8",
      toggleIcon: isDark ? "#1D1024" : "#2D6A4F",
      toggleGlow: isDark
        ? "0 0 20px rgba(185,24,239,0.5)"
        : "0 0 14px rgba(74,158,97,0.18)",
      navBottomGlow: isDark
        ? "0 10px 24px rgba(255,255,255,0.42), 0 2px 0 rgba(255,255,255,0.58)"
        : "0 6px 14px rgba(74,158,97,0.18)",
      cardBg: isDark ? "rgba(36, 33, 33, 0.8)" : "rgba(255, 255, 255, 0.8)",
      cardBorder: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.06)",
      spotlightGlow: isDark
        ? "radial-gradient(94% 132% at 50% 0%, rgba(255,255,255,0.19) 0%, rgba(255,255,255,0.085) 22%, rgba(255,255,255,0.026) 54%, rgba(255,255,255,0) 82%)"
        : "radial-gradient(94% 132% at 50% 0%, rgba(74,158,97,0.15) 0%, rgba(74,158,97,0.08) 22%, rgba(74,158,97,0.03) 54%, rgba(74,158,97,0) 82%)",
    }),
    [isDark]
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight;
      
      // Show/hide navbar based on scroll position
      setShowNavbar(scrollPosition < heroHeight * 0.8);
      
      // Show/hide scroll to top button
      setShowScrollTop(scrollPosition > 500);
      
      // Update active section based on scroll position
      const sections = ["Home", "Work", "Photos", "Contact", "Footer"];
      const sectionElements = sections.map(section => 
        document.getElementById(section.toLowerCase())
      );
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const scrollToSectionHandler = scrollToSection;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPhotoModal = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const closePhotoModal = () => {
    setSelectedPhoto(null);
  };

  const getGridClass = (size: string) => {
    switch (size) {
      case "large":
        return "col-span-2 row-span-2";
      case "medium":
        return "col-span-1 row-span-2";
      default:
        return "col-span-1 row-span-1";
    }
  };

  return (
    <div className={`relative transition-colors duration-500 ${
      isDark ? 'bg-black text-[#F4F4F5]' : 'bg-[#E6F9F4] text-black'
    }`}>
      {/* Navbar - Only visible in hero section */}
      <AnimatePresence>
        {showNavbar && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="flex w-fit items-center gap-2 rounded-2xl">
              <div
                className={`relative h-8 rounded-[10px] border px-3 backdrop-blur-sm sm:h-9 sm:w-[280px] sm:px-0 ${
                  isDark 
                    ? 'bg-black/93 border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_16px_-10px_rgba(255,255,255,0.45)]' 
                    : 'bg-white/92 border-black/10 shadow-[2px_6px_30px_-5px_rgba(74,158,97,0.25)]'
                }`}
              >
                <span
                  className={`pointer-events-none absolute -bottom-[1px] left-1/2 h-[1px] w-[97%] -translate-x-1/2 rounded-full ${
                    isDark ? 'bg-white/82' : 'bg-[#4A9E61]/35'
                  }`}
                />
                <ul className="flex h-full items-center justify-center gap-2 sm:gap-4">
                  {navItems.map((item) => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const isActive = item === activeSection;
                    return (
                      <li key={item}>
                        <button
                          onClick={() => {
                            const element = document.getElementById(item.toLowerCase());
                            if (element) {
                              element.scrollIntoView({ behavior: "smooth" });
                            }
                          }}
                          className={`text-[10px] sm:text-[14px] transition-colors hover:opacity-100 font-bold leading-5 ${
                            activeSection === item 
                              ? 'text-[#4A9E61] opacity-100' 
                              : isDark 
                                ? 'text-[#F4F4F5] opacity-80' 
                                : 'text-[#000000] opacity-80'
                          }`}
                        >
                          {item}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <button
                onClick={() => setIsDark((value) => !value)}
                aria-label="Toggle theme"
                className={`grid h-8 w-8 place-items-center rounded-full border transition-transform hover:scale-[1.03] sm:h-9 sm:w-[52px] ${
                  isDark 
                    ? 'border-white/20 bg-[#4A9E61] shadow-[inset_0_0_0_1px_rgba(185,24,239,0.55)]' 
                    : 'border-black/10 bg-white shadow-[inset_0_0_0_1px_rgba(74,158,97,0.35)]'
                }`}
                title={`Switch to ${isDark ? "light" : "dark"} mode`}
              >
                <MoonStar size={10} color={isDark ? "#000000" : "#FFFFFF"} strokeWidth={2.4} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen px-[200px]">
        <div className="relative h-screen w-full">
          <AnimatePresence>
            {isDark && (
              <motion.div
                key="spotlight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="pointer-events-none absolute left-1/2 top-20 z-10 h-[50vh] w-[70vw] max-w-[900px] -translate-x-1/2 blur-3xl"
                style={{
                  background:
                    "radial-gradient(94% 132% at 50% 0%, rgba(255,255,255,0.19) 0%, rgba(255,255,255,0.085) 22%, rgba(255,255,255,0.026) 54%, rgba(255,255,255,0) 82%)",
                }}
              />
            )}
          </AnimatePresence>

          <div className="relative z-20 flex h-full w-full items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center"
            >
              <p className="text-lg font-medium mb-2 text-[#4A9E61]">
                Hey, I&apos;m
              </p>
              <h1 className="text-6xl font-bold leading-[1.02] sm:text-7xl lg:text-[120px] mb-2">
                Divyansh
              </h1>
              <h2 className="text-5xl font-normal leading-[1.02] sm:text-6xl lg:text-[80px] text-[#4A9E61]">
                Baghel
              </h2>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
                className="mt-8 max-w-xl mx-auto"
              >
                <p className="text-lg font-medium mb-2 text-[#4A9E61]">
                  Dreamer &amp; Designer
                </p>
                <p className={`text-base leading-relaxed ${
                  isDark ? 'text-[#F4F4F5]' : 'text-[#000000]'
                }`}>
                  Crafting seamless experiences and bold visuals. High school student by day,
                  creative thinker, and aspiring innovator by night.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="min-h-screen py-16 px-[200px]">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-4xl font-bold sm:text-6xl lg:text-[72px]">
              My Work
            </h2>
            <p className="mt-2 text-lg opacity-80 sm:text-xl">
              Projects, experiments, and creative endeavors
            </p>
          </motion.div>

          <div className="grid grid-cols-4 gap-2 auto-rows-[25vh] sm:auto-rows-[30vh]">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                className={`${getGridClass(project.size)} relative overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:shadow-lg`}
                style={{
                  backgroundColor: colors.cardBg,
                  borderColor: colors.cardBorder,
                }}
              >
                <div className="p-[3vw] sm:p-[2vw] h-full flex flex-col">
                  <div
                    className="w-[3vw] h-[3vw] max-w-[48px] max-h-[48px] rounded-lg mb-[2vw]"
                    style={{ backgroundColor: project.color + "20" }}
                  />
                  <h3 className="text-[1.2vw] font-semibold mb-[1vw] sm:text-[1.1vw] min-w-[100px]">
                    {project.title}
                  </h3>
                  <p className="text-[0.9vw] opacity-80 mb-[2vw] line-clamp-2 sm:text-[0.8vw] min-h-[2.5em]">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-[1vw] mt-auto">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[0.7vw] px-[1vw] py-[0.5vw] rounded-full sm:text-[0.6vw]"
                        style={{
                          backgroundColor: isDark 
                            ? "rgba(255, 255, 255, 0.1)" 
                            : "rgba(0, 0, 0, 0.05)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <motion.div
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}10 0%, transparent 100%)`,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photos Section */}
      <section id="photos" className="relative min-h-screen py-16 px-[200px]">
        <AnimatePresence>
          {isDark && (
            <motion.div
              key="photos-spotlight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="pointer-events-none absolute left-1/2 bottom-20 z-10 h-[40vh] w-[60vw] max-w-[800px] -translate-x-1/2 blur-3xl"
              style={{
                background: colors.spotlightGlow,
              }}
            />
          )}
        </AnimatePresence>

        <div className="relative z-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-4xl font-bold sm:text-6xl lg:text-[72px]">
              Photography
            </h2>
            <p className="mt-2 text-lg opacity-80 sm:text-xl">
              Visual stories captured through my lens
            </p>
          </motion.div>

          <div className="grid grid-cols-5 gap-4 mb-8">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => openPhotoModal(photo)}
                className="relative aspect-square overflow-hidden rounded-xl border border-gray-800/20 backdrop-blur-sm transition-all duration-300 hover:shadow-lg cursor-pointer group"
              >
                {/* Image with B&W to color effect */}
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={photo.image}
                    alt={photo.title}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-all duration-500"
                    style={{
                      filter: 'grayscale(100%)',
                    }}
                    onError={(e) => {
                      // Fallback to Picsum if local image doesn't exist
                      const target = e.target as HTMLImageElement;
                      target.src = `https://picsum.photos/seed/${photo.title}/400/400.jpg`;
                    }}
                  />
                  {/* Color overlay on hover */}
                  <div className="absolute inset-0 bg-cover bg-center transition-all duration-500 opacity-0 group-hover:opacity-100"
                    style={{
                      backgroundImage: `url(${photo.image})`,
                      filter: 'none',
                    }}
                    onError={(e) => {
                      // Fallback to Picsum if local image doesn't exist
                      const target = e.target as HTMLDivElement;
                      target.style.backgroundImage = `url(https://picsum.photos/seed/${photo.title}/400/400.jpg)`;
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="relative">
            <div
              className="h-1 w-full rounded-full"
              style={{
                backgroundColor: isDark 
                  ? "rgba(255, 255, 255, 0.1)" 
                  : "rgba(0, 0, 0, 0.06)",
              }}
            />
            <motion.div
              className="h-1 w-1/2 rounded-full"
              style={{
                backgroundColor: colors.cardBorder,
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-16 px-[200px]">
        <ContactCard isDark={isDark} />
      </section>

      {/* Footer */}
      <footer id="footer" className="py-8 px-[200px]">
        <div className="w-full">
          <div
            className="rounded-2xl border backdrop-blur-sm p-8 text-center"
            style={{
              backgroundColor: colors.cardBg,
              borderColor: colors.cardBorder,
            }}
          >
            <p className="text-lg font-medium mb-2">Divyansh Baghel</p>
            <p className="text-sm opacity-80">Dreamer & Designer</p>
            <div className="flex justify-center gap-4 mt-6">
              <span className="text-sm opacity-60">© 2026 All rights reserved</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-8"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
            onClick={closePhotoModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-7xl max-h-[90vh] w-full p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative bg-black rounded-2xl overflow-hidden">
                {/* Close button */}
                <button
                  onClick={closePhotoModal}
                  className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <span className="text-white text-xl">×</span>
                </button>
                
                {/* Image */}
                <div className="flex items-center justify-center min-h-[60vh]">
                  <Image
                    src={selectedPhoto.image}
                    alt={selectedPhoto.title}
                    width={1200}
                    height={800}
                    className="max-w-full max-h-[70vh] object-contain"
                    onError={(e) => {
                      // Fallback to Picsum if local image doesn't exist
                      const target = e.target as HTMLImageElement;
                      target.src = `https://picsum.photos/seed/${selectedPhoto.title}/1200/800.jpg`;
                    }}
                  />
                </div>
                
                {/* Details */}
                <div 
                  className="absolute bottom-0 left-0 right-0 p-6"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                  }}
                >
                  <h3 className="text-white text-2xl font-bold mb-2">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-white/90 text-base mb-3">
                    {selectedPhoto.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-white/80 text-sm">
                    <span className="bg-white/20 px-3 py-1 rounded-full">
                      {selectedPhoto.category}
                    </span>
                    <span className="bg-white/20 px-3 py-1 rounded-full">
                      {selectedPhoto.date}
                    </span>
                    <span className="bg-white/20 px-3 py-1 rounded-full">
                      {selectedPhoto.location}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 h-12 w-12 rounded-full border backdrop-blur-sm transition-transform hover:scale-110 z-40"
            style={{
              borderColor: colors.cardBorder,
              backgroundColor: colors.cardBg,
            }}
          >
            <ArrowUp size={20} style={{ color: colors.textPrimary }} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
