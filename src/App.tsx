import { motion } from 'framer-motion';
import { Award, Briefcase, GraduationCap, Calendar, ChevronDown } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-900 selection:text-white">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-emerald-900 text-white px-6 py-20">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-200 via-emerald-900 to-emerald-950"></div>

        <motion.div
          className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
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

          <motion.h2 variants={fadeIn} className="text-lg md:text-2xl font-light tracking-wide text-amber-100 mb-12 max-w-2xl border-t border-b border-emerald-800/50 py-4">
            Permanent Secretary, Ondo State Civil Service
          </motion.h2>

          <motion.div variants={fadeIn} className="animate-bounce mt-8 text-amber-400/50 absolute bottom-10">
            <ChevronDown size={32} strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </section>

      {/* PERSONAL PROFILE */}
      <section className="py-24 px-6 md:px-12 bg-white relative">
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
      <section className="py-24 px-6 md:px-12 bg-slate-50 relative overflow-hidden">
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
      <section className="py-24 px-6 md:px-12 bg-white relative">
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
      <section className="py-24 px-6 md:px-12 bg-slate-900 text-slate-50 relative overflow-hidden">
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

      {/* FOOTER */}
      <footer className="bg-emerald-950 text-emerald-50 py-12 px-6 text-center border-t-4 border-amber-600">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="w-16 h-1 bg-amber-500 mb-8"></div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">Mrs. Temitayo Olufunke Ogundare</h2>
          <p className="text-amber-200/80 mb-8 uppercase tracking-widest text-sm">Permanent Secretary, Ondo State Civil Service</p>
          <p className="text-emerald-200/80 font-light italic text-lg max-w-2xl">
            "Celebrating a legacy of excellence, dedication, and impactful service to Ondo State."
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
