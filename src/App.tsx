import { useState, useEffect, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { Award, Briefcase, GraduationCap, Calendar, ChevronDown, Download, ArrowUp, ArrowDown, Play, Music, Heart, MessageCircle, Trash2, Edit2, X, Check } from 'lucide-react';
import { Footer } from './components/Footer';

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

function App() {
  const [showScroll, setShowScroll] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Guestbook State
  const [messages, setMessages] = useState<Array<{ id: string; name: string; role: string; text: string; date: string; isMine?: boolean }>>([]);
  const [gbName, setGbName] = useState("");
  const [gbRole, setGbRole] = useState("");
  const [gbMessage, setGbMessage] = useState("");
  const [visibleMessages, setVisibleMessages] = useState(3);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const handleGuestbookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gbName.trim() || !gbMessage.trim()) return;

    const newMsg = {
      id: Date.now().toString(),
      name: gbName,
      role: gbRole || "Well-Wisher",
      text: gbMessage,
      date: new Date().toLocaleDateString(),
      isMine: true
    };

    setMessages([newMsg, ...messages]);
    setGbName("");
    setGbRole("");
    setGbMessage("");
  };

  const handleDeleteMessage = (id: string) => {
    setMessages(messages.filter(msg => msg.id !== id));
  };

  const handleStartEdit = (id: string, currentText: string) => {
    setEditingId(id);
    setEditText(currentText);
  };

  const handleSaveEdit = (id: string) => {
    if (!editText.trim()) return;
    setMessages(messages.map(msg => msg.id === id ? { ...msg, text: editText } : msg));
    setEditingId(null);
    setEditText("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollToBottom = () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-900 selection:text-white">
      {/* HERO SECTION */}
      <section className="relative min-h-[75vh] print:min-h-0 flex flex-col items-center justify-center overflow-hidden bg-emerald-900 text-white px-6 py-16 print:py-8">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-200 via-emerald-900 to-emerald-950"></div>

        <motion.div
          className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Ondo State Logo - Top Left */}
          <motion.img
            variants={fadeIn}
            src="/ondo-logo.png"
            alt="Ondo State Logo"
            className="absolute -top-4 md:-top-8 left-0 md:-left-12 w-20 md:w-28 drop-shadow-lg z-20"
          />

          <motion.div variants={fadeIn} className="mb-8 relative">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-amber-500/30 p-2 shadow-2xl shadow-emerald-950/50 relative overflow-hidden group">
              {/* Decorative Ring */}
              <div className="absolute inset-0 rounded-full border border-amber-400 opacity-50 scale-105 transition-transform duration-700 group-hover:scale-100"></div>
              {/* Portrait Image */}
              <div className="w-full h-full rounded-full bg-emerald-800 flex items-center justify-center overflow-hidden relative">
                <img src="/hero.jpg" alt="Mrs. Temitayo Olufunke Ogundare" className="w-full h-full object-cover object-top relative z-10" />
              </div>
            </div>
          </motion.div>

          <motion.p variants={fadeIn} className="text-amber-200/80 uppercase tracking-[0.2em] text-sm md:text-base mb-4 font-medium">
            Official Citation Of
          </motion.p>

          <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight text-white drop-shadow-lg [text-wrap:balance]">
            Mrs. Temitayo Olufunke <span className="text-amber-400">Ogundare</span>
          </motion.h1>

          <motion.h2 variants={fadeIn} className="text-lg md:text-2xl font-light tracking-wide text-amber-100 mb-8 max-w-2xl border-t border-b border-emerald-800/50 py-4">
            Permanent Secretary, Ondo State Civil Service
          </motion.h2>

          <motion.div variants={fadeIn} className="flex gap-4 mb-4 print:hidden">
            <button
              onClick={() => window.print()}
              className="bg-amber-500 hover:bg-amber-400 text-emerald-950 px-6 py-3 rounded-full font-bold transition-colors shadow-lg shadow-amber-500/20 flex items-center gap-2 text-sm md:text-base"
            >
              <Download size={20} /> Download Citation (PDF)
            </button>
          </motion.div>

          <motion.div variants={fadeIn} className="animate-bounce mt-8 text-amber-400/50 absolute bottom-6 print:hidden">
            <ChevronDown size={32} strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </section>

      {/* PERSONAL PROFILE */}
      <section className="py-24 print:py-8 px-6 md:px-12 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-200 to-transparent opacity-50"></div>
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="flex items-center justify-center mb-12">
            <div className="h-px bg-emerald-200 flex-1 max-w-[100px]"></div>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-emerald-900 mx-6 text-center">
              Personal Profile
            </h3>
            <div className="h-px bg-emerald-200 flex-1 max-w-[100px]"></div>
          </motion.div>

          <motion.div variants={fadeIn} className="prose prose-lg md:prose-xl mx-auto text-slate-700 leading-relaxed font-light">
            <p className="first-letter:text-7xl first-letter:font-bold first-letter:text-emerald-900 first-letter:mr-3 first-letter:float-left first-letter:font-serif">
              Born on January 26, 1974, to the family of Mr. & Mrs. Oluwaseun-Apo, Mrs. Tayo Ogundare hails from Idoani in Ose Local Government Area of Ondo State. A very likeable person and an Administrator par excellence, she is a devout Christian, happily married, and blessed with children.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ACADEMIC PROWESS */}
      <section className="py-24 print:py-8 px-6 md:px-12 bg-slate-50 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

        <motion.div
          className="max-w-5xl mx-auto relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="text-center mb-16">
            <span className="text-amber-600 font-semibold tracking-widest uppercase text-sm mb-2 block">Foundation of Excellence</span>
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-emerald-900">Academic Prowess</h3>
          </motion.div>

          <div className="relative border-l-2 border-emerald-200 ml-4 md:ml-8 pl-8 md:pl-12 space-y-12">
            {[
              { title: "Doctor of Philosophy (PhD) in Human Resources and Management", school: "Elizade University", year: "Currently Enrolled", icon: <GraduationCap className="text-amber-600" /> },
              { title: "Master of Science (M.Sc.) in Public Administration", school: "National Open University of Nigeria", year: "2018", icon: <Award className="text-emerald-700" /> },
              { title: "Bachelor of Science (B.Sc.) in Sociology", school: "Ondo State University, Ado-Ekiti", year: "1998", icon: <GraduationCap className="text-emerald-700" /> },
              { title: "WASSCE", school: "Federal Government Girls College, Akure", year: "1991", icon: <Award className="text-slate-500" /> },
              { title: "Primary Six Leaving Certificate", school: "St Peters Demonstration School, Akure", year: "1979 - 1985", icon: <Award className="text-slate-500" /> }
            ].map((edu, index) => (
              <motion.div key={index} variants={fadeIn} whileHover={{ scale: 1.02, x: 5 }} className="relative group cursor-default">
                {/* Timeline Node */}
                <div className="absolute -left-[41px] md:-left-[57px] top-1.5 w-5 h-5 md:w-6 md:h-6 rounded-full bg-white border-4 border-emerald-500 group-hover:border-amber-500 group-hover:scale-125 transition-all duration-300 shadow-sm"></div>

                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-amber-200/50 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                      <h4 className="text-xl md:text-2xl font-serif font-bold text-slate-800 mb-2 group-hover:text-emerald-800 transition-colors">{edu.title}</h4>
                      <p className="text-slate-600 font-medium text-lg flex items-center gap-2">
                        {edu.icon} {edu.school}
                      </p>
                    </div>
                    <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold text-sm whitespace-nowrap self-start border border-emerald-100">
                      {edu.year}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ILLUSTRIOUS CAREER & SERVICE */}
      <section className="py-24 print:py-8 px-6 md:px-12 bg-white relative">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="text-center mb-16">
            <span className="text-amber-600 font-semibold tracking-widest uppercase text-sm mb-2 block">A Legacy of Leadership</span>
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-emerald-900 mb-6">Illustrious Career & Service</h3>
            <p className="max-w-3xl mx-auto text-lg text-slate-600 font-light">
              From an impactful foundation serving the nation to reaching the pinnacle of the Ondo State Civil Service.
            </p>
          </motion.div>

          {/* Career Journey Highlight */}
          <motion.div variants={fadeIn} className="bg-emerald-900 text-white rounded-3xl p-8 md:p-12 shadow-xl mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800 rounded-full mix-blend-screen opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
            <h4 className="text-2xl md:text-3xl font-serif font-bold mb-6 text-amber-200">The Journey Begins</h4>
            <ul className="space-y-4 text-lg text-emerald-50">
              <li className="flex items-start gap-3">
                <Briefcase className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
                <span>Started NYSC service as a Counselor to wives of other ranks Officers at the 32 Artillery Division, Ginginya Barracks, Sokoto State (1998).</span>
              </li>
              <li className="flex items-start gap-3">
                <Briefcase className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
                <span>Employed as a classroom teacher by the Ondo State Teaching Service Commission in 1999.</span>
              </li>
              <li className="flex items-start gap-3">
                <Briefcase className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
                <span>Appointed into the enviable Administrative Officers Cadre of the Ondo State Civil Service in 2001.</span>
              </li>
            </ul>
          </motion.div>

          {/* Key Leadership Roles Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              "Director, Industrial and Labour Relations",
              "Director, Finance and Administration",
              "Director, Personnel Matters",
              "Administrative Secretary"
            ].map((role, index) => (
              <motion.div key={index} variants={fadeIn} whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }} className="bg-slate-50 border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:border-emerald-300 hover:bg-white transition-all text-center flex flex-col items-center justify-center min-h-[160px] group cursor-pointer relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Award className="w-10 h-10 text-emerald-600 mb-4 group-hover:scale-110 group-hover:text-amber-500 transition-all duration-300 relative z-10" />
                <h5 className="font-semibold text-slate-800 text-lg relative z-10">{role}</h5>
              </motion.div>
            ))}
          </div>

          {/* MDAs & Committees */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <motion.div variants={fadeIn} whileHover={{ scale: 1.02, y: -5 }} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:border-emerald-200 transition-all">
              <h4 className="text-xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
                <Award className="text-amber-500" /> Ministries, Departments & Agencies
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Office of Establishments and Training", "Ministry of Health",
                  "Public Private Partnership Agency (Pioneer DFA)", "Cabinet and Special Services Department",
                  "Ministry of Community Development and Cooperative Services", "Ondo State Agribusiness Empowerment Centre",
                  "Teaching Service Commission"
                ].map((mda, i) => (
                  <span key={i} className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 shadow-sm">
                    {mda}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeIn} whileHover={{ scale: 1.02, y: -5 }} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:border-emerald-200 transition-all">
              <h4 className="text-xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
                <Award className="text-amber-500" /> Notable Ad-hoc Committees
              </h4>
              <div className="bg-white border-l-4 border-amber-500 p-6 rounded-r-2xl shadow-sm">
                <p className="text-lg text-slate-700 font-medium">
                  Committee on Agric and Food Security (2024)
                </p>
                <p className="text-slate-500 mt-2">
                  Key contributor to strategic initiatives addressing food security within the state.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* PROFESSIONAL DEVELOPMENT & TRAININGS */}
      <section className="py-24 print:py-8 px-6 md:px-12 bg-slate-900 text-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+CjxjaXJjbGUgY3g9IjQwIiBjeT0iNDAiIHI9IjIiIGZpbGw9IiMzNGQzOTkiIGZpbGwtb3BhY2l0eT0iMC4xNSIvPgo8L3N2Zz4=')] opacity-30"></div>
        <motion.div
          className="max-w-6xl mx-auto relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="text-center mb-16">
            <span className="text-amber-400 font-semibold tracking-widest uppercase text-sm mb-2 block">Continuous Growth</span>
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Professional Development</h3>
            <p className="max-w-2xl mx-auto text-slate-300">A commitment to excellence through continuous learning and international exposure.</p>
          </motion.div>

          <div className="grid grid-cols-1 mb:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Trade Promotion for African Countries", inst: "MTCP & JICA, Kuala Lumpur, Malaysia", date: "Oct 2023" },
              { title: "Participatory Policy Planning Process (PPPP)", inst: "University of Ibadan", date: "May 2023" },
              { title: "Building Capacity for Results Based Management in Transaction Taxes", inst: "Akure", date: "April 2019" },
              { title: "Pension Management and Social Security Schemes", inst: "Michael Imoudu Institute for Labour Studies, Ilorin", date: "April 2014" },
              { title: "Building Effective Harmonious Industrial Relationship", inst: "Historic Dockyard, Chartham, Kent, UK", date: "March 2014" },
              { title: "Modernising the Human Resource Functions", inst: "ASCON, Topo, Badagry", date: "May 2011" },
              { title: "Team Building, Facilitation Skills & Sustainable Livelihood Approach", inst: "Centre for Development Training", date: "July 2009" }
            ].map((training, index) => (
              <motion.div key={index} variants={fadeIn} whileHover={{ scale: 1.03, y: -5 }} whileTap={{ scale: 0.98 }} className="cursor-pointer bg-slate-800/80 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl hover:border-amber-500/50 hover:bg-slate-800 transition-all group hover:shadow-2xl hover:shadow-emerald-900/40 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Calendar className="w-8 h-8 text-emerald-400 mb-4 group-hover:text-amber-400 group-hover:scale-110 transition-all duration-300 relative z-10" />
                <h4 className="text-lg font-bold text-white mb-2 leading-snug relative z-10">{training.title}</h4>
                <p className="text-slate-400 text-sm mb-4">{training.inst}</p>
                <div className="inline-block px-3 py-1 bg-slate-700 text-amber-200 text-xs font-semibold rounded-full">
                  {training.date}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CELEBRANT & FAMILY PHOTO GALLERY */}
      <section className="py-24 print:hidden px-6 md:px-12 bg-white relative overflow-hidden">
        <motion.div
          className="max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="text-center mb-16 relative z-10">
            <span className="text-amber-600 font-semibold tracking-widest uppercase text-sm mb-2 block">Cherished Memories</span>
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-emerald-900 mb-6">Celebrant & Family</h3>
            <p className="max-w-2xl mx-auto text-lg text-slate-600 font-light">
              A collection of beautiful moments shared with loved ones.
            </p>
          </motion.div>

          {/* Marquee Container */}
          <motion.div variants={fadeIn} className="relative w-full max-w-full overflow-hidden flex bg-slate-50 py-12 rounded-[3rem] border border-slate-100 shadow-inner">
            {/* Fade Edges for the Marquee */}
            <div className="absolute left-0 top-0 w-16 md:w-32 h-full bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 w-16 md:w-32 h-full bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>

            <div className="flex w-[200%] animate-scroll gap-6 px-3">
              {/* Duplicate the array to create the infinite loop effect seamlessly. 
                  (6 items x 2 = 12 items scrolling continuously) */}
              {[1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6].map((item, idx) => (
                <div key={idx} className="w-64 md:w-80 shrink-0 aspect-[4/5] bg-white rounded-3xl border border-slate-200 flex flex-col items-center justify-center p-6 text-center group hover:bg-emerald-50 hover:border-emerald-300 transition-all cursor-pointer overflow-hidden relative shadow-md hover:shadow-xl hover:-translate-y-2">
                  <div className="absolute inset-0 bg-emerald-900/0 group-hover:bg-emerald-900/5 transition-colors z-0"></div>
                  <Heart className="w-12 h-12 text-emerald-300 mb-4 group-hover:text-amber-400 group-hover:scale-110 transition-transform duration-500 relative z-10" />
                  <p className="text-emerald-800/80 font-bold font-serif text-lg relative z-10">Photo {item}</p>
                  <p className="text-sm text-slate-500 mt-3 relative z-10 leading-relaxed px-4 opacity-70 group-hover:opacity-100 transition-opacity">Placeholder for celebrant and family photo</p>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* DIGITAL GUESTBOOK */}
      <section className="py-24 print:hidden px-6 md:px-12 bg-slate-50 relative overflow-hidden">
        <div className="absolute -left-40 top-20 w-80 h-80 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        <motion.div
          className="max-w-5xl mx-auto relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="text-center mb-16">
            <span className="text-amber-600 font-semibold tracking-widest uppercase text-sm mb-2 block">Messages of Joy</span>
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-emerald-900 mb-6">Digital Guestbook</h3>
            <p className="max-w-2xl mx-auto text-lg text-slate-600 font-light">
              Leave a congratulatory message or read well-wishes from friends and family.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div variants={fadeIn} className="lg:col-span-1 bg-white p-8 rounded-3xl shadow-lg shadow-emerald-900/5 border border-emerald-100 flex flex-col justify-center h-fit sticky top-8">
              <MessageCircle className="w-12 h-12 text-amber-500 mb-6" />
              <h4 className="text-2xl font-serif font-bold text-emerald-900 mb-4">Sign the Guestbook</h4>
              <form className="space-y-4" onSubmit={handleGuestbookSubmit}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={gbName}
                    onChange={(e) => setGbName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-light"
                    placeholder="E.g. Dr. Olayinka"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Your Title / Relationship</label>
                  <input
                    type="text"
                    value={gbRole}
                    onChange={(e) => setGbRole(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-light"
                    placeholder="E.g. Colleague, Family"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={gbMessage}
                    onChange={(e) => setGbMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all resize-none font-light"
                    placeholder="Write your wishes here..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-900 hover:bg-emerald-800 text-amber-200 hover:text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-emerald-900/20 mt-2 disabled:opacity-50"
                  disabled={!gbName.trim() || !gbMessage.trim()}
                >
                  Submit Message
                </button>
              </form>
            </motion.div>

            <motion.div variants={fadeIn} className="lg:col-span-2 space-y-6">
              {messages.length === 0 ? (
                <div className="bg-white p-12 rounded-3xl border-2 border-dashed border-emerald-200 text-center flex flex-col items-center justify-center h-full min-h-[300px]">
                  <MessageCircle className="w-16 h-16 text-emerald-100 mb-4" />
                  <h4 className="text-xl font-serif text-emerald-900 mb-2">No messages yet</h4>
                  <p className="text-slate-500 font-light max-w-sm">Be the first to sign the guestbook and leave a heartfelt message for Mrs. Ogundare!</p>
                </div>
              ) : (
                <>
                  {messages.slice(0, visibleMessages).map((msg) => (
                    <div key={msg.id} className={`bg-white p-6 md:p-8 rounded-3xl shadow-sm border ${msg.isMine ? 'border-amber-200' : 'border-slate-100'} relative group hover:border-emerald-200 hover:shadow-md transition-all`}>
                      <div className="absolute top-0 right-0 p-4 text-emerald-50">
                        <MessageCircle size={40} className="opacity-50 group-hover:text-emerald-100 transition-colors" />
                      </div>
                      <div className="absolute left-0 top-8 w-1 h-12 bg-emerald-200 rounded-r-md group-hover:bg-amber-400 transition-colors"></div>

                      {editingId === msg.id ? (
                        <div className="relative z-10 mb-6">
                          <textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="w-full bg-slate-50 border border-amber-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all resize-none font-light min-h-[100px]"
                          />
                          <div className="flex gap-2 mt-3 justify-end">
                            <button onClick={handleCancelEdit} className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1">
                              <X size={14} /> Cancel
                            </button>
                            <button onClick={() => handleSaveEdit(msg.id)} disabled={!editText.trim()} className="px-4 py-2 text-sm bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors shadow-sm disabled:opacity-50 flex items-center gap-1">
                              <Check size={14} /> Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-slate-700 font-light text-lg mb-6 leading-relaxed relative z-10">"{msg.text}"</p>
                      )}

                      <div className="flex justify-between items-center text-sm border-t border-slate-100 pt-4 relative z-10 flex-wrap gap-2">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-emerald-900 text-base">{msg.name} {msg.isMine && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full ml-1 font-normal tracking-wide">You</span>}</span>
                          {msg.isMine && editingId !== msg.id && (
                            <div className="flex gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => handleStartEdit(msg.id, msg.text)} className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors" aria-label="Edit message" title="Edit your message">
                                <Edit2 size={14} />
                              </button>
                              <button onClick={() => handleDeleteMessage(msg.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" aria-label="Delete message" title="Delete your message">
                                <Trash2 size={14} />
                              </button>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2 items-center">
                          <span className="text-slate-400 text-xs">{msg.date}</span>
                          <span className="text-amber-700 bg-amber-100/50 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase">{msg.role}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {messages.length > visibleMessages && (
                    <button
                      onClick={() => setVisibleMessages(prev => prev + 3)}
                      className="w-full py-5 text-emerald-700 font-semibold hover:text-emerald-900 transition-colors border-2 border-dashed border-emerald-200 rounded-3xl hover:bg-emerald-50/80 bg-white shadow-sm flex items-center justify-center gap-2"
                    >
                      <ArrowDown size={18} /> Load More Messages ({messages.length - visibleMessages} remaining)
                    </button>
                  )}
                </>
              )}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* VOTE OF THANKS */}
      <section className="py-24 print:hidden px-6 md:px-12 bg-emerald-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent opacity-50"></div>
        <motion.div
          className="max-w-4xl mx-auto text-center relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="mb-10">
            <span className="text-amber-600 font-semibold tracking-widest uppercase text-sm mb-2 block">Appreciation</span>
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-emerald-900 mb-6">Vote of Thanks</h3>
            <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full"></div>
          </motion.div>

          <motion.div variants={fadeIn} className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-100 relative">
            <div className="text-6xl text-amber-200 absolute top-4 left-6 font-serif opacity-50">"</div>
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-light italic relative z-10 pt-4">
              A heartfelt appreciation to all well-wishers, family, friends, colleagues, senior colleagues, and everyone who has taken the time out of their busy schedules to be part of this inauguration party and reception. Your presence, support, and prayers mean the world to me. For those not explicitly mentioned but who have shared in the joy of this milestone, I am profoundly grateful. Thank you all for coming to rejoice with me on this special occasion!
            </p>
            <div className="mt-8 text-right relative z-10">
              <p className="font-semibold text-emerald-900 text-xl font-serif">
                — Mrs. Temitayo Olufunke Ogundare
              </p>
            </div>
            <div className="text-6xl text-amber-200 absolute bottom-0 right-6 font-serif opacity-50 leading-none rotate-180">"</div>
          </motion.div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <Footer />

      {/* FLOATING NAVIGATION & CONTROLS */}
      <div className={`fixed right-6 bottom-6 flex flex-col gap-3 z-50 transition-all duration-300 print:hidden ${showScroll ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        <button
          onClick={scrollToTop}
          className="bg-emerald-900 text-amber-400 p-3 rounded-full shadow-lg hover:bg-emerald-800 hover:text-amber-300 transition-colors border border-emerald-800/50 flex justify-center items-center backdrop-blur-sm"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
        <button
          onClick={scrollToBottom}
          className="bg-emerald-900 text-amber-400 p-3 rounded-full shadow-lg hover:bg-emerald-800 hover:text-amber-300 transition-colors border border-emerald-800/50 flex justify-center items-center backdrop-blur-sm"
          aria-label="Scroll to bottom"
        >
          <ArrowDown size={24} />
        </button>
      </div>

      {/* FLOATING AUDIO CONTROL */}
      <div className="fixed left-6 bottom-6 z-50 print:hidden">
        <button
          onClick={toggleAudio}
          className={`p-4 rounded-full flex justify-center items-center transition-all duration-500 border-2 overflow-hidden relative group ${isPlaying ? 'bg-amber-500 text-emerald-950 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.5)]' : 'bg-emerald-900 text-amber-400 border-emerald-800 shadow-xl hover:bg-emerald-800'}`}
          aria-label="Toggle Background Music"
        >
          <div className="relative z-10 flex items-center justify-center">
            {isPlaying ? (
              <Music size={24} className="animate-pulse" />
            ) : (
              <Play size={24} className="ml-1" />
            )}
          </div>
          {/* Ripple effect when playing */}
          {isPlaying && (
            <div className="absolute inset-0 rounded-full border-2 border-emerald-900/20 animate-ping"></div>
          )}
        </button>
      </div>

      {/* HIDDEN AUDIO ELEMENT */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/background-audio.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default App;
