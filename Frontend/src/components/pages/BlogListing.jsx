import { useEffect, useState, useTransition } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../common/SEO'

const BlogList = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const bg = isDarkMode ? '#0d0d0d' : '#f5f5f5';
  const text = isDarkMode ? '#f9f9f9' : '#1a1a1a';
  const cardBg = isDarkMode ? '#1b1b1b' : '#ffffff';

  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // ✅ Transition state
  const [isPending, startTransition] = useTransition();

  const categories = ['All', 'Philosophy', 'Training', 'Culture', 'Technique', 'History'];

  const goToPage = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const API_URL =
          import.meta.env.MODE === 'production'
            ? import.meta.env.VITE_API_URL
            : 'http://localhost:5000';

        const res = await fetch(`${API_URL}/admin/upload`);
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  // ✅ Filtered blogs
  const filteredBlogs =
    selectedCategory === 'All'
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

  const blogsPerPage = 6;
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const currentBlogs = filteredBlogs.slice((page - 1) * blogsPerPage, page * blogsPerPage);

  return (
    <>
      <SEO
        title="Blogs - Martial Verse"
        description="Explore a variety of blogs on martial arts, philosophy, and training."
        keywords="martial arts, blogs, philosophy, training"
        image="/logo.png"
        url={`${window.location.origin}/blogs`}
      />
      
      <div
        className="min-h-screen pt-30 px-4 md:px-12 py-10 overflow-x-hidden"
        style={{ background: bg, color: text }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Explore Our Martial Blogs
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter Panel */}
          <aside className="md:w-1/4 flex-shrink-0">
            <div className="space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    startTransition(() => {  // ✅ defer expensive filter updates
                      setSelectedCategory(cat);
                      setPage(1);
                    });
                  }}
                  className={`block w-full text-left px-4 py-2 rounded-lg font-medium transition-all ${selectedCategory === cat
                      ? 'bg-yellow-400 text-black'
                      : 'hover:bg-gray-200/10'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </aside>

          {/* Blog Grid */}
          <main className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isPending ? (
              <div className="col-span-full text-center py-10 text-gray-500">
                Loading filtered blogs...
              </div>
            ) : (
              currentBlogs.map((blog, i) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="rounded-xl overflow-hidden shadow-lg border border-gray-300 hover:shadow-xl hover:scale-[1.03] transition-all duration-300"
                  style={{ background: cardBg }}
                >
                  {blog.sections[0]?.imageUrl && (
                    <img
                      src={blog.sections[0].imageUrl}
                      alt={blog.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <span className="text-xs uppercase text-yellow-500 font-semibold tracking-widest">
                      {blog.category}
                    </span>
                    <h2 className="text-lg font-bold mt-2 mb-1 line-clamp-2">
                      {blog.title}
                    </h2>
                    <p className="text-sm line-clamp-3 text-gray-400 mb-3">
                      {blog.sections[0]?.description?.substring(0, 120) + '...'}
                    </p>
                    <Link
                      to={`/blogs/${blog._id}`}
                      className="bg-red-400 text-black w-fit rounded-2xl px-3 py-2 hover:bg-amber-300 text-sm font-medium"
                    >
                      Read More →
                    </Link>
                  </div>
                </motion.div>
              ))
            )}
          </main>
        </div>

        {/* Pagination */}
        <div className="mt-10 flex justify-center items-center gap-4">
          <button
            onClick={() => {
              startTransition(() => setPage((prev) => Math.max(prev - 1, 1)));
            }}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg border text-sm hover:bg-gray-300/10 disabled:opacity-50"
          >
            ← Previous
          </button>
          <span className="text-sm">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => {
              startTransition(() => setPage((prev) => Math.min(prev + 1, totalPages)));
            }}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg border text-sm hover:bg-gray-300/10 disabled:opacity-50"
          >
            Next →
          </button>
        </div>
      </div>
    </>

  );
};

export default BlogList;
