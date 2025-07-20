import React, { useState } from 'react';

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Intégrer EmailJS ou autre service
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} className="glass-effect-premium space-y-4 max-w-md mx-auto p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 gradient-text-premium text-center">Formulaire de contact</h2>
      <input
        type="text"
        name="name"
        placeholder="Nom"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/80 dark:bg-gray-800/80"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/80 dark:bg-gray-800/80"
      />
      <textarea
        name="message"
        placeholder="Message"
        value={form.message}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/80 dark:bg-gray-800/80"
      />
      <button type="submit" className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition w-full">
        Envoyer
      </button>
      {submitted && <p className="text-green-600 text-center">Message envoyé !</p>}
      {/* Styles premium */}
      <style>{`
        .glass-effect-premium {
          background: rgba(255,255,255,0.25);
          box-shadow: 0 8px 32px 0 rgba(251,191,36,0.15);
          backdrop-filter: blur(16px);
          border: 1.5px solid rgba(255,255,255,0.18);
        }
        .gradient-text-premium {
          background: linear-gradient(90deg, #60a5fa 0%, #fbbf24 50%, #f472b6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .animate-fade-in {
          animation: fadeInContactForm 0.5s;
        }
        @keyframes fadeInContactForm {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </form>
  );
};

export default ContactForm; 