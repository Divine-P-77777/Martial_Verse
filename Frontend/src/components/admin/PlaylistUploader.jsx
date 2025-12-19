import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const PlaylistUploader = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    contentType: "",
    uploadBy: "",
  });
  const [data, setData] = useState([]);
  const [buttonStatus, setButtonStatus] = useState("submit");
  const [editId, setEditId] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const API_URL =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_API_URL
      : "http://localhost:5000";

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (buttonStatus === "submit") {
        // Create new playlist
        const response = await fetch(`${API_URL}/api/playlist`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (response.ok) {
          alert("Form Successfully Submitted");
          setData((prev) => [...prev, result]);
          setFormData({
            title: "",
            description: "",
            url: "",
            contentType: "",
            uploadBy: "",
          });
        } else {
          alert(result.message);
        }
      } else if (buttonStatus === "update") {
        // Update existing playlist
        const response = await axios.patch(
          `${API_URL}/api/playlist/${editId}`,
          formData
        );

        alert("Updated Successfully");
        setData((prev) =>
          prev.map((item) =>
            item._id === editId ? { ...item, ...formData } : item
          )
        );
        setButtonStatus("submit");
        setEditId(null);
        setFormData({
          title: "",
          description: "",
          url: "",
          contentType: "",
          uploadBy: "",
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${API_URL}/api/playlist`);
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this playlist? This action cannot be undone."
    );
    if (!confirmed) return;
    try {
      await axios.delete(`${API_URL}/api/playlist/${id}`);
      alert("Deleted Successfully");
      setData((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = (item) => {
    setButtonStatus("update");
    setEditId(item._id);
    setFormData({
      title: item.title,
      description: item.description,
      url: item.url,
      contentType: item.contentType,
      uploadBy: item.uploadBy,
    });
  };

  const cancelButton = () => {
    setButtonStatus("submit");
    setEditId(null);
    setFormData({
      title: "",
      description: "",
      url: "",
      contentType: "",
      uploadBy: "",
    });
  };

  return (
    <main
      className={`min-h-screen pt-20 flex flex-col items-center ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">🎶 Playlist Uploader</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col gap-4 p-6 rounded-2xl shadow-lg w-full max-w-lg ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <input
          value={formData.title}
          onChange={handleChange}
          className="border p-3 rounded-xl focus:ring-2 focus:ring-red-400 outline-none"
          type="text"
          placeholder="Enter title"
          name="title"
        />
        <input
          value={formData.uploadBy}
          onChange={handleChange}
          className="border p-3 rounded-xl focus:ring-2 focus:ring-red-400 outline-none"
          type="text"
          placeholder="Enter your name"
          name="uploadBy"
        />
        <textarea
          value={formData.description}
          onChange={handleChange}
          className="border p-3 rounded-xl focus:ring-2 focus:ring-red-400 outline-none resize-none"
          rows="3"
          placeholder="Write description"
          name="description"
        />
        <input
          value={formData.url}
          onChange={handleChange}
          className="border p-3 rounded-xl focus:ring-2 focus:ring-red-400 outline-none"
          type="text"
          placeholder="Enter playlist URL"
          name="url"
        />
        <select
          value={formData.contentType}
          onChange={handleChange}
          className={`border p-3 rounded-xl ${
            isDarkMode
              ? "bg-gray-700 text-white"
              : "bg-gray-100 text-gray-900"
          } focus:ring-2 focus:ring-red-400 outline-none`}
          name="contentType"
        >
          <option value="playlist">Playlist</option>
          <option value="shortvideo">Short Video</option>
          <option value="oneshot">One Shot</option>
        </select>

        <div className="flex gap-3">
          <input
            type="submit"
            value={buttonStatus === "submit" ? "Submit" : "Update"}
            className="bg-red-500 hover:bg-red-600 transition text-white px-5 py-3 rounded-xl cursor-pointer"
          />
          {buttonStatus === "update" && (
            <button
              onClick={cancelButton}
              type="button"
              className="bg-yellow-400 hover:bg-yellow-500 transition text-white px-5 py-3 rounded-xl"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Table */}
      <div className="w-full max-w-4xl mt-10 overflow-x-auto">
        <table
          className={`w-full border-collapse rounded-2xl shadow-md ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <thead>
            <tr className={isDarkMode ? "bg-gray-700" : "bg-gray-200"}>
              <th className="p-3">Title</th>
              <th className="p-3">Description</th>
              <th className="p-3">URL</th>
              <th className="p-3">Content</th>
              <th className="p-3">Upload By</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr
                  key={item._id}
                  className={`border-t transition ${
                    isDarkMode
                      ? "hover:bg-gray-700"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <td className="p-3">{item.title}</td>
                  <td className="p-3">{item.description}</td>
                  <td className="p-3 text-blue-500 underline cursor-pointer">
                    {item.url}
                  </td>
                  <td className="p-3">{item.contentType}</td>
                  <td className="p-3">{item.uploadBy}</td>
                  <td className="p-3 flex gap-3">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleUpdate(item)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-5 text-gray-500">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default PlaylistUploader;
