import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import SEO from './SEO';
const Terms = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const bg = isDarkMode ? '#0d0d0d' : '#f5f5f5';
  const text = isDarkMode ? '#f9f9f9' : '#1a1a1a';
  const cardBg = isDarkMode ? '#1b1b1b' : '#ffffff';

  const terms = [
    {
      title: 'Acceptance of Terms',
      content:
        'By using this platform, you agree to abide by these terms and all applicable laws and regulations.',
    },
    {
      title: 'User Content',
      content:
        'You are responsible for the accuracy and appropriateness of any content you submit. Admins may moderate or remove content that violates policies.',
    },
    {
      title: 'Admin Access Approval',
      content:
        'Admin access is not granted immediately. Interested users must submit a request. After internal review and verification by the technical team, approved users will receive authenticated access via Clerk.',
    },
    {
      title: 'Technology Stack',
      content:
        'This site uses React for frontend, Express.js for backend, MongoDB for database, and Clerk for secure authentication and role-based access.',
    },
    {
      title: 'Modifications to Terms',
      content:
        'We may update these terms at any time. Continued use of the platform implies acceptance of the latest version.',
    },
    {
      title: 'Account Termination',
      content:
        'We reserve the right to revoke access or delete accounts that breach our content or access policies.',
    },
  ];

  return (
    <>      <SEO
        title="Terms & Conditions - Martial Verse"
        description="Learn about our terms and conditions for using the Martial Verse platform."
        keywords="terms, conditions, user agreement"
        image="/logo.png"
        url={`${window.location.origin}/terms`}
      />

        <div className="min-h-screen pt-30 px-4 md:px-12 py-10" style={{ background: bg, color: text }}>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Terms & Conditions</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {terms.map((term, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="rounded-xl overflow-hidden shadow-lg border border-gray-300 hover:shadow-xl transition-all duration-300"
            style={{ background: cardBg }}
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 text-yellow-400">{term.title}</h2>
              <p className="text-sm text-gray-400">{term.content}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    </>

  );
};

export default Terms;
