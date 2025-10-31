"use client";
// Project Detail Modal
type PortfolioItem = { src: string; alt: string; cat: string };
type ProjectModalProps = {
  open: boolean;
  onClose: () => void;
  project: PortfolioItem | null;
};
function ProjectModal({ open, onClose, project }: ProjectModalProps) {
  if (!open || !project) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in" role="dialog" aria-modal="true">
      <div className="bg-white dark:bg-[#181b20] rounded-2xl shadow-2xl max-w-lg w-full p-6 relative animate-fade-in-up">
        <button onClick={onClose} aria-label="Close project details" className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-teal-500 focus:outline-none">&times;</button>
        <img src={project.src} alt={project.alt} className="w-full h-48 object-cover rounded-xl mb-4" />
        <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{project.alt}</h3>
        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-teal-600/90 text-white shadow mb-3">{project.cat.charAt(0).toUpperCase() + project.cat.slice(1)}</span>
        <p className="text-gray-700 dark:text-gray-300 mb-4">This is a sample project description. You can add more details here, such as technologies used, project links, or a summary.</p>
        <a href="#contact" className="btn-primary px-6 py-2 rounded-full">Contact for similar work</a>
      </div>
    </div>
  );
}
import { useEffect, useState, useRef } from 'react';

import ThemeToggle from './ThemeToggle';

const heroSlides = [
  {
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    heading: "I'm a Web Designer",
    subheading: 'Hello...!',
    desc: 'I craft delightful, performant websites and brands.'
  },
  {
    img: 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5',
    heading: "Branding & Identity",
    subheading: 'Let’s build your brand',
    desc: 'From logo to launch, I help brands stand out and connect.'
  },
  {
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    heading: "Modern Web Development",
    subheading: 'Performance meets beauty',
    desc: 'Fast, accessible, and beautiful websites for your business.'
  },
];

const portfolioItems = [
  { src: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg', alt: 'Minimal product', cat: 'branding' },
  { src: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg', alt: 'Design workspace', cat: 'web' },
  { src: 'https://images.pexels.com/photos/1787044/pexels-photo-1787044.jpeg', alt: 'City skyline', cat: 'photography' },
  { src: 'https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg', alt: 'White clock', cat: 'branding' },
  { src: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg', alt: 'Laptop on desk', cat: 'web' },
  { src: 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg', alt: 'Architecture', cat: 'photography' },
  { src: 'https://images.pexels.com/photos/19661/pexels-photo.jpg', alt: 'Packaging', cat: 'branding' },
  { src: 'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg', alt: 'Phone app', cat: 'web' },
];

const testimonials = [
  { quote: '“Our website launch was a breeze. Beautiful design and a huge performance boost.”', author: 'Daniel Brown — CEO, NorthWind', img: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' },
  { quote: '“Clean code, great communication, and pixel‑perfect results. Highly recommended.”', author: 'Julia Ortega — Product Lead', img: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg' },
  { quote: '“The new brand system elevated our presence across all channels.”', author: 'Haruto Sato — Founder, Novum', img: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg' },
];

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProject, setModalProject] = useState<PortfolioItem | null>(null);
  const [filter, setFilter] = useState('all');
  const [slideIndex, setSlideIndex] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);
  const [formStatus, setFormStatus] = useState('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  // Removed heroTimer and auto-advance for hero slider; now only manual change

  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById('site-header');
      if (window.scrollY > 10) header?.classList.add('scrolled');
      else header?.classList.remove('scrolled');
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (timer) clearInterval(timer);
    const newTimer = setInterval(() => {
      setSlideIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    setTimer(newTimer);
    return () => clearInterval(newTimer);
  }, [slideIndex]);

  const filteredItems = portfolioItems.filter((item) => filter === 'all' || item.cat === filter);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get('name')?.toString().trim();
    const email = data.get('email')?.toString().trim();
    const message = data.get('message')?.toString().trim();
    if (!name || !email || !message) {
      setFormStatus('Please fill out all fields.');
      return;
    }
    setFormStatus("Thanks! I'll reply soon.");
    form.reset();
  };

  return (
  <main className="font-sans scroll-smooth bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* Header */}
  <header id="site-header" className="fixed top-0 left-0 right-0 z-50 transition-all bg-slate-800/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 text-white">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#hero" className="flex items-center h-12">
            <img src="/logo.png" alt="Company Logo" className="h-12 w-auto" />
          </a>
          <nav className="hidden md:flex gap-6">
            {['about', 'services', 'portfolio', 'testimonials', 'contact'].map((id) => (
              <a key={id} href={`#${id}`} className="text-white hover:text-teal-300 dark:hover:text-teal-300 transition-colors">{id.charAt(0).toUpperCase() + id.slice(1)}</a>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero */}
  <section id="hero" className="relative min-h-[84vh] flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-50 dark:from-black dark:to-gray-900">
    {/* Company Logo */}
    <div className="absolute top-8 left-8 z-20">
      <img src="./logo.png1" alt="Company Logo" className="h-12 w-auto drop-shadow-lg" />
    </div>
    {/* Hero Slider Images */}
    {heroSlides.map((slide, idx) => (
      <div
        key={slide.img}
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${heroIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        style={{
          backgroundImage: `url('${slide.img}')`,
          opacity: 0.92,
          filter: 'none'
        }}
        aria-hidden={heroIndex !== idx}
      />
    ))}
  <div className="absolute inset-0 z-10 pointer-events-none">
  {/* 1 & 2: Softer white gradient overlay, white to transparent */}
  <div className="block dark:hidden absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-white/0" />
      {/* Dark mode: black gradient overlay */}
      <div className="hidden dark:block absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
    </div>
    {/* Slider Controls */}
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4">
      {/* Left arrow */}
      <button
        onClick={() => setHeroIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
        className="group w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white/100 shadow-lg border border-gray-300 text-gray-700 text-2xl font-bold transition-all duration-200 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-teal-400/50"
        aria-label="Previous slide"
      >
        <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">&#8592;</span>
      </button>
      {/* Dots */}
      <div className="flex gap-2">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setHeroIndex(idx)}
            className={`w-3 h-3 rounded-full border-2 ${heroIndex === idx ? 'bg-teal-500 border-teal-700' : 'bg-white/70 border-gray-300'} transition`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
      {/* Right arrow */}
      <button
        onClick={() => setHeroIndex((prev) => (prev + 1) % heroSlides.length)}
        className="group w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white/100 shadow-lg border border-gray-300 text-gray-700 text-2xl font-bold transition-all duration-200 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-teal-400/50"
        aria-label="Next slide"
      >
        <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">&#8594;</span>
      </button>
    </div>
  <div className="relative flex flex-col items-center justify-center text-center px-6 max-w-[1200px] mx-auto z-30 w-full">
      <p className="font-semibold opacity-95 text-gray-800 dark:text-gray-200 drop-shadow-lg [text-shadow:0_2px_8px_rgba(255,255,255,0.7)] dark:[text-shadow:0_2px_8px_rgba(0,0,0,0.7)]">{heroSlides[heroIndex].subheading}</p>
      <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mt-2 mb-3 text-gray-900 dark:text-white drop-shadow-lg [text-shadow:0_2px_12px_rgba(255,255,255,0.8)] dark:[text-shadow:0_2px_12px_rgba(0,0,0,0.8)]">{heroSlides[heroIndex].heading}</h1>
      <p className="text-xl md:text-2xl font-bold text-black dark:text-gray-300 max-w-xl mt-2 mb-6 [text-shadow:0_2px_8px_rgba(255,255,255,0.7)] dark:[text-shadow:0_2px_8px_rgba(0,0,0,0.7)]">{heroSlides[heroIndex].desc}</p>
      <div className="flex gap-3 mt-5 justify-center">
        <a href="#portfolio" className="btn-primary">View Portfolio</a>
        <a href="#contact" className="btn-ghost">Hire Me</a>
      </div>
    </div>
  </section>

      {/* About */}
  <section id="about" className="py-16 bg-gray-100 dark:bg-[#0e1117] fade-in-up">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
            <img src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg" alt="Portrait" className="rounded-xl shadow-xl border border-gray-200 dark:border-gray-700" />
          <div>
              <h2 className="text-3xl font-extrabold mb-2 text-gray-900 dark:text-white">Hello! I am Mayank</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-4">Graphic Design and Web Development</p>
              <p className="mb-4 text-gray-700 dark:text-gray-300">For the past 6+ years, I have helped startups and global brands launch products that are beautiful, accessible, and fast.</p>
            <a href="#services" className="btn-ghost">What I Do</a>
          </div>
        </div>
      </section>

      {/* Services */}
  <section id="services" className="py-16 bg-gray-100 dark:bg-[#0e1117] fade-in-up">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
            <h2 className="text-3xl font-extrabold mb-2 text-gray-900 dark:text-white">My Services</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Design, development and everything in between.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              ['💻', 'Web Design', 'Responsive, accessible interfaces that convert.'],
              ['⚙️', 'Development', 'Modern, fast websites with clean code.'],
              ['📸', 'Photography', 'High‑quality visuals to elevate your brand.'],
              ['🎯', 'Branding', 'Distinctive identities with lasting impact.'],
              ['🧭', 'Strategy', 'Data‑driven decisions for measurable growth.'],
              ['📣', 'Marketing', 'Campaigns that reach and resonate.'],
            ].map(([icon, title, desc]) => (
                <div key={title} className="bg-white dark:bg-[#181b20] p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:-translate-y-1 hover:shadow-xl transition">
                <div className="text-2xl">{icon}</div>
                  <h3 className="font-bold mt-2 mb-1 text-gray-900 dark:text-white">{title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
  <section id="portfolio" className="py-20 bg-gray-100 dark:bg-[#0e1117] fade-in-up">
    <div className="max-w-[1200px] mx-auto px-6">
      <h2 className="text-3xl font-extrabold mb-2 text-gray-900 dark:text-white text-center">Portfolio</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8 text-center">Selected projects and case studies</p>
      {/* Filter Chips */}
      <div className="flex flex-wrap justify-center gap-3 mb-10 animate-fade-in-up">
        {['all', 'branding', 'web', 'photography'].map((cat, idx) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full border-2 font-medium shadow-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-teal-400/50
              ${filter === cat
                ? 'bg-teal-600/90 border-teal-600 text-white dark:bg-teal-500 dark:border-teal-400 dark:text-gray-900 scale-105'
                : 'bg-white/80 border-gray-200 text-gray-700 dark:bg-[#181b20] dark:border-gray-700 dark:text-gray-300 hover:border-teal-400 hover:text-teal-600 dark:hover:text-teal-300'}
            `}
            style={{ animationDelay: `${idx * 60}ms` }}
          >
            {cat === 'branding' && <span>🎯</span>}
            {cat === 'web' && <span>💻</span>}
            {cat === 'photography' && <span>📸</span>}
            {cat === 'all' && <span>🌐</span>}
            <span className="capitalize">{cat}</span>
          </button>
        ))}
      </div>
      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredItems.map((item, i) => (
          <div
            key={i}
            className="flip-card animate-fade-in-up"
            tabIndex={0}
            aria-label={`View details for ${item.alt}`}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flip-card-inner">
              {/* Front */}
              <div className="flip-card-front group relative rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-[#181b20] shadow-md">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-56 object-cover transition-transform duration-300 rounded-t-2xl"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-2 z-10">
                  <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-teal-600/90 text-white shadow-md mb-2 w-fit">
                    {item.cat.charAt(0).toUpperCase() + item.cat.slice(1)}
                  </span>
                  <h3 className="text-lg font-bold text-white drop-shadow-lg">{item.alt}</h3>
                </div>
              </div>
              {/* Back */}
              <div className="flip-card-back rounded-2xl border-2 border-teal-500 bg-gradient-to-br from-teal-600 to-teal-400 flex flex-col items-center justify-center p-6 text-white">
                <h3 className="text-xl font-bold mb-2">{item.alt}</h3>
                <p className="text-sm mb-4 text-center">This is a sample project description. You can add more details here, such as technologies used, project links, or a summary.</p>
                <a href="#contact" className="btn-primary btn-animated px-6 py-2 rounded-full">Contact for similar work</a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ProjectModal open={modalOpen} onClose={() => setModalOpen(false)} project={modalProject} />
      {/* Call to Action */}
      <div className="flex justify-center mt-10 animate-fade-in-up">
        <a href="#contact" className="btn-primary btn-animated text-lg px-8 py-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-400/50">Contact for Project</a>
      </div>
    </div>
  </section>

      {/* Testimonials */}
  <section id="testimonials" className="py-16 bg-gray-100 dark:bg-[#0e1117] fade-in-up">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
            <h2 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white">What Clients Say</h2>
            <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white/5 dark:bg-gray-900/20">
            <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
              {testimonials.map((t, i) => (
                <article key={i} className="min-w-full py-8 px-4 grid gap-4 place-items-center text-center">
                    <p className="text-lg md:text-xl max-w-3xl text-gray-700 dark:text-gray-200">{t.quote}</p>
                    <div className="flex items-center gap-3 text-gray-500 dark:text-gray-300">
                    <img src={t.img} alt="Client" className="w-9 h-9 rounded-full object-cover" />
                    <span>{t.author}</span>
                  </div>
                </article>
              ))}
            </div>
              <button onClick={() => setSlideIndex((i) => (i - 1 + testimonials.length) % testimonials.length)} className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-gray-200/60 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 w-9 h-9 rounded-full grid place-items-center hover:bg-teal-900/30">❮</button>
              <button onClick={() => setSlideIndex((i) => (i + 1) % testimonials.length)} className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-gray-200/60 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 w-9 h-9 rounded-full grid place-items-center hover:bg-teal-900/30">❯</button>
            <div className="flex justify-center gap-2 py-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlideIndex(i)}
                    className={`w-2 h-2 rounded-full ${slideIndex === i ? 'bg-teal-500 dark:bg-teal-400' : 'bg-gray-400 dark:bg-gray-600 opacity-70'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
  <section id="contact" className="py-16 bg-gray-100 dark:bg-[#0e1117] fade-in-up">
        <div className="max-w-[780px] mx-auto px-6 text-center">
            <h2 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="grid gap-4 text-left">
              <div className="grid sm:grid-cols-2 gap-4">
              <label className="grid gap-1">
                <span>Name</span>
                  <input name="name" required className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-600/20" />
              </label>
              <label className="grid gap-1">
                <span>Email</span>
                  <input name="email" type="email" required className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-600/20" />
              </label>
            </div>
            <label className="grid gap-1">
              <span>Message</span>
                <textarea name="message" rows={5} required className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-600/20" />
            </label>
            <button type="submit" className="btn-primary">Send</button>
              {formStatus && <p className="text-teal-600 dark:text-teal-400 mt-2">{formStatus}</p>}
          </form>
        </div>
      </section>

      {/* Map */}
      <section className="map w-full" aria-label="Map">
        <iframe
          title="Axtrics Solutions Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3432.020379351933!2d76.6846165!3d30.7069108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390feef6c7fb49cf%3A0x525b616b013e77ef!2sAxtrics%20Solutions%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1700000000000"
          width="100%"
          height="420"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      {/* Footer */}
  <footer className="bg-gray-900 dark:bg-[#181b20] border-t border-gray-200 dark:border-gray-800 py-10">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-6 items-start">
          <div>
            <a href="#hero" className="font-bold text-teal-700 dark:text-teal-300">Roptas</a>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Designing and building delightful digital products.</p>
          </div>
            <nav className="grid grid-flow-col gap-4">
              {['about', 'services', 'portfolio', 'contact'].map((id) => (
                <a key={id} href={`#${id}`} className="text-gray-500 dark:text-gray-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors">{id.charAt(0).toUpperCase() + id.slice(1)}</a>
              ))}
            </nav>
        </div>
          <div className="text-center text-gray-400 dark:text-gray-500 border-t border-gray-200 dark:border-gray-800 mt-6 pt-4">
            © {new Date().getFullYear()} Roptas. All rights reserved.
          </div>
      </footer>
    </main>
  );
}

