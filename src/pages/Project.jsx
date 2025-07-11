import { Routes, Route } from 'react-router-dom';
import ProjectLayout from '../components/ProjectLayout';
import Dashboard from './project/Dashboard';

const Project = () => {
  return (
    <ProjectLayout>
      <Routes>
        <Route path="" element={<Dashboard />} />
        <Route path="tasks" element={<div>Tasks Component</div>} />
        <Route path="team" element={<div>Team Component</div>} />
        <Route path="files" element={<div>Files Component</div>} />
        <Route path="discussion" element={<div>Discussion Component</div>} />
      </Routes>
    </ProjectLayout>
  );
};

export default Project;