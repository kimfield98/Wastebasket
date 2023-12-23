import React from 'react';
import projectsData from '../constants/ProjectsData';

export default function Projects() {
  return (
    <div className="projects-container">
      <h2 className="projects-title">Projects</h2>
      <div className="projects-list">
        {projectsData.map((project) => (
          <ProjectSection
            key={project.title}
            title={project.title}
            description={project.description}
            imageUrl={project.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}

interface ProjectSectionProps {
  title: string;
  description: string;
  imageUrl: string;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="project-section">
      <div className="project-content">
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
      </div>
      <img className="project-image" src={imageUrl} alt={title} />
    </div>
  );
};
