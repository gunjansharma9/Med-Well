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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -50 },
  };

  const fetchReports = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/reports`, {
        headers: { token }
      });
      setReports(data?.reports || []);
    } catch (error) {
      toast.error('Failed to load reports');
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.warn('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const { data } = await axios.post(
        `${backendUrl}/api/user/upload-report`,
        formData,
        { headers: { token,
          'Content-Type':'multipart/form-data'
         } }
      );

      setReports(prev => [data.report, ...prev]);
      toast.success('🚀 Upload successful!');
      setFile(null);
      if(fileInputRef.current){
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload failed');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (public_id) => {
    try {
      await axios.delete(`${backendUrl}/api/user/reports/${public_id}`, 
        { headers: { token } }
      );
      setReports(prev => prev.filter(r => r.public_id !== public_id));
      toast.success('🗑 Report deleted');
    } catch (error) {
      toast.error('Delete failed');
      console.error('Delete error:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
          className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FiUploadCloud className="w-8 h-8 text-blue-600" />
            Upload Medical Report
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-blue-200 rounded-xl cursor-pointer hover:border-blue-400 transition-colors duration-300">
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  accept=".pdf,.jpg,.jpeg,.png"
                  ref={fileInputRef}
                  className="hidden"
                />
                <div className="text-center">
                  <FiArrowUpCircle className="w-10 h-10 text-blue-400 mb-2" />
                  <p className="text-gray-600">
                    {file ? file.name : 'Drag & drop or click to select'}
                  </p>
                  {file && <p className="text-sm text-gray-500 mt-1">{Math.round(file.size/1024)} KB</p>}
                </div>
              </label>
            </div>

            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
            >
              {uploading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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

        {/* Reports List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <FiFile className="w-7 h-7 text-indigo-600" />
            Your Medical Reports
          </h3>

          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-100 h-16 rounded-xl" />
              ))}
            </div>
          ) : (
            <AnimatePresence>
              {reports.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  {reports.map((report) => (
                    <motion.div
                      key={report?.public_id}
                      variants={itemVariants}
                      exit="exit"
                      className="group flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors duration-300"
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <FiFile className="w-6 h-6 text-blue-500 flex-shrink-0" />
                        <div className="min-w-0">
                          <a
                            href={report?.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 font-medium truncate"
                          >
                            {report?.originalname || 'Unnamed Report'}
                          </a>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                            <FiClock className="w-4 h-4" />
                            <span>{formatDate(report?.uploadedAt)}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(report?.public_id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-300"
                        title="Delete report"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">No reports found</div>
                  <p className="text-gray-500">Upload your first medical report above</p>
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