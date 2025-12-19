import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useUser, SignInButton, SignOutButton } from '@clerk/clerk-react';
import { Sparkles } from 'lucide-react';



const AdminDashBoard = () => {
  const { user } = useUser();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <div
      className={`min-h-screen px-6 py-12 flex flex-col items-center justify-center transition-colors duration-500 ${
        isDarkMode
          ? 'bg-[#1F1F1F] text-[#E0E0E0]'
          : 'bg-gradient-to-r from-white via-blue-50 to-white text-gray-700'
      }`}
    >
      {user ? (
        <>
          {/* Greeting & Dashboard */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold flex items-center justify-center gap-2">
              <Sparkles className="w-7 h-7 text-yellow-400 animate-pulse" />
              Welcome Back, <span className="text-amber-500">{user.fullName}</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-xl mx-auto">
              Ready to manage your content like a pro? Head over to your powerful blog upload dashboard now!
            </p>
            <Link
              to="/admin/upload"
              className="inline-block mx-4 mt-6 bg-amber-400 hover:bg-amber-500 text-black font-medium px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
            >
              Upload Blog
            </Link>
            <Link
              to="/admin/access"
              className="inline-block mt-6 bg-amber-400 hover:bg-amber-500 text-black font-medium px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
            >
             Manage Admins
            </Link>
            <div className="mt-6">
              <SignOutButton>
                <button className="bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-600 transition duration-200">
                  Logout
                </button>
              </SignOutButton>
            </div>
          </div>

          {/* Illustration */}
          <div className="mt-12">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/admin-panel-4864291-4051227.png"
              alt="Admin Illustration"
              className="w-[300px] md:w-[400px] drop-shadow-xl rounded-lg"
            />
          </div>
        </>
      ) : (
        // If not logged in
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-4">Please Log In to Access Admin Dashboard</h1>
          <SignInButton>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300">
              Login
            </button>
          </SignInButton>
        </div>
      )}
    </div>
  );
};

export default AdminDashBoard;
