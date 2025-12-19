
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import SEO from '../common/SEO';
const AccessRequest = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const bg = isDarkMode ? '#121212' : '#f7f7f7';
  const cardBg = isDarkMode ? '#1e1e1e' : '#ffffff';
  const textColor = isDarkMode ? '#e0e0e0' : '#1a1a1a';
  const border = isDarkMode ? 'border-gray-700' : 'border-gray-300';

  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    country: '',
    state: '',
    profession: '',
    phone: '',
    socialLink: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
            const API_URL =
  import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_API_URL 
    : 'http://localhost:5000'; 

      const res = await fetch(`${API_URL}/api/access`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Request Admin Access - Martial Verse"
        description="Request admin access to the Martial Verse platform."
        keywords="admin access, request"
        image="/logo.png"
        url={`${window.location.origin}/access-request`}
      />
      <div className="min-h-screen py-16 px-6 md:px-16" style={{ background: bg, color: textColor }}>
        <div className="max-w-3xl mx-auto bg-opacity-90 p-8 rounded-2xl shadow-xl" style={{ background: cardBg }}>
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-red-600 uppercase tracking-widest text-center">
            Request Admin Access
          </h1>

        {success ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-yellow-500 rounded-xl p-4 text-yellow-400 text-center bg-yellow-500/10"
          >
            ✉️ Your request has been received. We’ll get back to you soon.
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { name: 'email', label: 'Email', type: 'email', required: true },
              { name: 'fullName', label: 'Full Name', type: 'text', required: true },
              { name: 'country', label: 'Country', type: 'text', required: true },
              { name: 'state', label: 'State', type: 'text', required: true },
              { name: 'profession', label: 'Profession', type: 'text', required: true },
              { name: 'phone', label: 'Phone', type: 'tel' },
              { name: 'socialLink', label: 'Social Link', type: 'url', required: true },
            ].map(({ name, label, type, required }) => (
              <div key={name}>
                <label
                  htmlFor={name}
                  className="block uppercase text-yellow-400 font-medium text-sm mb-1 tracking-wide"
                >
                  {label}{required ? ' *' : ''}
                </label>
                <input
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                  required={required}
                  className={`w-full bg-transparent border ${border} rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-yellow-400 transition-all text-white placeholder:text-gray-500`}
                  placeholder={label}
                />
              </div>
            ))}

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-500/10 text-red-500 text-sm rounded-xl px-4 py-3 border border-red-500"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-xl transition flex items-center justify-center gap-2"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send Request'}
            </button>
          </form>
        )}
      </div>
    </div>
    </>
  );
};

export default AccessRequest;
