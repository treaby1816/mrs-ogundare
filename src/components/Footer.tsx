import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-50 py-12 px-6 text-center border-t-4 border-amber-600">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <img src="/ondo-logo.jpg" alt="Ondo State Logo" className="w-20 md:w-24 h-auto mb-6 opacity-90 filter drop-shadow-md mix-blend-screen" />
        <div className="w-16 h-1 bg-amber-500 mb-8"></div>
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">Mrs. Temitayo Olufunke Ogundare</h2>
        <p className="text-amber-200/80 mb-8 uppercase tracking-widest text-sm">Permanent Secretary, Ondo State Civil Service</p>
        <p className="text-emerald-200/80 font-light italic text-lg max-w-2xl">
          "Celebrating a legacy of excellence, dedication, and impactful service to Ondo State."
        </p>
      </div>
    </footer>
  );
}
