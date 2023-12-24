import React from 'react';
import resumeData from '../constants/ResumeData';

export default function resume() {
  return (
    <div className="resume-container">
      <h2 className="res-title">resume</h2>
      <div className='flex justify-between items-start'>
        <div className='resume-section'>Section1</div>
        <div className="resume-list">
          {resumeData.map((resume) => (
            <ResumeSection
              key={resume.title}
              title={resume.title}
              description={resume.description}
              period={resume.period}
            />
          ))}
        </div>
      </div>
      
    </div>
  );
}

interface resumeSectionProps {
  title: string;
  description: string;
  period: string;
}

const ResumeSection: React.FC<resumeSectionProps> = ({ title, description, period }) => {
  return (
    <div className="resume-section">
      <div className="resume-content">
        <h3 className="resume-title">{title}</h3>
        <p className="resume-description">{description}</p>
        <p>{period}</p>
      </div>
    </div>
  );
};
