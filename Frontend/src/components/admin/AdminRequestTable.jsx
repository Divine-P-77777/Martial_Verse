import { useEffect, useState, useCallback } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const SUPER_ADMIN_EMAIL = process.env.VITE_SUPER_ADMIN_EMAIL ;

const AdminRequestTable = () => {
  const { getToken, isSignedIn } = useAuth();
  const { user } = useUser();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const bg = isDarkMode ? '#0e0e0e' : '#f7f7f7';
  const text = isDarkMode ? '#f5f5f5' : '#1a1a1a';

  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const requestsPerPage = 5;

  const API_URL =
    import.meta.env.MODE === 'production'
      ? import.meta.env.VITE_API_URL
      : 'http://localhost:5000';

  const fetchRequests = useCallback(async () => {
    if (!isSignedIn || user?.primaryEmailAddress?.emailAddress !== SUPER_ADMIN_EMAIL) return;
    try {
      setLoading(true);
      setErrMsg('');
      const token = await getToken();
      const res = await fetch(`${API_URL}/api/access`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-frontend-secret': import.meta.env.VITE_FRONTEND_SECRET,
          'x-user-email': user?.primaryEmailAddress?.emailAddress || '',
        },
      });

      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        const text = await res.text();
        throw new Error(text || 'Invalid JSON response');
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        setRequests(data);
      } else {
        setErrMsg(data?.error || 'Access denied.');
        setRequests([]);
      }
    } catch (err) {
      console.error('Error fetching requests:', err);
      setErrMsg('Failed to fetch requests. Please try again.');
      setRequests([]);
    } finally {
      setLoading(false);
    }
  }, [API_URL, getToken, isSignedIn, user]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this request?')) return;
    try {
      const token = await getToken();
      await fetch(`${API_URL}/api/access/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-frontend-secret': import.meta.env.VITE_FRONTEND_SECRET,
          'x-user-email': user?.primaryEmailAddress?.emailAddress || '',
          Authorization: `Bearer ${token}`,
        },
      });
      fetchRequests();
    } catch (err) {
      console.error('Error deleting request:', err);
      setErrMsg('Failed to delete request.');
    }
  };

  const currentPageData = requests.slice((page - 1) * requestsPerPage, page * requestsPerPage);

  if (!isSignedIn || user?.primaryEmailAddress?.emailAddress !== SUPER_ADMIN_EMAIL) return null;

  return (
    <div className="p-4 pt-30" style={{ backgroundColor: bg, color: text }}>
      <h2 className="text-2xl font-semibold mb-4">Admin Access Requests</h2>

      {loading ? (
        <p className="text-center text-lg">Loading requests...</p>
      ) : errMsg ? (
        <p className="text-red-500">{errMsg}</p>
      ) : requests.length === 0 ? (
        <p className="text-gray-500">No access requests found.</p>
      ) : (
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-200 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Message</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPageData.map((req) => (
                <tr key={req._id} className="border-t hover:bg-gray-100 dark:hover:bg-gray-700">
                  <td className="px-4 py-2">{req.fullName}</td>
                  <td className="px-4 py-2">{req.email}</td>
                  <td className="px-4 py-2 line-clamp-1">{req.socialLink}</td>
                  <td className="px-4 py-2">
                    <button
                      className="text-blue-600 hover:underline mr-3"
                      onClick={() => setSelectedRequest(req)}
                    >
                      View
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(req._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center gap-4 py-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded"
            >
              Prev
            </button>
            <span className="text-lg font-medium">{page}</span>
            <button
              onClick={() =>
                setPage((prev) =>
                  prev < Math.ceil(requests.length / requestsPerPage) ? prev + 1 : prev
                )
              }
              disabled={page === Math.ceil(requests.length / requestsPerPage)}
              className="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {selectedRequest && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white dark:bg-zinc-900 p-6 rounded-xl w-[90%] max-w-md shadow-lg relative"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <button
              className="absolute top-2 right-2 text-zinc-600 dark:text-zinc-300"
              onClick={() => setSelectedRequest(null)}
            >
              <X />
            </button>
            <h3 className="text-xl font-semibold mb-2">Request Details</h3>
            <p><strong>Name:</strong> {selectedRequest.fullName}</p>
            <p><strong>Email:</strong> {selectedRequest.email}</p>
            <p><strong>Phone:</strong> {selectedRequest.phone || 'N/A'}</p>

            <p className="">Address: {selectedRequest.state},{selectedRequest.country}</p>
            <p className="">Profession : {selectedRequest.profession}</p>
            <p className="">
              Applied On : {new Date(selectedRequest.createdAt).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>


            <div className='flex justify-center items-center gap-3'> <p className="mt-2"><strong>Social Link:</strong></p>


              <a href={selectedRequest.socialLink} target="_blank" rel="noopener noreferrer" className="mt-2 w-fit px-3 py-2 bg-red-400 text-black rounded-2xl">Visit Profile</a>

            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminRequestTable;