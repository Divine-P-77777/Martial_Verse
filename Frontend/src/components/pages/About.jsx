import { useSelector } from 'react-redux';
import SEO from '../common/SEO';
const About = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const bg = isDarkMode ? '#0e0e0e' : '#f7f7f7';
  const text = isDarkMode ? '#f5f5f5' : '#1a1a1a';
  const linkColor = isDarkMode ? '#facc15' : '#c53030';

  return (
    <>
      <SEO
        title="About - Martial Verse"
        description="Learn more about the creator of Martial Verse."
        keywords="about, creator, martial arts"
        image="/logo.png"
        url={`${window.location.origin}/about`}
      />
    
    <div
      className="min-h-screen w-full py-20 px-6 md:px-16 font-sans"
      style={{ background: bg, color: text }}
    >
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-yellow-400 font-serif">
          🥋 About the Creator
        </h1>
        <p className="text-lg md:text-xl leading-relaxed mb-8">
          Welcome to MartialVerse — a sanctuary for warriors, dreamers, and those who live by the
          timeless values of discipline, honor, and spirit. This digital dojo was built with a
          singular vision: to honor and modernize the stories, techniques, and philosophies of
          martial arts cultures from around the world.
        </p>
        <p className="text-base md:text-lg leading-relaxed mb-6">
          My name is <span className="font-semibold">[Your Name]</span>, a creator passionate about both
          frontend development and the subtle art of combat wisdom. With a background in coding and
          a deep respect for martial philosophy, this project represents a merging of two paths:
          creativity and tradition.
        </p>
        <p className="text-base md:text-lg leading-relaxed mb-10">
          Whether you're a black belt or a curious beginner, I invite you to explore the curated
          content, share your thoughts, and help grow a respectful global martial community.
        </p>

        <a
          To="https://dynamicphillic.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-lg font-semibold hover:underline transition-all "
          style={{ color: linkColor }}
        >
        <span className='text-red-400'>🔗 Visit My Portfolio</span>  
        </a>
      </div>
    </div>
    </>
  );
};

export default About;
