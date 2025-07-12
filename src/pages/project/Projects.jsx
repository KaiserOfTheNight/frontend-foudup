import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { axiosInstance } from '../../lib/axios';

const statusColors = {
  planning: 'bg-gray-200 text-gray-800',
  recruiting: 'bg-blue-200 text-blue-800',
  development: 'bg-yellow-200 text-yellow-800',
  testing: 'bg-purple-200 text-purple-800',
  launching: 'bg-green-200 text-green-800',
  completed: 'bg-indigo-200 text-indigo-800'
};

const roleColors = {
  admin: 'bg-red-200 text-red-800',
  developer: 'bg-blue-200 text-blue-800',
  designer: 'bg-green-200 text-green-800',
  manager: 'bg-purple-200 text-purple-800',
  member: 'bg-gray-200 text-gray-800'
};

const ProjectCard = ({ project }) => {
  const [expanded, setExpanded] = useState(false);
  const { user } = useContext(AuthContext);
  
  if (!project) return null;

  const isMyProject = user && project.createdBy._id === user._id;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-all duration-200 hover:shadow-lg w-full">
      {/* Image section - shows placeholder if no image exists */}
      {project.image ? (
        <div className="w-full h-32 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title || 'Project image'} 
            className="w-full h-full object-cover"
          />
        </div>
      ) : null}

      <div className="p-5">
        {/* Title and Status row */}
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold text-gray-800 truncate max-w-[70%]">
            {project.title || 'Untitled Project'}
          </h2>
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColors[project.status] || 'bg-gray-200'}`}>
            {project.status?.toUpperCase()}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {project.description || 'No description available'}
        </p>

        {/* Category and Team Size row */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-gray-700">
            Category : {project.category || 'Uncategorized'}
          </span>
          <span className="text-sm text-gray-500">
            Team size : {project.members?.length || 0}/{project.teamSize || '∞'}
          </span>
        </div>

        {/* Created By and Visit Room */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-600">
           Created By: <span className="font-medium">@{project.createdBy?.username || 'Unknown'}</span>
          </span>
          {isMyProject && (
            <Link 
              to={`/projects/${project._id}`}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800"
            >
              VISIT ROOM →
            </Link>
          )}
        </div>

        {/* Expand button */}
        <div className="flex justify-center pt-2 border-t border-gray-100">
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label={expanded ? 'Show less' : 'Show more'}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 transform transition-transform ${expanded ? 'rotate-180' : ''}`}
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Expanded content */}
        {expanded && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Team Members</h3>
            <div className="space-y-2">
              {project.members?.map((member, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {member.user?.username || 'Unknown'}
                       {member.roles?.map((role, i) => (
                        <span 
                          key={i} 
                          className={`ml-2 px-2 py-0.5 text-xs rounded-full font-medium ${roleColors[role] || 'bg-gray-200'}`}
                        >
                          {role.toUpperCase()}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.get('/projects');
        
        const projectsData = Array.isArray(response?.data) ? response.data : [];
        setProjects(projectsData);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.');
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded max-w-md">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 text-sm text-red-600 hover:text-red-800"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Explore Projects</h1>
            <p className="mt-2 text-sm text-gray-500">
              Browse through all active projects
            </p>
          </div>
          {user && (
            <Link 
              to="/projects/create" 
              className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Create Project
            </Link>
          )}
        </div>

        {projects.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No projects</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new project.
            </p>
            {user && (
              <div className="mt-6">
                <Link
                  to="/projects/create"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  New Project
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;