import React, { useState, useRef } from 'react';
import DockerizeForm from './DockerizeForm';
import CreatePipelineForm from './CreatePipelineForm';
import ConsoleOutputForm from './ConsoleOutputForm';

function ParentComponent() {
  const [projectUrl, setProjectUrl] = useState('');
  const proxyFormRef = useRef();
  const DockerizeFormRef = useRef();
  const CreatePipelineFormRef = useRef(); // Replace with your actual ref name

  // Function to handle submission for ProxyForm
  const handleConsoleOutputSubmit = () => {
    ConsoleOutputFormRef.current.handleSubmit(projectUrl);
  };

  // Function to handle submission for AnotherForm
  const handleDockerizeSubmit = () => {
    DockerizeForm.current.handleSubmit(projectUrl);
  };
  
  const handleCreatePipelineSubmit = () => {
    CreatePipelineForm.current.handleSubmit(projectUrl);
  };

  return (
    <div>
      <label>
        Project URL:
        <input
          type="text"
          value={projectUrl}
          onChange={e => setProjectUrl(e.target.value)}
        />
      </label>
      <ConsoleOutputForm ref={proxyFormRef} projectUrl={projectUrl} onSubmit={handleConsoleOutputSubmit} />
      <DockerizeForm ref={DockerizeFormRef} projectUrl={projectUrl} onSubmit={handleDockerizeSubmit} />
      <CreatePipelineForm ref={CreatePipelineFormRef} projectUrl={projectUrl} onSubmit={handleCreatePipelineSubmit} />
      {/* Add buttons or form submission triggers as needed */}
    </div>
  );
}

export default ParentComponent;
