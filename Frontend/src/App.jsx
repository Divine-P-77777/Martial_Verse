import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import  { Suspense, lazy } from 'react';

// Common components that should always load immediately
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import AdminProtectedRoute from './components/common/AdminProtectedRoute';
import useLenis from './hooks/useLenis';
import { newtonsCradle } from 'ldrs'
newtonsCradle.register()

// Lazy-loaded pages (code splitting happens here)
const Home = lazy(() => import("./components/pages/Home"));
const NotFound = lazy(() => import("./components/pages/NotFound"));
const BlogDetail = lazy(() => import("./components/pages/BlogDetail"));
const BlogListing = lazy(() => import("./components/pages/BlogListing"));
const Login = lazy(() => import("./components/common/Login"));
const About = lazy(() => import('./components/pages/About'));
const Contact = lazy(() => import('./components/pages/Contact'));
const AccessRequest = lazy(() => import("./components/pages/AccessRequest"));

const AdminDashBoard = lazy(() => import('./components/admin/AdminDashBoard'));
const AdminRequestTable = lazy(() => import("./components/admin/AdminRequestTable"));
const BlogUpload = lazy(() => import("./components/admin/Blog/blogUpload"));
const PlaylistUploader = lazy(() => import("./components/admin/PlaylistUploader"));

const Terms = lazy(() => import("./components/common/Terms"));
const Privacy = lazy(() => import("./components/common/Privacy"));
const PlayList = lazy(() => import('./components/pages/PlaylistCarousel'));

function App() {
  const location = useLocation();
  useLenis();

  return (
    <>
      <Navbar showScrollLinks={location.pathname === "/"} />

    
      <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-black">
      <l-newtons-cradle
        size="120"
        speed="1.4"
        color="#f87171" 
      ></l-newtons-cradle>
    </div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/blog" element={<BlogListing />} />
          <Route path="/about" element={<About />} />
          <Route path="/playlists" element={<PlayList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/accessrequest" element={<AccessRequest />} />

          {/* Admin routes */}
          <Route path="/admin/upload" element={
            <AdminProtectedRoute><BlogUpload /></AdminProtectedRoute>
          } />
          <Route path="/admin" element={
            <AdminProtectedRoute><AdminDashBoard /></AdminProtectedRoute>
          } />
          <Route path="/admin/access" element={
            <AdminProtectedRoute><AdminRequestTable /></AdminProtectedRoute>
          } />
          <Route path="/admin/playlist" element={
            <AdminProtectedRoute><PlaylistUploader /></AdminProtectedRoute>
          } />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Footer />
    </>
  );
}

export default App;
