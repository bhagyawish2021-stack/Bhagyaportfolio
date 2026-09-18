import React, { useRef, useState, useEffect } from 'react';
import { 
  motion, 
  useMotionValue, 
  useTransform, 
  useSpring
} from 'framer-motion';
import { 
  Brain, 
  Code2, 
  Terminal, 
  Database, 
  Server, 
  Wrench, 
  GraduationCap, 
  Award, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  ArrowRight, 
  User, 
  Heart,
  Globe,
  Compass,
  ArrowUp,
  Eye
} from 'lucide-react';
import { WordsPullUp } from './components/WordsPullUp';
import bhagyasriImg from './assets/bhagyasri.jpg';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import udemyCert from './assets/certificates/udemy-agentic-ai.png';
import hpCert from './assets/certificates/hp-data-science.png';
import scalerCert from './assets/certificates/scaler-java.png';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [previewCert, setPreviewCert] = useState<{ title: string; image: string } | null>(null);


  // Scroll spy to highlight active section in Navbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'certifications', 'education', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }

      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3D Tilt Card implementation for Hero Image Container
  const heroCardRef = useRef<HTMLDivElement>(null);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  const rotateX = useSpring(useTransform(tiltY, [-0.5, 0.5], [15, -15]), { stiffness: 120, damping: 15 });
  const rotateY = useSpring(useTransform(tiltX, [-0.5, 0.5], [-15, 15]), { stiffness: 120, damping: 15 });

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroCardRef.current) return;
    const rect = heroCardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    tiltX.set(mouseX / width);
    tiltY.set(mouseY / height);
  };

  const handleHeroMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  // Stagger variants for list reveals
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="relative min-h-screen grid-bg overflow-x-hidden text-slate-200">
      
      {/* Decorative Glow Orbs in Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-900/20 glow-orb" />
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-pink-900/15 glow-orb" />
      <div className="absolute bottom-[-5%] left-[20%] w-[500px] h-[500px] bg-teal-900/20 glow-orb" />

      {/* Modern Floating Header Navbar */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4 bg-slate-950/40 backdrop-blur-xl border-b border-white/5"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-pink-400 to-teal-400 bg-clip-text text-transparent tracking-tight">
              💻 BhagyaSri Korlam
            </span>
          </motion.div>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-8 font-medium">
            {['home', 'about', 'skills', 'certifications', 'education', 'projects', 'contact'].map((section) => (
              <li key={section}>
                <a 
                  href={`#${section}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`capitalize text-sm transition-all duration-300 relative py-1 ${
                    activeSection === section ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {section}
                  {activeSection === section && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 to-pink-500"
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Small screen indicator */}
          <div className="block md:hidden text-xs px-2 py-1 rounded bg-slate-900 border border-slate-800 text-indigo-400 font-semibold">
            {activeSection}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section 
        id="home" 
        className="relative min-h-screen flex items-center justify-center pt-24 px-4 md:px-8 max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-semibold mb-6"
            >
              <SparklesIcon className="w-4 h-4 text-indigo-400" />
              <span>AI Enthusiast & Full Stack Developer</span>
            </motion.div>

            <div className="min-h-[120px] lg:min-h-0">
              <WordsPullUp 
                text="Hi 👋, I'm BhagyaSri Korlam"
                className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight"
              />
            </div>

            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg md:text-xl text-slate-400 font-light max-w-xl leading-relaxed mb-8"
            >
              A passionate <strong className="text-white font-semibold">AI Enthusiast</strong> & <strong className="text-white font-semibold">Full Stack Developer</strong> from India 🇮🇳. Building intelligent solutions and beautiful, high-performance web experiences.
            </motion.p>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <button 
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full w-full sm:w-auto font-bold text-white bg-gradient-to-r from-indigo-500 via-pink-500 to-teal-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-95 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full w-full sm:w-auto font-bold text-slate-300 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all active:scale-95"
              >
                Get in Touch
              </button>
            </motion.div>
          </div>

          {/* Hero Right: 3D Interactive Glowing Card */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[380px] aspect-[4/5] relative cursor-grab active:cursor-grabbing"
              ref={heroCardRef}
              onMouseMove={handleHeroMouseMove}
              onMouseLeave={handleHeroMouseLeave}
              style={{
                perspective: 1000,
              }}
            >
              <motion.div 
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }}
                className="w-full h-full rounded-3xl bg-slate-900/50 backdrop-blur-md border border-white/10 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden"
              >
                {/* Visual Glow Core behind */}
                <div className="absolute top-[-20%] right-[-20%] w-[180px] h-[180px] rounded-full bg-indigo-500/35 blur-3xl pointer-events-none" />
                <div className="absolute bottom-[-20%] left-[-20%] w-[180px] h-[180px] rounded-full bg-pink-500/30 blur-3xl pointer-events-none" />

                {/* Card Top Block */}
                <div className="flex items-center justify-between z-10" style={{ transform: 'translateZ(40px)' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-xs text-slate-500 font-mono tracking-widest">BHAGYA.AI</span>
                </div>

                {/* Card Center: AI Animated & Motioned Developer Portrait */}
                <div className="flex flex-col items-center justify-center py-4 z-10" style={{ transform: 'translateZ(60px)' }}>
                  <motion.div 
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative flex items-center justify-center"
                  >
                    {/* Pulsing AI Energy Aura */}
                    <motion.div 
                      animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.7, 0.35] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -inset-4 bg-gradient-to-r from-indigo-500 via-teal-400 to-pink-500 rounded-full blur-xl pointer-events-none"
                    />

                    {/* Outer Rotating Cyber Orbital Ring (Clockwise) */}
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      className="absolute -inset-3.5 rounded-full border border-dashed border-teal-400/40 pointer-events-none"
                    />

                    {/* Inner Rotating Tech Accent Ring (Counter-Clockwise) */}
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                      className="absolute -inset-1.5 rounded-full border border-indigo-400/50 border-t-transparent border-b-transparent pointer-events-none"
                    />

                    {/* AI Floating Status Chip Top */}
                    <motion.div 
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -top-3.5 z-20 px-2.5 py-0.5 rounded-full bg-slate-950/90 border border-teal-400/50 text-[10px] font-mono text-teal-300 shadow-lg shadow-teal-500/20 flex items-center gap-1.5 backdrop-blur-md whitespace-nowrap"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
                      <span className="font-semibold tracking-wider">AI AGENT ACTIVE</span>
                    </motion.div>

                    {/* Main Portrait Frame with Scanner Line */}
                    <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-slate-950 border-2 border-white/20 shadow-2xl p-1 flex items-center justify-center">
                      <img 
                        src={bhagyasriImg} 
                        alt="BhagyaSri Korlam" 
                        className="w-full h-full object-cover object-top rounded-xl"
                      />
                      
                      {/* Holographic AI Scanline Animation */}
                      <motion.div 
                        className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-teal-300 to-transparent shadow-[0_0_12px_#2dd4bf] z-20 pointer-events-none"
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                      />

                      {/* Sci-fi Corner Brackets */}
                      <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-teal-400 pointer-events-none" />
                      <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-teal-400 pointer-events-none" />
                      <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-teal-400 pointer-events-none" />
                      <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-teal-400 pointer-events-none" />
                    </div>

                    {/* Bottom Floating Skill Chip */}
                    <motion.div 
                      animate={{ y: [0, 3, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                      className="absolute -bottom-3.5 z-20 px-2.5 py-0.5 rounded-full bg-slate-950/90 border border-indigo-400/50 text-[10px] font-mono text-indigo-300 shadow-lg shadow-indigo-500/20 flex items-center gap-1.5 backdrop-blur-md whitespace-nowrap"
                    >
                      <span>⚡</span>
                      <span className="font-semibold">LangGraph & CrewAI</span>
                    </motion.div>
                  </motion.div>

                  <div className="mt-5 flex items-center gap-4">
                    <motion.img 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                      src={reactLogo} 
                      className="w-6 h-6 text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" 
                      alt="React" 
                    />
                    <div className="h-4 w-[1px] bg-slate-700" />
                    <motion.img 
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                      src={viteLogo} 
                      className="w-6 h-6 drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]" 
                      alt="Vite" 
                    />
                  </div>
                </div>

                {/* Card Bottom Block */}
                <div className="z-10 bg-slate-950/70 p-4 rounded-xl border border-white/5 font-mono text-[10px] sm:text-xs text-slate-400" style={{ transform: 'translateZ(30px)' }}>
                  <div className="flex gap-2 mb-1">
                    <span className="text-pink-400">const</span>
                    <span className="text-blue-400">developer</span>
                    <span className="text-slate-400">=</span>
                    <span className="text-slate-300">{"{"}</span>
                  </div>
                  <div className="pl-4 flex gap-2 mb-1">
                    <span className="text-indigo-400">name:</span>
                    <span className="text-teal-300">"BhagyaSri Korlam"</span>,
                  </div>
                  <div className="pl-4 flex gap-2 mb-1">
                    <span className="text-indigo-400">focus:</span>
                    <span className="text-teal-300">["AI", "FullStack"]</span>,
                  </div>
                  <div className="pl-4 flex gap-2">
                    <span className="text-indigo-400">motto:</span>
                    <span className="text-teal-300">"Code with intelligence"</span>
                  </div>
                  <div className="flex gap-2 mt-1">
                    <span className="text-slate-300">{"};"}</span>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-24 px-4 md:px-8 max-w-6xl mx-auto border-t border-slate-900">
        <div className="text-center md:text-left mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-white inline-flex items-center gap-3"
          >
            <User className="w-8 h-8 text-indigo-400" />
            <span>About Me</span>
          </motion.h2>
          <div className="h-1 w-20 bg-indigo-500 rounded-full mt-4 mx-auto md:mx-0" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main bio */}
          <div className="lg:col-span-7 space-y-6">
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl font-bold text-slate-100"
            >
              🚀 Who I Am
            </motion.h3>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 leading-relaxed text-lg"
            >
              I'm a <strong className="text-indigo-300">B.Tech Artificial Intelligence</strong> student at Parul University. I have a profound passion for creating real-world intelligent systems that combine machine learning and full-stack engineering. 
            </motion.p>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-slate-400 leading-relaxed"
            >
              With practical experience across Python frameworks, database architectures, and reactive web development, I thrive on writing modular, highly optimized code and designing gorgeous interfaces. I spend my spare time sketching, traveling, and exploring emerging advancements in Large Language Models.
            </motion.p>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4"
            >
              <motion.div variants={itemVariants} className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 flex items-start gap-3 hover:border-slate-700 transition duration-300">
                <Compass className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-200 text-sm">Open To Collaborate</h4>
                  <p className="text-xs text-slate-400 mt-1">Ready for projects in Full-Stack AI integration.</p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 flex items-start gap-3 hover:border-slate-700 transition duration-300">
                <Heart className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-200 text-sm">Hobbies & Interests</h4>
                  <p className="text-xs text-slate-400 mt-1">Deeply interested in sketching, traveling, and researching models.</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Social details panel */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-6 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/5 shadow-xl flex flex-col justify-between"
            >
              {/* Profile Card Header with Photo */}
              <div className="flex items-center gap-4 pb-5 border-b border-white/5 mb-5">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-teal-400/40 p-0.5 bg-slate-950 shrink-0 shadow-lg shadow-teal-500/10">
                  <img src={bhagyasriImg} alt="BhagyaSri Korlam" className="w-full h-full object-cover object-top rounded-xl" />
                  <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base flex items-center gap-2">
                    BhagyaSri Korlam
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">AI</span>
                  </h4>
                  <p className="text-xs text-slate-400">Parul University • CGPA 7.98</p>
                  <p className="text-[11px] text-teal-400 font-mono mt-0.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                    Available for Projects & Roles
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-4">Connect With Me</h3>
              
              <div className="space-y-4">
                <a 
                  href="https://www.linkedin.com/in/bhagyasri-siva-157a60315/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 hover:bg-slate-950 border border-white/5 hover:border-indigo-500/40 transition duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-slate-200">LinkedIn</h4>
                      <p className="text-xs text-slate-500">BhagyaSri Siva</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                </a>

                <a 
                  href="https://github.com/bhagyawish2021-stack" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 hover:bg-slate-950 border border-white/5 hover:border-slate-600 transition duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-200">
                      <Github className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-slate-200">GitHub</h4>
                      <p className="text-xs text-slate-500">bhagyawish2021-stack</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-slate-200 transition-colors" />
                </a>

                <a 
                  href="https://www.instagram.com/bhagya_swapna?igsh=YndhcHVlYnNnNTNw" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 hover:bg-slate-950 border border-white/5 hover:border-pink-500/40 transition duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-slate-200">Instagram</h4>
                      <p className="text-xs text-slate-500">@bhagya_swapna</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-pink-400 transition-colors" />
                </a>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Skills & Expertise Section */}
      <section id="skills" className="py-24 px-4 md:px-8 max-w-6xl mx-auto border-t border-slate-900">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-white inline-flex items-center gap-3 justify-center"
          >
            <Brain className="w-8 h-8 text-pink-400" />
            <span>Skills & Expertise</span>
          </motion.h2>
          <div className="h-1 w-20 bg-pink-500 rounded-full mt-4 mx-auto" />
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Programming languages */}
          <motion.div 
            variants={itemVariants} 
            whileHover={{ y: -6 }}
            className="p-6 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-indigo-500/35 hover:shadow-xl hover:shadow-indigo-500/5 transition duration-300"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-4">Programming</h3>
            <div className="flex flex-wrap gap-2">
              {['Python', 'Java', 'C', 'JavaScript'].map((skill) => (
                <span key={skill} className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Web Development */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6 }}
            className="p-6 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-pink-500/35 hover:shadow-xl hover:shadow-pink-500/5 transition duration-300"
          >
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-400 mb-6">
              <Server className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-4">Web Development</h3>
            <div className="flex flex-wrap gap-2">
              {['HTML', 'CSS', 'JavaScript', 'Flask'].map((skill) => (
                <span key={skill} className="px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/10 border border-pink-500/20 text-pink-300">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* AI & ML */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6 }}
            className="p-6 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-teal-500/35 hover:shadow-xl hover:shadow-teal-500/5 transition duration-300"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400 mb-6">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-4">AI & Machine Learning</h3>
            <div className="flex flex-wrap gap-2">
              {['Prompt Engineering', 'Scikit-learn', 'Feature Engineering', 'Data Analysis'].map((skill) => (
                <span key={skill} className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 border border-teal-500/20 text-teal-300">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Tools & Platforms */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6 }}
            className="p-6 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-yellow-500/35 hover:shadow-xl hover:shadow-yellow-500/5 transition duration-300"
          >
            <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-400 mb-6">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-4">Tools & Platforms</h3>
            <div className="flex flex-wrap gap-2">
              {['VS Code', 'Git', 'GitHub', 'Google Colab'].map((skill) => (
                <span key={skill} className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/10 border border-yellow-500/20 text-yellow-300">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Core Computer Science */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6 }}
            className="p-6 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-blue-500/35 hover:shadow-xl hover:shadow-blue-500/5 transition duration-300"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">
              <Terminal className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-4">Core Computer Science</h3>
            <div className="flex flex-wrap gap-2">
              {['DSA', 'System Design'].map((skill) => (
                <span key={skill} className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-300">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Databases */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6 }}
            className="p-6 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-purple-500/35 hover:shadow-xl hover:shadow-purple-500/5 transition duration-300"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-4">Databases</h3>
            <div className="flex flex-wrap gap-2">
              {['MongoDB'].map((skill) => (
                <span key={skill} className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 border border-purple-500/20 text-purple-300">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Certifications Section (Full width, placed BEFORE Education) */}
      <section id="certifications" className="py-24 px-4 md:px-8 max-w-5xl mx-auto border-t border-slate-900">
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-semibold mb-3">
            <Award className="w-3.5 h-3.5 text-pink-400" />
            <span>Credentials & Validations</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white flex items-center gap-3">
            <span>Certifications</span>
          </h2>
          <p className="text-sm md:text-base text-slate-400 mt-2 max-w-2xl">
            Verified industry certifications and professional credentials in Artificial Intelligence, Data Science, and Software Development.
          </p>
          <div className="h-1 w-20 bg-pink-500 rounded-full mt-4" />
        </div>

        {/* Certifications List - Displayed One by One */}
        <div className="space-y-12">
          
          {/* Certificate 1: Agentic AI Masters 2026 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 md:p-8 rounded-3xl bg-slate-900/40 border border-teal-500/20 hover:border-teal-400/40 transition duration-300 relative overflow-hidden group shadow-xl shadow-teal-500/5"
          >
            {/* 1. Mentioned Certification Details */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20">
                <Brain className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/25 font-semibold">
                      Udemy • 62 Hours • Aug 27, 2026
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      Completed
                    </span>
                  </div>
                  <a 
                    href="https://ude.my/UC-9fdc956b-cfa4-42d5-b84d-5d2c47c245ff" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 px-3 py-1 rounded-lg bg-teal-500/10 border border-teal-500/20 hover:bg-teal-500/20 font-semibold transition"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <h3 className="text-2xl font-bold text-white leading-tight mb-2">
                  Agentic AI Masters 2026: LangChain, LangGraph & CrewAI
                </h3>
                
                <p className="text-sm text-slate-300 mb-2">
                  <span className="text-slate-400">Instructors:</span> <strong className="text-white">Dr. Satyajit Pattnaik & Satyajit Pattnaik</strong>
                </p>

                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  Comprehensive specialization covering autonomous multi-agent systems, cyclic state graphs, agentic memory management, tool execution, CrewAI collaborative agent swarms, and enterprise-grade LLM orchestrations.
                </p>

                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {['LangChain', 'LangGraph', 'CrewAI', 'Multi-Agent AI', 'Autonomous Systems', '62 Hours'].map(tag => (
                    <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-800/90 text-slate-300 border border-slate-700/70">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 gap-2">
                  <span>Certificate No: <span className="text-slate-200">UC-9fdc956b-cfa4-42d5-b84d-5d2c47c245ff</span></span>
                  <span>Reference No: <span className="text-teal-400 font-bold">0004</span></span>
                </div>
              </div>
            </div>

            {/* 2. Certificate Visual Preview Banner (Given after mentioned certification details) */}
            <div className="mt-4 pt-4 border-t border-white/5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Official Certificate Document
                </span>
                <span className="text-xs text-teal-400 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> Click to enlarge
                </span>
              </div>
              <div 
                onClick={() => setPreviewCert({ title: 'Agentic AI Masters 2026 (Udemy)', image: udemyCert })}
                className="relative rounded-2xl overflow-hidden border border-white/10 group/thumb cursor-pointer bg-slate-950 aspect-[16/9] md:aspect-[21/9] max-h-72 flex items-center justify-center"
              >
                <img 
                  src={udemyCert} 
                  alt="Udemy Agentic AI Certificate" 
                  className="w-full h-full object-cover group-hover/thumb:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/40 group-hover/thumb:bg-slate-950/15 transition flex items-center justify-center">
                  <span className="px-4 py-2 rounded-xl bg-slate-900/90 text-xs md:text-sm font-semibold text-teal-300 border border-teal-500/40 shadow-xl flex items-center gap-2 backdrop-blur-md group-hover/thumb:scale-105 transition">
                    <Eye className="w-4 h-4" />
                    <span>Click to View Full Certificate</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Certificate 2: Data Science & Analytics (HP LIFE) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 md:p-8 rounded-3xl bg-slate-900/40 border border-indigo-500/20 hover:border-indigo-400/40 transition duration-300 relative overflow-hidden group shadow-xl shadow-indigo-500/5"
          >
            {/* 1. Mentioned Certification Details */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                <Database className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/25 font-semibold">
                      HP LIFE • HP Foundation
                    </span>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-indigo-950/60 text-indigo-300 border border-indigo-800">
                      Presented 6/9/2026
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white leading-tight mb-2">
                  Data Science & Analytics
                </h3>
                
                <p className="text-sm text-slate-300 mb-2">
                  <span className="text-slate-400">Awarded by:</span> <strong className="text-white">Michele Malejki</strong>, Executive Director, HP Foundation
                </p>

                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  By completing this course, learned about leading data science and analytics practices, methodologies, and tools, examined the benefits and challenges of a data-driven approach for businesses, and gained knowledge about essential skills needed to pursue a career in the field.
                </p>

                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {['Data Science', 'Analytics', 'Business Intelligence', 'Data-Driven Decision Making', 'HP LIFE'].map(tag => (
                    <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-800/90 text-slate-300 border border-slate-700/70">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/5 text-xs font-mono text-slate-400 truncate">
                  Certificate Serial Number: <span className="text-slate-200">c5d658cb-ea28-4441-a2d3-2a43512447e6</span>
                </div>
              </div>
            </div>

            {/* 2. Certificate Visual Preview Banner (Given after mentioned certification details) */}
            <div className="mt-4 pt-4 border-t border-white/5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Official Certificate Document
                </span>
                <span className="text-xs text-indigo-400 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> Click to enlarge
                </span>
              </div>
              <div 
                onClick={() => setPreviewCert({ title: 'Data Science & Analytics (HP LIFE)', image: hpCert })}
                className="relative rounded-2xl overflow-hidden border border-white/10 group/thumb cursor-pointer bg-slate-950 aspect-[16/9] md:aspect-[21/9] max-h-72 flex items-center justify-center"
              >
                <img 
                  src={hpCert} 
                  alt="HP LIFE Data Science Certificate" 
                  className="w-full h-full object-cover group-hover/thumb:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/40 group-hover/thumb:bg-slate-950/15 transition flex items-center justify-center">
                  <span className="px-4 py-2 rounded-xl bg-slate-900/90 text-xs md:text-sm font-semibold text-indigo-300 border border-indigo-500/40 shadow-xl flex items-center gap-2 backdrop-blur-md group-hover/thumb:scale-105 transition">
                    <Eye className="w-4 h-4" />
                    <span>Click to View Full Certificate</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Certificate 3: Java Course - Mastering the Fundamentals (Scaler Topics) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 md:p-8 rounded-3xl bg-slate-900/40 border border-pink-500/20 hover:border-pink-500/40 transition duration-300 relative overflow-hidden group shadow-xl shadow-pink-500/5"
          >
            {/* 1. Mentioned Certification Details */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-400 border border-pink-500/20">
                <Award className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/25 font-semibold">
                      Scaler Topics • 27 March 2026
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      Certificate of Excellence
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white leading-tight mb-2">
                  Java Course: Mastering the Fundamentals
                </h3>
                
                <p className="text-sm text-slate-300 mb-2">
                  <span className="text-slate-400">Instructor & Signatory:</span> <strong className="text-white">Anshuman Singh</strong>, Co-founder SCALER
                </p>

                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  Mastered core Object-Oriented Programming (OOP), Java syntax, algorithmic logic, memory management, and problem-solving through comprehensive curriculum.
                </p>

                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {['86 Video Tutorials', '12 Modules', '9 Challenges', 'Java OOP', 'Data Structures', 'Scaler Topics'].map(tag => (
                    <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-800/90 text-slate-300 border border-slate-700/70">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/5 text-xs font-mono text-slate-400">
                  Course Structure: <span className="text-slate-200">86 Video Tutorials • 12 Modules • 9 Challenges Completed</span>
                </div>
              </div>
            </div>

            {/* 2. Certificate Visual Preview Banner (Given after mentioned certification details) */}
            <div className="mt-4 pt-4 border-t border-white/5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Official Certificate Document
                </span>
                <span className="text-xs text-pink-400 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> Click to enlarge
                </span>
              </div>
              <div 
                onClick={() => setPreviewCert({ title: 'Java: Mastering Fundamentals (Scaler Topics)', image: scalerCert })}
                className="relative rounded-2xl overflow-hidden border border-white/10 group/thumb cursor-pointer bg-slate-950 aspect-[16/9] md:aspect-[21/9] max-h-72 flex items-center justify-center"
              >
                <img 
                  src={scalerCert} 
                  alt="Scaler Topics Java Certificate" 
                  className="w-full h-full object-cover group-hover/thumb:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/40 group-hover/thumb:bg-slate-950/15 transition flex items-center justify-center">
                  <span className="px-4 py-2 rounded-xl bg-slate-900/90 text-xs md:text-sm font-semibold text-pink-300 border border-pink-500/40 shadow-xl flex items-center gap-2 backdrop-blur-md group-hover/thumb:scale-105 transition">
                    <Eye className="w-4 h-4" />
                    <span>Click to View Full Certificate</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Certificate 4: Full Stack Developer (Skill High) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 md:p-8 rounded-3xl bg-slate-900/40 border border-teal-500/20 hover:border-teal-400/40 transition duration-300 relative overflow-hidden group shadow-xl shadow-teal-500/5"
          >
            {/* Mentioned Certification Details */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20">
                <Award className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/25 font-semibold">
                      Skill High • 2025
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      Certificate of Excellence
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white leading-tight mb-2">
                  Full Stack Developer
                </h3>
                
                <h4 className="text-sm font-semibold text-teal-400 mb-2">Skill High</h4>
                
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  Full stack web engineering covering frontend component architectures, RESTful API development, state management, and backend database integrations.
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  {['Full Stack', 'Frontend', 'Backend APIs', 'Web Architecture', 'Skill High'].map(tag => (
                    <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-800/90 text-slate-300 border border-slate-700/70">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Education Section (Full width, placed AFTER Certifications) */}
      <section id="education" className="py-24 px-4 md:px-8 max-w-5xl mx-auto border-t border-slate-900">
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-teal-400" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white flex items-center gap-3">
            <span>Education Timeline</span>
          </h2>
          <p className="text-sm md:text-base text-slate-400 mt-2 max-w-2xl">
            Formal education, degree programs, and academic milestones.
          </p>
          <div className="h-1 w-20 bg-teal-500 rounded-full mt-4" />
        </div>

        <div className="relative pl-8 md:pl-12 border-l-2 border-slate-800 space-y-12">
          
          {/* Parul University */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Node icon indicator */}
            <div className="absolute top-2 -left-[45px] md:-left-[61px] w-8 h-8 rounded-full bg-slate-950 border-2 border-teal-500 flex items-center justify-center text-xs text-teal-400 font-bold shadow-lg shadow-teal-500/25">
              PU
            </div>
            
            <div className="p-6 md:p-8 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-teal-500/25 hover:bg-slate-900/60 transition duration-300 shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">B.Tech – Artificial Intelligence</h3>
                  <h4 className="text-base font-semibold text-slate-300">Parul University</h4>
                </div>
                <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-teal-500/10 border border-teal-500/25 text-teal-300">
                  2023 – 2027
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed my-4">
                Specialized in core Artificial Intelligence, Machine Learning, Deep Learning, Neural Networks, Computer Vision, Natural Language Processing, and Advanced Data Structures & Algorithms.
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/5 text-sm text-slate-400">
                <span>Current Academic Standing:</span>
                <span className="px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 font-bold text-base">
                  CGPA: 7.98
                </span>
              </div>
            </div>
          </motion.div>

          {/* Narayana Junior College */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute top-2 -left-[45px] md:-left-[61px] w-8 h-8 rounded-full bg-slate-950 border-2 border-slate-700 flex items-center justify-center text-xs text-slate-400 font-bold">
              NC
            </div>
            
            <div className="p-6 md:p-8 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-slate-700 hover:bg-slate-900/60 transition duration-300 shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">Intermediate (MPC)</h3>
                  <h4 className="text-base font-semibold text-slate-300">Narayana Junior College, Srikakulam</h4>
                </div>
                <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-800 border border-slate-700 text-slate-400">
                  2021 – 2023
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed my-4">
                Focused on Mathematics, Physics, and Chemistry with a strong emphasis on analytical problem-solving and rigorous scientific principles.
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/5 text-sm text-slate-400">
                <span>Academic Score:</span>
                <span className="px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-bold text-base">
                  95%
                </span>
              </div>
            </div>
          </motion.div>

          {/* Oxford High School */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute top-2 -left-[45px] md:-left-[61px] w-8 h-8 rounded-full bg-slate-950 border-2 border-slate-700 flex items-center justify-center text-xs text-slate-400 font-bold">
              OH
            </div>
            
            <div className="p-6 md:p-8 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-slate-700 hover:bg-slate-900/60 transition duration-300 shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">10th Standard (SSC)</h3>
                  <h4 className="text-base font-semibold text-slate-300">Oxford High School, Srikakulam</h4>
                </div>
                <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-800 border border-slate-700 text-slate-400">
                  2020 – 2021
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed my-4">
                Secondary School Certificate with distinction in science, mathematics, and computer applications.
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/5 text-sm text-slate-400">
                <span>Academic Score:</span>
                <span className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 font-bold text-base">
                  96%
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="py-24 px-4 md:px-8 max-w-6xl mx-auto border-t border-slate-900">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-white inline-flex items-center gap-3 justify-center"
          >
            <FolderIcon className="w-8 h-8 text-indigo-400" />
            <span>Featured Projects</span>
          </motion.h2>
          <div className="h-1 w-20 bg-indigo-500 rounded-full mt-4 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Project 1: AI/ML Typing Speed Analyzer */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group flex flex-col justify-between p-6 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-indigo-500/30 hover:bg-slate-900/60 shadow-lg hover:shadow-indigo-500/5 transition duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6 text-2xl font-bold">
                ⚡
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">AI Typing Speed Analyzer</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Full-stack AI web app analyzing real-time keystroke dynamics with machine learning to predict cognitive states (Focused, Tired, Distracted) with interactive metrics.
              </p>
            </div>
            
            <div>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {['React', 'Python', 'Flask', 'ML'].map((tag) => (
                  <span key={tag} className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-950 border border-white/5 text-slate-400">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <a 
                  href="https://github.com/bhagyawish2021-stack/AI_Typer_Analyzer" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold bg-slate-950 border border-white/5 hover:border-indigo-500/40 text-slate-300 hover:text-white transition duration-300"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a 
                  href="https://typer-lyart.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold bg-indigo-500 hover:bg-indigo-600 text-white transition duration-300"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Project 2: Reconciliation Engine */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group flex flex-col justify-between p-6 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-teal-500/30 hover:bg-slate-900/60 shadow-lg hover:shadow-teal-500/5 transition duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400 mb-6 text-2xl font-bold">
                🧠
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">Reconciliation Engine</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Production-quality system that ingests asynchronous typing event streams from multiple users, predicts mental states using Random Forest, and deterministically resolves conflicting state predictions.
              </p>
            </div>
            
            <div>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {['Python', 'Random Forest', 'Stream Processing', 'ML'].map((tag) => (
                  <span key={tag} className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-950 border border-white/5 text-slate-400">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <a 
                  href="https://github.com/bhagyawish2021-stack/Reconciliation-Engine" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold bg-slate-950 border border-white/5 hover:border-teal-500/40 text-slate-300 hover:text-white transition duration-300 col-span-2"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>View Repository</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Project 3: WatchTransfer */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group flex flex-col justify-between p-6 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-pink-500/30 hover:bg-slate-900/60 shadow-lg hover:shadow-pink-500/5 transition duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-400 mb-6 text-2xl font-bold">
                🏥
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">WatchTransfer</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Clinical notification responsibility engine eliminating missed critical lab and imaging results and handoff alert fatigue, delivering alerts to the right clinician at the right time.
              </p>
            </div>
            
            <div>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {['React', 'Healthcare AI', 'Clinical Engine', 'Full Stack'].map((tag) => (
                  <span key={tag} className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-950 border border-white/5 text-slate-400">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <a 
                  href="https://github.com/bhagyawish2021-stack/WatchTransfer" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold bg-slate-950 border border-white/5 hover:border-pink-500/40 text-slate-300 hover:text-white transition duration-300"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a 
                  href="https://frontend-l6cq.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold bg-pink-500 hover:bg-pink-600 text-white transition duration-300"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Project 4: Aqua Platform */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group flex flex-col justify-between p-6 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-cyan-500/30 hover:bg-slate-900/60 shadow-lg hover:shadow-cyan-500/5 transition duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6 text-2xl font-bold">
                🌊
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">Aqua Aquaculture Platform</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                End-to-end aquaculture intelligence ecosystem integrating ML consultation APIs, seafood supply chains, pond supplies auditing, and real-time farmer dashboards.
              </p>
            </div>
            
            <div>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {['React', 'ML-API', 'Backend', 'Full Stack'].map((tag) => (
                  <span key={tag} className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-950 border border-white/5 text-slate-400">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <a 
                  href="https://github.com/bhagyawish2021-stack/Aqua" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold bg-slate-950 border border-white/5 hover:border-cyan-500/40 text-slate-300 hover:text-white transition duration-300"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a 
                  href="https://frontend-eight-pearl-75.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold bg-cyan-500 hover:bg-cyan-600 text-white transition duration-300"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Project 5: Next Word Predictor */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group flex flex-col justify-between p-6 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-indigo-500/30 hover:bg-slate-900/60 shadow-lg hover:shadow-indigo-500/5 transition duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6 text-2xl font-bold">
                📝
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">Next Word Predictor</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Smart Natural Language Processing application using N-gram language modeling and custom token scoring algorithms to analyze sequences and predict text metrics.
              </p>
            </div>
            
            <div>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {['Python', 'Flask', 'NLP', 'N-Gram'].map((tag) => (
                  <span key={tag} className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-950 border border-white/5 text-slate-400">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <a 
                  href="https://github.com/bhagyawish2021-stack/word_predictor" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold bg-slate-950 border border-white/5 hover:border-indigo-500/40 text-slate-300 hover:text-white transition duration-300 col-span-2"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>View Repository</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Project 6: SSMMK Agencies */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group flex flex-col justify-between p-6 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-teal-500/30 hover:bg-slate-900/60 shadow-lg hover:shadow-teal-500/5 transition duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400 mb-6 text-2xl font-bold">
                🏢
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">SSMMK Agencies</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Responsive aquaculture business website for Sri Sai Murali Mohana Krishna Agencies in AP, with interactive product catalogs for shrimp feed and pond chemicals.
              </p>
            </div>
            
            <div>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {['HTML5', 'CSS3', 'JavaScript', 'Responsive'].map((tag) => (
                  <span key={tag} className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-950 border border-white/5 text-slate-400">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <a 
                  href="https://github.com/bhagyawish2021-stack/ssmmk-agencies" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold bg-slate-950 border border-white/5 hover:border-teal-500/40 text-slate-300 hover:text-white transition duration-300 col-span-2"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>View Repository</span>
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Get In Touch Section */}
      <section id="contact" className="py-24 px-4 md:px-8 max-w-4xl mx-auto border-t border-slate-900 text-center">
        <div className="mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-white inline-flex items-center gap-3 justify-center"
          >
            <Mail className="w-8 h-8 text-pink-400" />
            <span>Get In Touch</span>
          </motion.h2>
          <div className="h-1 w-20 bg-pink-500 rounded-full mt-4 mx-auto" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-8 md:p-12 rounded-3xl bg-slate-900/50 backdrop-blur-md border border-white/10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 blur-xl rounded-full" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-500/10 blur-xl rounded-full" />
          
          <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4">Let's Connect! 🤝</h3>
          <p className="text-slate-400 text-base max-w-xl mx-auto mb-10 leading-relaxed">
            I'd love to hear from you. Feel free to reach out for research discussions, full-stack AI development collaborations, or simply to say hello!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            
            {/* Email card */}
            <a 
              href="mailto:bhagyawish2021@gmail.com"
              className="p-6 rounded-2xl bg-slate-950/60 hover:bg-slate-950 border border-white/5 hover:border-pink-500/40 transition duration-300 group flex flex-col items-center"
            >
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center mb-3">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-xs text-slate-500 mb-1">Email Me</span>
              <span className="text-sm font-semibold text-slate-300 break-all select-all">bhagyawish2021@gmail.com</span>
            </a>

            {/* Phone Card */}
            <a 
              href="tel:+919704786661"
              className="p-6 rounded-2xl bg-slate-950/60 hover:bg-slate-950 border border-white/5 hover:border-indigo-500/40 transition duration-300 group flex flex-col items-center"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-xs text-slate-500 mb-1">Call Me</span>
              <span className="text-sm font-semibold text-slate-300 select-all">+91 9704786661</span>
            </a>

            {/* Location Card */}
            <div className="p-6 rounded-2xl bg-slate-950/60 border border-white/5 flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-xs text-slate-500 mb-1">Location</span>
              <span className="text-sm font-semibold text-slate-300">Andhra Pradesh, India</span>
            </div>

          </div>

          <div className="flex justify-center gap-4">
            <a 
              href="https://github.com/bhagyawish2021-stack" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-slate-950/50 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition border border-white/5 shadow-md"
              title="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/bhagyasri-siva-157a60315/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-slate-950/50 hover:bg-indigo-600/10 text-slate-400 hover:text-indigo-400 flex items-center justify-center transition border border-white/5 shadow-md"
              title="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="https://www.instagram.com/bhagya_swapna?igsh=YndhcHVlYnNnNTNw" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-slate-950/50 hover:bg-pink-600/10 text-slate-400 hover:text-pink-400 flex items-center justify-center transition border border-white/5 shadow-md"
              title="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>

        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-900 text-center text-slate-500 text-xs mt-12 bg-slate-950/20">
        <p className="flex items-center justify-center gap-1.5 mb-2">
          <span>© 2025 BhagyaSri Korlam. Designed & Built with</span>
          <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 inline" />
          <span>| All Rights Reserved</span>
        </p>
        <p className="text-[10px] text-slate-600">Built using React, Framer Motion, and Tailwind CSS</p>
      </footer>

      {/* Back to top button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20 border border-white/10"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}

      {/* Certificate Lightbox Modal */}
      {previewCert && (
        <div 
          onClick={() => setPreviewCert(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
        >
          <motion.div 
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-slate-900/95 border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/70">
              <div className="flex items-center gap-2.5">
                <Award className="w-5 h-5 text-teal-400" />
                <h4 className="text-white font-bold text-sm sm:text-base truncate">{previewCert.title}</h4>
              </div>
              <button 
                onClick={() => setPreviewCert(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-sm font-bold transition"
              >
                ✕
              </button>
            </div>
            
            <div className="p-4 sm:p-6 overflow-auto flex items-center justify-center bg-slate-950/80">
              <img 
                src={previewCert.image} 
                alt={previewCert.title} 
                className="max-h-[68vh] w-auto object-contain rounded-xl shadow-2xl border border-white/10"
              />
            </div>

            <div className="px-6 py-3 border-t border-white/10 bg-slate-950/70 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">Official Certificate Credential</span>
              <a 
                href={previewCert.image} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-indigo-500 hover:bg-indigo-600 text-white inline-flex items-center gap-1.5 transition shadow-lg shadow-indigo-500/20"
              >
                <span>Open Full Image</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}

// Mini Icons wrapper if not explicitly exported in lucide
function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" />
      <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5Z" />
      <path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1Z" />
    </svg>
  );
}

function FolderIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  );
}

function Instagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function Linkedin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function Github(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

