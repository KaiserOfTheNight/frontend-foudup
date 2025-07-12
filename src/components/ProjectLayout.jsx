import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { axiosInstance } from '../lib/axios';
import { 
  FiHome, 
  FiCheckSquare, 
  FiUsers, 
  FiFile, 
  FiMessageSquare,
  FiSettings,
  FiArrowLeft
} from 'react-icons/fi';

const ProjectLayout = ({ children }) => {
  const { projectId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axiosInstance.get(`/projects/${projectId}`);
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);

  if (loading) return <div className="p-6">Loading project...</div>;

  const navItems = [
    { name: 'Overview', path: '', icon: <FiHome className="w-5 h-5" /> },
    { name: 'Tasks', path: 'tasks', icon: <FiCheckSquare className="w-5 h-5" /> },
    { name: 'Team', path: 'team', icon: <FiUsers className="w-5 h-5" /> },
    { name: 'Files', path: 'files', icon: <FiFile className="w-5 h-5" /> },
    { name: 'Discussion', path: 'discussion', icon: <FiMessageSquare className="w-5 h-5" /> },
    { name: 'Edit', path: 'edit', icon: <FiSettings className="w-5 h-5" /> }
  ];

  const isActiveRoute = (itemPath) => {
    const currentPath = location.pathname.split('/').pop();
    if (itemPath === '' && (currentPath === projectId || location.pathname === `/projects/${projectId}`)) {
      return true;
    }
    return currentPath === itemPath;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <button 
          onClick={() => navigate('/')}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <FiArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold truncate mx-2">{project?.title}</h1>
        <div className="w-8"></div> {/* Spacer for balance */}
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 md:p-6">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden bg-white border-t border-gray-200 py-2 px-1 overflow-x-auto">
        <div className="flex space-x-1 min-w-max">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={`/projects/${projectId}/${item.path}`}
              className={`flex flex-col items-center p-2 rounded-md min-w-[4rem] ${
                isActiveRoute(item.path)
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="mb-1">{item.icon}</span>
              <span className="text-xs truncate">{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Desktop Sidebar (hidden on mobile) */}
      <div className="hidden md:flex h-screen overflow-hidden bg-gray-50">
        <div className="relative bg-white border-r border-gray-200 w-64 flex-shrink-0 overflow-y-auto">
          {/* Desktop Sidebar Content */}
          <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold truncate">{project?.title}</h2>
              <p className="text-xs text-gray-500 truncate">{project?.status}</p>
            </div>
          </div>
          <nav className="p-2">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={`/projects/${projectId}/${item.path}`}
                    className={`flex items-center px-4 py-3 rounded transition-colors duration-200 ${
                      isActiveRoute(item.path)
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span className="truncate">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
            <button
              onClick={() => navigate('/')}
              className="flex items-center w-full p-2 px-3 rounded-md hover:bg-gray-100 text-gray-700 transition-colors duration-200"
            >
              <FiArrowLeft className="w-5 h-5" />
              <span className="ml-3">Back to Home</span>
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProjectLayout;