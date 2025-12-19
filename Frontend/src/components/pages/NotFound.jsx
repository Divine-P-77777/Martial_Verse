
import { Link } from "react-router-dom";
import SEO from "../common/SEO";
export default function NotFound() {
  return (
    <>
      <SEO
        title="404 Not Found - Martial Verse"
        description="The page you are looking for does not exist."
        keywords="404, not found, error"
        image="/logo.png"
        url={`${window.location.origin}/404`}
      />

      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-[#1a1a1a] text-white pt-10">
        <img src="/panda.gif" className="w-[300px] h-[300px] rounded-2xl overflow-hidden mb-4" alt="" />
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-6">Oops! Page not found.</p>
      <Link to="/" className="text-yellow-400 hover:underline bg-black rounded-2xl w-fit px-6 py-2">
        Go back home
      </Link>
    </div>
    </>
  );
}
