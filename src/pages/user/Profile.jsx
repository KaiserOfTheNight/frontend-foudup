import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { axiosInstance } from '../../lib/axios';
import { Link } from 'react-router-dom';
import { User, Mail, Edit3, Save, X, ChevronLeft, ChevronRight, FolderOpen, Calendar, Eye, Image, Info } from 'lucide-react';

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const projectsPerPage = 6;

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email
      });
      fetchUserProjects();
    }
  }, [user]);

  const fetchUserProjects = async (page = 1) => {
    setProjectsLoading(true);
    try {
      const response = await axiosInstance.get(`/user/projects?page=${page}&limit=${projectsPerPage}`);
      setProjects(response.data.projects || response.data);
      setTotalPages(response.data.totalPages || Math.ceil((response.data.total || response.data.length) / projectsPerPage));
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setProjectsLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      fetchUserProjects(page);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await axiosInstance.put('/user/profile', formData);
      setUser(response.data);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-center">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Profile Dashboard</h1>
          <p className="text-gray-600">Manage your account and view your projects</p>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Personal Info</h2>
                </div>
                {!editMode && (
                  <button 
                    onClick={() => setEditMode(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                )}
              </div>

              {editMode ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="username" className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                        <User className="w-4 h-4" />
                        <span>Username</span>
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your username"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                        <Mail className="w-4 h-4" />
                        <span>Email</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <X className="w-5 h-5 text-red-500" />
                        <span className="text-red-700 text-sm">{error}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setEditMode(false)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      {loading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          <span>Save</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                      <User className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Username</p>
                        <p className="text-lg font-semibold text-gray-900">{user.username}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                      <Mail className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p className="text-lg font-semibold text-gray-900">{user.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Projects Section */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl flex items-center justify-center">
                    <FolderOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">My Projects</h2>
                    <p className="text-gray-600">Total: {projects.length} projects</p>
                  </div>
                </div>
              </div>

              {projectsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600">Loading projects...</span>
                </div>
              ) : projects.length === 0 ? (
                <div className="text-center py-12">
                  <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-xl font-medium text-gray-500 mb-2">No projects yet</p>
                  <p className="text-gray-400">Start creating your first project to see it here</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(project => (
                      <div key={project._id} className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                        {/* Project Image */}
                        <div className="mb-4">
                          {project.image ? (
                            <div className="relative h-32 w-full rounded-lg overflow-hidden bg-gray-100">
                              <img 
                                src={project.image} 
                                alt={project.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center" style={{display: 'none'}}>
                                <Image className="w-8 h-8 text-white" />
                              </div>
                            </div>
                          ) : (
                            <div className="h-32 w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                              <div className="text-center">
                                <Info className="w-8 h-8 text-white mx-auto mb-2" />
                                <p className="text-white text-sm font-medium">No Image</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Project Info */}
                        <div className="space-y-3">
                          <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{project.title}</h3>
                          
                          <div className="flex items-center space-x-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              project.status === 'completed' ? 'bg-green-100 text-green-800' :
                              project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                              project.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {project.status}
                            </span>
                          </div>

                          {project.createdAt && (
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(project.createdAt)}</span>
                            </div>
                          )}

                          <Link 
                            to={`/projects/${project._id}`}
                            className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-sm font-medium"
                          >
                            <Eye className="w-4 h-4" />
                            <span>View Project</span>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center space-x-2 mt-8">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Previous</span>
                      </button>
                      
                      <div className="flex space-x-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
                              currentPage === page
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                : 'border border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        <span>Next</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}