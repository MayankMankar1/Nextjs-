'use client';
import { useEffect, useState } from 'react';

import ThemeToggle from './ThemeToggle';

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
  const [filter, setFilter] = useState('all');
  const [slideIndex, setSlideIndex] = useState(0);
  const [formStatus, setFormStatus] = useState('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

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
  <main className="font-sans scroll-smooth bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* Header */}
  <header id="site-header" className="fixed top-0 left-0 right-0 z-50 transition-all bg-gray-100/90 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#hero" className="font-bold text-teal-700 dark:text-teal-300">Axtrics</a>
          <nav className="hidden md:flex gap-6">
            {['about', 'services', 'portfolio', 'testimonials', 'contact'].map((id) => (
              <a key={id} href={`#${id}`} className="hover:text-teal-600 dark:hover:text-teal-300 transition-colors">{id.charAt(0).toUpperCase() + id.slice(1)}</a>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero */}
  <section id="hero" className="relative min-h-[84vh] grid items-end bg-gradient-to-b from-sky-100 to-white dark:from-black dark:to-gray-900">
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage: `url('https://images.pexels.com/photos/14876122/pexels-photo-14876122.jpeg')`,
      filter: typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'brightness(0.7) blur(0.5px)'
        : 'none'
    }}
  />
  <div className="absolute inset-0 bg-gradient-to-b from-sky-100/80 via-white/70 to-white/0 dark:from-black/40 dark:via-black/60 dark:to-black/80" />
        <div className="relative px-6 pb-24 pt-32 max-w-[1200px] mx-auto">
          <p className="font-semibold opacity-95 text-gray-800 dark:text-gray-200 drop-shadow-lg">Hello...</p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mt-2 mb-3 text-gray-900 dark:text-white drop-shadow-lg">I'm a Web Designer</h1>
          <p className="text-xl md:text-2xl font-bold text-black dark:text-gray-300 max-w-xl mt-2 mb-6">I craft delightful, performant websites and brands.</p>
          <div className="flex gap-3 mt-5">
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
  <section id="portfolio" className="py-16 bg-gray-100 dark:bg-[#0e1117] fade-in-up">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          {/* Portfolio Tabs */}
            <div className="flex justify-center gap-2 mb-6">
            {['all', 'branding', 'web', 'photography'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full border transition-colors ${
                    filter === cat
                      ? 'bg-teal-600/20 border-teal-500 text-teal-700 dark:bg-teal-900/30 dark:border-teal-400 dark:text-teal-300'
                      : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-teal-400 hover:text-teal-600 dark:hover:text-teal-300'
                  }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map((item, i) => (
                <figure key={i} className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition">
                <img src={item.src} alt={item.alt} className="w-full h-full object-cover saturate-[.9]" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 opacity-0 hover:opacity-100 transition" />
              </figure>
            ))}
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

