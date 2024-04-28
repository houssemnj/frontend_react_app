import React, { useState, forwardRef, useImperativeHandle , useRef} from 'react';
import axios from 'axios';
import FormData from "form-data";
import "./App.css";







const DockerizeForm = React.forwardRef(({ projectUrl,framework,containerPort,deploymentEnvironment }, ref) => {
  const [response, setResponse] = useState(null);
  // const [projectUrl, setProjectUrl] = useState('');
//   const [framework, setFramework] = useState('');
//   const [containerPort, setContainerPort] = useState('');
//   const [deploymentEnvironment, setDeploymentEnvironment] = useState('');

  const handleSubmit = async (event) => {
    //event.preventDefault();
    const apiUrl = import.meta.env.VITE_APP_API_URL;

    let data = new FormData();
    data.append('project_url', projectUrl);
    data.append('framework', framework);
    data.append('container_port', containerPort);
    data.append('deployment_environment', deploymentEnvironment);

    let config = {
      method: 'post',
      url: `${apiUrl}dockerize`,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: data
    };

    try {
      const response = await axios(config);
      setResponse(JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  React.useImperativeHandle(ref, () => ({
    handleSubmit
  }));

  return (
    <header>
      <form onSubmit={handleSubmit}>
        {/* <label>
          Project URL:
          <input type="text" value={projectUrl} onChange={(e) => setProjectUrl(e.target.value)} />
        </label> */}
        {/* <br></br>
        <label>
          Framework:
          <input type="text" value={framework} onChange={(e) => setFramework(e.target.value)} />
        </label>
        <br></br>
        <label>
          Container Port:
          <input type="text" value={containerPort} onChange={(e) => setContainerPort(e.target.value)} />
        </label>
        <br></br>
        <label>
          Deployment Environment:
          <input type="text" value={deploymentEnvironment} onChange={(e) => setDeploymentEnvironment(e.target.value)} />
        </label> */}
        {/* <input type="submit" value="Submit" /> */}
      </form>
      <h4><pre>{response}</pre></h4>
    </header>
  );
});


export default DockerizeForm ;
