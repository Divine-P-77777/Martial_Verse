import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Search, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../common/SEO';
const YOUTUBE_THUMB = (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
const YOUTUBE_EMBED = (id) => `https://www.youtube.com/embed/${id}`;

const samplePlaylists = [
  {
    title: 'History of Karate',
    videoId: 'lyQcMl3fV5c',
    description: 'Discover the origins of Karate and its philosophy.',
  },
  {
    title: 'Muay Thai: Art of Eight Limbs',
    videoId: 'gyb2iUVY0oQ',
    description: 'A deep dive into the deadly and beautiful martial art of Muay Thai.',
  },  
  {
    title: 'Kung Fu Techniques',
    videoId: 'H71OH6wGVVs',
    description: 'Iconic stances and moves from Chinese martial tradition.',
  },
];

export default function PlaylistSection() {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const bg = isDarkMode ? '#0a0a0a' : '#ffffff';
  const text = isDarkMode ? '#f9f9f9' : '#1a1a1a';
  const cardBg = isDarkMode ? '#1f1f1f' : '#ffffff';

  const filtered = samplePlaylists.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, [search]);

  return (
    <>
      <SEO
        title="Martial Playlist - Martial Verse"
        description="Explore our curated playlists of martial arts videos."
        keywords="martial arts, playlists, video"
        image="/logo.png"
        url={`${window.location.origin}/playlists`}
      />
      <div className="w-full py-14 pt-30 px-6 md:px-12" style={{ background: bg, color: text }}>
        <h1 className='mx-auto flex justify-center items-center text-xl mb-4 sm:text-4xl  '>Martial Playlist</h1>
      <div className="max-w-6xl mx-auto">
        
        <div className="flex items-center gap-4 mb-10 justify-center">
          <Search className="w-5 h-5 opacity-70" />
          <input
            type="text"
            placeholder="Search playlist titles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-md bg-transparent border border-gray-600 focus:outline-none"
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40 min-h-screen">
            <Loader className="animate-spin text-yellow-400 w-6 h-6" />
          </div>
        ) : (
          <div className="space-y-14">
            {filtered.map((item, i) => (
              <div
                key={item.videoId}
                className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="md:w-1/2 space-y-3">
                  <h3 className="text-2xl font-semibold text-yellow-400">{item.title}</h3>
                  <p className="text-base leading-relaxed text-gray-400">{item.description}</p>
                </div>

                <div
                  onClick={() => setSelected(item)}
                  className="md:w-1/2 cursor-pointer hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={YOUTUBE_THUMB(item.videoId)}
                    alt={item.title}
                    className="w-full h-[240px] object-cover rounded-xl border border-gray-600"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-[#0f0f0f] max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-4 border-b border-yellow-400">
                <h3 className="text-lg md:text-2xl font-semibold text-yellow-400">{selected.title}</h3>
              </div>
              <div className="aspect-video">
                <iframe
                  src={YOUTUBE_EMBED(selected.videoId)}
                  title={selected.title}
                  className="w-full h-full"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </>
  );
}