import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import SEO from '../common/SEO';
import {
  WhatsappShareButton,
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  WhatsappIcon,
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
} from 'react-share';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const bg = isDarkMode ? '#0a0a0a' : '#fffaf6';
  const text = isDarkMode ? '#f0f0f0' : '#1a1a1a';

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const API_URL =
          import.meta.env.MODE === 'production'
            ? import.meta.env.VITE_API_URL
            : 'http://localhost:5000';

        const res = await fetch(`${API_URL}/admin/upload/${id}`);
        if (!res.ok) throw new Error('Failed to fetch blog');
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        console.error('Failed to fetch blog', err);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <p className="text-center py-10">Loading...</p>;

  // Ensure absolute site URL for OG tags
  const SITE_URL =
    import.meta.env.MODE === 'production'
      ? import.meta.env.VITE_SITE_URL
      : 'http://localhost:5173';

  const shareLink = `${SITE_URL}/blog/${id}`;

  const firstSection = blog.sections?.[0] || {};
  const metaDescription = firstSection.description
    ? firstSection.description.replace(/<[^>]+>/g, '').slice(0, 160) + '...'
    : blog.title;

  // Ensure absolute image URL for OG preview
  const absoluteImage = firstSection.imageUrl?.startsWith('http')
    ? firstSection.imageUrl
    : `${SITE_URL}${firstSection.imageUrl || ''}`;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: metaDescription,
          url: shareLink,
        });
      } catch (err) {
        console.error('Error sharing', err);
      }
    } else {
      setIsShareOpen(true);
    }
  };



  return (
    <div
      className="min-h-screen pt-30 px-4 md:px-24 py-12 font-[Inter]"
      style={{ background: bg, color: text }}
    >
      {/* SEO */}
      <SEO
        title={`${blog.title} - Read Now`}
        description={metaDescription}
        keywords={blog.tags?.join(', ')}
        image={absoluteImage}
        url={shareLink}
        type="article"
        author={blog.authorName}
        publishedTime={blog.createdAt}
      />

      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="text-black rounded-2xl px-4 py-2 w-fit bg-red-400 hover:bg-yellow-300 text-sm"
        >
          ← Back to Blogs
        </button>

        <button
          onClick={handleNativeShare}
          className="text-black rounded-2xl px-4 py-2 w-fit bg-green-400 hover:bg-green-600 text-sm"
        >
          Share
        </button>
      </div>

      <article>
        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
          {blog.title}
        </h1>
        <span className="text-xs uppercase tracking-wide text-gray-400">
          {blog.category} — {new Date(blog.createdAt).toLocaleDateString()}
        </span>

        <div className="mt-10 space-y-10">
          {blog.sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="space-y-4"
            >
              <h2 className="text-2xl md:text-3xl font-semibold mb-2">
                {section.subtitle}
              </h2>
              {section.imageUrl && (
                <div
                  className="relative mx-auto"
                  style={{
                    aspectRatio: '16/9',
                    overflow: 'hidden',
                    borderRadius: '0.75rem',
                    maxHeight: '250px',
                  }}
                >
                  <img
                    src={section.imageUrl}
                    alt={section.subtitle}
                    className="w-full h-full object-cover rounded-xl transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                </div>
              )}
              <div
                className={`prose max-w-none text-base md:text-lg leading-loose font-light ${
                  isDarkMode ? 'prose-invert' : ''
                }`}
                dangerouslySetInnerHTML={{ __html: section.description }}
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-sm text-gray-500">
          — Written by{' '}
          {blog.authorLink ? (
            <a
              href={blog.authorLink}
              className="underline hover:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              {blog.authorName}
            </a>
          ) : (
            <span>{blog.authorName}</span>
          )}
        </div>
      </article>

      {/* Share Popup */}
      {isShareOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Share this blog</h3>
            <div className="flex gap-3 mb-4">
              <WhatsappShareButton url={shareLink} title={blog.title}>
                <WhatsappIcon size={40} round />
              </WhatsappShareButton>
              <FacebookShareButton url={shareLink} quote={metaDescription}>
                <FacebookIcon size={40} round />
              </FacebookShareButton>
              <TwitterShareButton url={shareLink} title={blog.title}>
                <TwitterIcon size={40} round />
              </TwitterShareButton>
              <EmailShareButton
                url={shareLink}
                subject={blog.title}
                body={metaDescription}
              >
                <EmailIcon size={40} round />
              </EmailShareButton>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(shareLink);
                alert('Link copied!');
              }}
              className="w-full py-2 bg-gray-200 rounded-lg mb-2"
            >
              Copy Link
            </button>
            <button
              onClick={() => setIsShareOpen(false)}
              className="w-full py-2 bg-red-400 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
