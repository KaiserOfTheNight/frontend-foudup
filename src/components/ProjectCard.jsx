import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

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
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-all duration-200 hover:shadow-lg">
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
                          className={`px-2 py-0.5 text-xs rounded-full font-medium ${roleColors[role] || 'bg-gray-200'}`}
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

export default ProjectCard;