import { Outlet, Link, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { axiosInstance } from '../lib/axios';

const ProjectLayout = ({ children }) => {
  const { projectId } = useParams();
  const location = useLocation();
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
    { name: 'Overview', path: '' },
    { name: 'Tasks', path: 'tasks' },
    { name: 'Team', path: 'team' },
    { name: 'Files', path: 'files' },
    { name: 'Discussion', path: 'discussion' }
  ];

  const isActiveRoute = (itemPath) => {
    const currentPath = location.pathname.split('/').pop();
    if (itemPath === '' && (currentPath === projectId || location.pathname === `/projects/${projectId}`)) {
      return true;
    }
    return currentPath === itemPath;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold truncate">{project?.title}</h2>
          <p className="text-sm text-gray-500 truncate">{project?.status}</p>
        </div>
        <nav className="p-2">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={`/projects/${projectId}/${item.path}`}
                  className={`block px-4 py-2 rounded ${
                    isActiveRoute(item.path)
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        {children}
      </div>
    </div>
  );
};

export default ProjectLayout;