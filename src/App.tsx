import { useEffect, useRef, useState } from 'react';
import { Globe, ArrowRight, Instagram, Twitter } from 'lucide-react';

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadeAnimationRef = useRef<number | null>(null);
  const fadingOutRef = useRef<boolean>(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'contact'>('projects');

  // Helper to animate opacity using requestAnimationFrame
  const animateOpacity = (targetOpacity: number, duration: number, onComplete?: () => void) => {
    const video = videoRef.current;
    if (!video) return;

    // Cancel any currently running fade animation
    if (fadeAnimationRef.current !== null) {
      cancelAnimationFrame(fadeAnimationRef.current);
      fadeAnimationRef.current = null;
    }

    const startOpacity = parseFloat(video.style.opacity || '0');
    const opacityDiff = targetOpacity - startOpacity;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Interpolate opacity starting from its current value
      const currentOpacity = startOpacity + opacityDiff * progress;
      video.style.opacity = currentOpacity.toFixed(3);

      if (progress < 1) {
        fadeAnimationRef.current = requestAnimationFrame(step);
      } else {
        fadeAnimationRef.current = null;
        if (onComplete) onComplete();
      }
    };

    fadeAnimationRef.current = requestAnimationFrame(step);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const duration = video.duration;
    const currentTime = video.currentTime;

    // Check if 0.55s remain before video ends
    if (duration && (duration - currentTime) <= 0.55) {
      if (!fadingOutRef.current) {
        fadingOutRef.current = true;
        animateOpacity(0, 500); // 500ms fade-out
      }
    }
  };

  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return;

    // On ended, opacity is set to 0 immediately
    video.style.opacity = '0';

    // After 100ms, reset currentTime, play and fade back in
    setTimeout(() => {
      if (!videoRef.current) return;
      videoRef.current.currentTime = 0;
      videoRef.current.play()
        .then(() => {
          fadingOutRef.current = false;
          animateOpacity(1, 500); // 500ms fade-in
        })
        .catch((error) => {
          console.error("Failed to replay video:", error);
        });
    }, 100);
  };

  const handlePlay = () => {
    // Fade in on initial play if not already fading out
    if (!fadingOutRef.current) {
      animateOpacity(1, 500);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.style.opacity = '0';
      // Attempt play in case autoplay is delayed
      video.play().catch((err) => {
        console.warn("Autoplay interaction waiting: ", err);
      });
    }

    return () => {
      if (fadeAnimationRef.current !== null) {
        cancelAnimationFrame(fadeAnimationRef.current);
      }
    };
  }, []);

  const handleDownloadCV = () => {
    alert("CV Download initiated! Thank you for viewing my profile.");
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex flex-col justify-between">
      {/* Background Video Wrapper */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <video
          ref={videoRef}
          src="/assets/Man_typing_on_laptop_202607020937.mp4"
          muted
          autoPlay
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          onPlay={handlePlay}
          className="absolute top-0 left-0 w-full h-full object-cover translate-y-[17%]"
          style={{ opacity: 0 }}
        />
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-20 w-full px-6 py-6">
        <div className="liquid-glass rounded-full px-6 py-3 flex items-center justify-between max-w-5xl mx-auto">
          {/* Left side: Logo & Links */}
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setActiveTab('projects')} 
              className="flex items-center gap-2 text-white font-semibold text-lg select-none hover:opacity-90 transition-opacity"
            >
              <Globe className="h-6 w-6 text-white" />
              <span>Badusha P N</span>
            </button>
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => setActiveTab('projects')} 
                className={`transition-colors text-sm font-medium ${
                  activeTab === 'projects' ? 'text-white font-bold' : 'text-white/80 hover:text-white'
                }`}
              >
                Projects
              </button>
              <button 
                onClick={() => setActiveTab('skills')} 
                className={`transition-colors text-sm font-medium ${
                  activeTab === 'skills' ? 'text-white font-bold' : 'text-white/80 hover:text-white'
                }`}
              >
                Skills
              </button>
              <button 
                onClick={() => setActiveTab('contact')} 
                className={`transition-colors text-sm font-medium ${
                  activeTab === 'contact' ? 'text-white font-bold' : 'text-white/80 hover:text-white'
                }`}
              >
                Contact
              </button>
            </div>
          </div>

          {/* Right side: Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('contact')}
              className="text-white hover:text-white/85 transition-colors text-sm font-medium"
            >
              Hire Me
            </button>
            <button 
              onClick={handleDownloadCV}
              className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium hover:bg-white/5 transition-colors"
            >
              Download CV
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Content Area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-8 text-center mt-4">
        {/* Heading */}
        <h1 
          style={{ fontFamily: "'Instrument Serif', serif" }}
          className="text-5xl md:text-6xl lg:text-7xl text-white mb-3 tracking-tight whitespace-nowrap italic"
        >
          Badusha P N
        </h1>

        {/* Short Bio */}
        <p className="text-white/80 text-sm md:text-base max-w-xl mb-6 leading-relaxed">
          Flutter & Full-Stack Product Engineer with 2+ years of experience building products from 0→1.
        </p>

        {/* Tab Selectors */}
        <div className="flex justify-center gap-2 mb-6">
          {(['projects', 'skills', 'contact'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-white text-black font-bold shadow-lg shadow-white/10'
                  : 'liquid-glass text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Active Tab Panel */}
        <div className="w-full max-w-2xl min-h-[350px] flex flex-col justify-center">
          {activeTab === 'projects' && (
            <div className="space-y-4 text-left animate-fadeIn">
              {/* LearnLi */}
              <div className="liquid-glass rounded-2xl p-5 hover:bg-white/[0.02] transition-colors">
                <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                  <h3 className="text-white font-semibold text-lg">LearnLi</h3>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-white/90">
                    Ed-tech • 10k+ Signups
                  </span>
                </div>
                <p className="text-sm text-white/70 mb-3">
                  Ed-tech platform built with Flutter Web, Firestore, and GetX. Showcases a custom session mapping fix resolving iOS ITP issues.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Flutter Web', 'Firestore', 'GetX', 'iOS ITP Fix'].map((tech) => (
                    <span key={tech} className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-white/60">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Soulful Haven */}
              <div className="liquid-glass rounded-2xl p-5 hover:bg-white/[0.02] transition-colors">
                <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                  <h3 className="text-white font-semibold text-lg">Soulful Haven</h3>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-white/90">
                    E-Commerce • 2k+ Orders
                  </span>
                </div>
                <p className="text-sm text-white/70 mb-3">
                  High-performance platform using Flutter Mobile, Realtime DB, and BLoC. Solved critical inventory overselling race conditions using Firestore Transactions.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Flutter Mobile', 'Realtime DB', 'BLoC', 'Firestore Transactions'].map((tech) => (
                    <span key={tech} className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-white/60">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* WeddingSnap */}
              <div className="liquid-glass rounded-2xl p-5 hover:bg-white/[0.02] transition-colors">
                <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                  <h3 className="text-white font-semibold text-lg">WeddingSnap</h3>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-white/90">
                    Dual-Client System
                  </span>
                </div>
                <p className="text-sm text-white/70 mb-3">
                  Dual-client system featuring Flutter Mobile for organizers and React Web for guests, backed by a Node.js/Express REST API.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Flutter Mobile', 'React Web', 'Node.js', 'Express'].map((tech) => (
                    <span key={tech} className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-white/60">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left animate-fadeIn">
              {/* Mobile */}
              <div className="liquid-glass rounded-2xl p-5">
                <h3 className="text-white font-semibold text-base mb-3 border-b border-white/10 pb-2">Mobile</h3>
                <ul className="space-y-2">
                  {['Flutter', 'Dart', 'BLoC', 'GetX'].map((skill) => (
                    <li key={skill} className="flex items-center gap-2 text-sm text-white/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/60"></span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Web */}
              <div className="liquid-glass rounded-2xl p-5">
                <h3 className="text-white font-semibold text-base mb-3 border-b border-white/10 pb-2">Web</h3>
                <ul className="space-y-2">
                  {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express'].map((skill) => (
                    <li key={skill} className="flex items-center gap-2 text-sm text-white/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/60"></span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Data / DevOps */}
              <div className="liquid-glass rounded-2xl p-5">
                <h3 className="text-white font-semibold text-base mb-3 border-b border-white/10 pb-2">Data & DevOps</h3>
                <ul className="space-y-2">
                  {['Firestore', 'Realtime DB', 'PostgreSQL', 'Vercel', 'App Store / Play Store'].map((skill) => (
                    <li key={skill} className="flex items-center gap-2 text-sm text-white/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/60"></span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="max-w-xl w-full mx-auto space-y-4 text-center animate-fadeIn">
              {/* Email input bar */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Email inquiry received! I'll get in touch with you shortly.");
                }} 
                className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3"
              >
                <input 
                  type="email" 
                  placeholder="Enter your email to collaborate" 
                  className="bg-transparent text-white placeholder:text-white/40 text-base outline-none flex-1 w-full"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-white rounded-full p-3 text-black hover:bg-white/90 transition-colors flex items-center justify-center shrink-0"
                  aria-label="Submit email"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </form>

              {/* Subtitle text */}
              <p className="text-white text-sm leading-relaxed px-4 opacity-80">
                Let's collaborate on your next product. Drop your email address above to get in touch, or click below to view my core values and engineering manifesto.
              </p>

              {/* Manifesto button */}
              <div className="flex justify-center pt-2">
                <button 
                  onClick={() => alert("Engineering Manifesto:\n\n1. Solve user pain points first.\n2. Write maintainable, self-documenting code.\n3. Keep rendering performance close to 60fps / 120fps.\n4. Design interactions that feel premium.")}
                  className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors"
                >
                  My Manifesto
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Social Icons Footer */}
      <footer className="relative z-10 flex justify-center gap-4 pb-12 pt-4">
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="Instagram"
          className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
        >
          <Instagram className="h-5 w-5" />
        </a>
        <a 
          href="https://twitter.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="Twitter"
          className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
        >
          <Twitter className="h-5 w-5" />
        </a>
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="Website"
          className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
        >
          <Globe className="h-5 w-5" />
        </a>
      </footer>
    </div>
  );
}
