import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import SEO from './SEO';

const Privacy = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const bg = isDarkMode ? '#0d0d0d' : '#f5f5f5';
  const text = isDarkMode ? '#f9f9f9' : '#1a1a1a';
  const cardBg = isDarkMode ? '#1b1b1b' : '#ffffff';

  const sections = [
    {
      title: 'Data Collection',
      content:
        'We only collect information you voluntarily provide, such as email, name, and social links when requesting admin access or posting content.',
    },
    {
      title: 'Use of Information',
      content:
        'Your data is used solely for content management and access control. We do not sell or share your data with third parties.',
    },
    {
      title: 'Embedded Content',
      content:
        'We embed YouTube videos and playlists for educational purposes. All content is used under YouTube’s standard embed policy.',
    },
    {
      title: 'Security',
      content:
        'We use Auth0 to securely manage user authentication. Your information is protected with industry-standard practices.',
    },
    {
      title: 'Your Rights',
      content:
        'You can request the removal of your data or account access at any time by contacting the site administrator.',
    },
  ];

  return (
    <>
      <SEO
        title="Privacy Policy - Martial Verse"
        description="Learn about our privacy practices and how we protect your data."
        keywords="privacy, data protection, user rights"
        image="/logo.png"
        url={`${window.location.origin}/privacy`}
      />

      <div className="min-h-screen pt-30 px-4 md:px-12 py-10" style={{ background: bg, color: text }}>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Privacy Policy</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-xl overflow-hidden shadow-lg border border-gray-300 hover:shadow-xl transition-all duration-300"
              style={{ background: cardBg }}
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-yellow-400">{section.title}</h2>
                <p className="text-sm text-gray-400">{section.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Privacy;
