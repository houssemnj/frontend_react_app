import React, { useState, forwardRef, useImperativeHandle , useRef} from 'react';
import axios from 'axios';
import FormData from "form-data";
import "./App.css";




const CreatePipelineForm = forwardRef(({ projectUrl , jenkinsUrl , jenkinsUsername , sonar_url , branchName ,credentialsId }, ref) => {
    const [response, setResponse] = useState(null);
    // const [projectUrl, setProjectUrl] = useState('');
    // const [sonar_url, setSonarUrl] = useState('');
    // const [jenkinsUrl, setJenkinsUrl] = useState('');
    // const [jenkinsUsername, setJenkinsUsername] = useState('');
    // const [branchName, setBranchName] = useState('');
    // const [credentialsId, setCredentialsId] = useState(''); 
  
      const handleSubmit = async (event) => {
      
        const apiUrl = import.meta.env.VITE_APP_API_URL;
  
        let data = new FormData();
        data.append('project_url', projectUrl);
        data.append('sonar_url', sonar_url);
        data.append('jenkins_url', jenkinsUrl);
        data.append('jenkins_username', jenkinsUsername);
        data.append('branchName', branchName);
        data.append('credentialsId', credentialsId);
  
      let config = {
        method: 'post',
        url: `${apiUrl}create_pipelinee`,
        headers: { 
          'Content-Type': 'multipart/form-data'
        },
        data : data
      };
  
      try {
        const response = await axios(config);
        setResponse(JSON.stringify(response.data));
      } catch (error) {
        console.log(error);
      }
    };
  
    useImperativeHandle(ref, () => ({
      handleSubmit
    }));
  
    return (
      <header>
      <form onSubmit={handleSubmit}>
        {/* <label>
          URL:
          <input type="text" value={projectUrl} onChange={e => setProjectUrl(e.target.value)} />
        </label> */}
        {/* <label>
          Sonar URL:
          <input type="text" value={sonar_url} onChange={e => setSonarUrl(e.target.value)} />
        </label> */}
        {/* <label>
          Jenkins URL:
          <input type="text" value={jenkinsUrl} onChange={e => setJenkinsUrl(e.target.value)} />
        </label> */}
        {/* <label>
          Jenkins Username:
          <input type="text" value={jenkinsUsername} onChange={e => setJenkinsUsername(e.target.value)} />
        </label> */}
        {/* <label>
          Branch Name:
          <input type="text" value={branchName} onChange={e => setBranchName(e.target.value)} />
        </label>
        <br></br>
        <label>
          Credentials ID:
          <input type="text" value={credentialsId} onChange={e => setCredentialsId(e.target.value)} />
        </label> */}
        
      </form>
      <h4><pre>{response}</pre></h4>
    </header>
  );
  });

  export default CreatePipelineForm ;