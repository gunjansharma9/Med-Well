import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from '../context/AppContext';

const Report = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [file, setFile] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

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
    formData.append('report', file);

    try {
      setUploading(true);
      const { data } = await axios.post(
        `${backendUrl}/api/user/upload-report`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      );

      setReports(prev => [data.report, ...prev]);
      toast.success('Upload successful!');
      setFile(null);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload failed');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (reportId) => {
    try {
      await axios.delete(`${backendUrl}/api/user/report/${reportId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setReports(prev => prev.filter(r => r.public_id !== reportId));
      toast.success('Report deleted');
    } catch (error) {
      toast.error('Delete failed');
      console.error('Delete error:', error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Upload Section */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Upload Medical Report</h2>
        <div className="flex items-center gap-4">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept=".pdf,.jpg,.jpeg,.png"
            className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            {uploading ? 'Uploading...' : 'Upload Report'}
          </button>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Your Medical Reports</h3>
        
        {loading ? (
          <div className="text-center">
            <span className="loading loading-spinner text-primary"></span>
            <p>Loading reports...</p>
          </div>
        ) : reports.length > 0 ? (
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.public_id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <a 
                    href={report.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {report.originalname}
                  </a>
                </div>
                <button
                  onClick={() => handleDelete(report.public_id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            No reports found. Upload your first medical report above.
          </div>
        )}
      </div>
    </div>
  );
};

export default Report;