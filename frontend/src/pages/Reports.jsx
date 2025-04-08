import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiUploadCloud,
  FiTrash2,
  FiFile,
  FiClock,
  FiArrowUpCircle
} from 'react-icons/fi';
import { AppContext } from '../context/AppContext';
import 'react-toastify/dist/ReactToastify.css';

const Report = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [file, setFile] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const animationParent = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const animationChild = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -50 },
  };

  const fetchReports = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/user/reports`, {
        headers: { token }
      });
      setReports(res.data?.reports || []);
    } catch (err) {
      toast.error('Could not retrieve reports');
      console.error('Report fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const uploadReport = async () => {
    if (!file) {
      toast.warn('Select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const res = await axios.post(
        `${backendUrl}/api/user/upload-report`,
        formData,
        {
          headers: {
            token,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setReports(prev => [res.data.report, ...prev]);
      toast.success('Report uploaded successfully!');
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const deleteReport = async (public_id) => {
    try {
      await axios.delete(`${backendUrl}/api/user/reports/${public_id}`, {
        headers: { token }
      });
      setReports(prev => prev.filter(r => r.public_id !== public_id));
      toast.success('Report removed');
    } catch (err) {
      toast.error('Failed to delete');
      console.error('Delete error:', err);
    }
  };

  const formatDate = (dateStr) => {
    const options = {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FiUploadCloud className="w-8 h-8 text-blue-600" />
            Upload Report
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-blue-200 rounded-xl cursor-pointer hover:border-blue-400 transition duration-300">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setFile(e.target.files[0])}
                  ref={fileInputRef}
                  className="hidden"
                />
                <div className="text-center">
                  <FiArrowUpCircle className="w-10 h-10 text-blue-400 mb-2" />
                  <p className="text-gray-600">
                    {file ? file.name : 'Click or drag to upload'}
                  </p>
                  {file && (
                    <p className="text-sm text-gray-500 mt-1">{Math.round(file.size / 1024)} KB</p>
                  )}
                </div>
              </label>
            </div>

            <button
              onClick={uploadReport}
              disabled={!file || uploading}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 transition-all duration-300 flex items-center gap-2"
            >
              {uploading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Uploading...
                </>
              ) : (
                <>
                  <FiArrowUpCircle className="w-5 h-5" />
                  Upload Report
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Report List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <FiFile className="w-7 h-7 text-indigo-600" />
            Uploaded Reports
          </h3>

          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-100 h-16 rounded-xl" />
              ))}
            </div>
          ) : (
            <AnimatePresence>
              {reports.length ? (
                <motion.div
                  variants={animationParent}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  {reports.map((r) => (
                    <motion.div
                      key={r.public_id}
                      variants={animationChild}
                      exit="exit"
                      className="flex justify-between items-center p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors duration-300 group"
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <FiFile className="w-6 h-6 text-blue-500 flex-shrink-0" />
                        <div className="min-w-0">
                          <a
                            href={r.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 font-medium truncate"
                          >
                            {r.originalname || 'Unnamed File'}
                          </a>
                          <div className="text-sm text-gray-500 flex gap-2 items-center mt-1">
                            <FiClock className="w-4 h-4" />
                            <span>{formatDate(r.uploadedAt)}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteReport(r.public_id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-300"
                        title="Remove report"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400 mb-2">No reports uploaded yet</p>
                  <p className="text-gray-500">Start by uploading a file above</p>
                </div>
              )}
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Report;
