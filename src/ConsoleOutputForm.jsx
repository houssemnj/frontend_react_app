import React, { useState, forwardRef, useImperativeHandle , useRef} from 'react';
import axios from 'axios';
import FormData from "form-data";
import "./App.css";



const ConsoleOutputForm = forwardRef(({ projectUrl , jenkinsUrl , jenkinsUsername }, ref) => {
    const [consoleOutput, setConsoleOutput] = useState('');
    // const [jenkinsUrl, setJenkinsUrl] = useState('');
    // const [jenkinsUsername, setJenkinsUsername] = useState('');
    // const [projectUrl, setProjectUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [showOutput, setShowOutput] = useState(false); 
    const [intervalId, setIntervalId] = useState(null);
  
    const fetchConsoleOutput = async () => {
  
      const apiUrl = import.meta.env.VITE_APP_API_URL;
  
      let data = new FormData();
      data.append('jenkins_url', jenkinsUrl);
      data.append('jenkins_username', jenkinsUsername);
      data.append('project_url', projectUrl);
  
      let config = {
        method: 'post',
        url: `${apiUrl}get_console_output`,
        headers: { 
          'Content-Type': 'multipart/form-data'
        },
        data: data
      };
  
      try {
        const response = await axios(config);
        setConsoleOutput(response.data);
        setLoading(false);
        clearInterval(intervalId);
      } catch (error) {
        console.error('Error fetching console output:', error);
      }
    };
  
  
    const handleSubmit = (event) => {
      event.preventDefault();
      setLoading(true);
      // Set a new interval
      const newIntervalId = setInterval(fetchConsoleOutput, 1000);
      setIntervalId(newIntervalId);
    };
  
    useImperativeHandle(ref, () => ({
      handleSubmit
    }));
  
    const handleToggleOutput = () => {
      setShowOutput(!showOutput); // Toggle the display of the console output
    };
  
    return (
      <header>
        <form onSubmit={handleSubmit}>
          {/* <label>
            Jenkins URL:
            <input type="text" value={jenkinsUrl} onChange={e => setJenkinsUrl(e.target.value)} />
          </label> */}
          {/* <label>
            Jenkins Username:
            <input type="text" value={jenkinsUsername} onChange={e => setJenkinsUsername(e.target.value)} />
          </label> */}
          {/* <label>
            Project URL:
            <input type="text" value={projectUrl} onChange={e => setProjectUrl(e.target.value)} />
          </label> */}
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Get Console Output'}
          </button>
        </form>
        <br></br>
        <button onClick={handleToggleOutput}>
          {showOutput ? 'Hide Console Output' : 'Show Console Output'}
        </button>
        {loading ? <p>Loading console output...</p> : (showOutput && <h4><pre>{consoleOutput}</pre></h4>)}
      </header>
    );
  });


  export default ConsoleOutputForm ;

// import React, { useState, forwardRef, useImperativeHandle } from 'react';
// import axios from 'axios';
// import FormData from "form-data";
// import "./App.css";

// const ConsoleOutputForm = forwardRef(({ projectUrl, jenkinsUrl, jenkinsUsername }, ref) => {
//   const [consoleOutput, setConsoleOutput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showOutput, setShowOutput] = useState(false);
//   const [buildFinished, setBuildFinished] = useState(false); // State to track if the build is finished
//   const [intervalId, setIntervalId] = useState(null);

//   const fetchConsoleOutput = async () => {
//     const apiUrl = import.meta.env.VITE_APP_API_URL;

//     let data = new FormData();
//     data.append('jenkins_url', jenkinsUrl);
//     data.append('jenkins_username', jenkinsUsername);
//     data.append('project_url', projectUrl);

//     let config = {
//       method: 'post',
//       url: `${apiUrl}/get_console_output`,
//       headers: { 
//         'Content-Type': 'multipart/form-data'
//       },
//       data: data
//     };

//     try {
//       const response = await axios(config);
//       const parser = new DOMParser();
//       const htmlDoc = parser.parseFromString(response.data, 'text/html');
//       const consoleText = htmlDoc.querySelector('pre').textContent;
//       const buildStatus = htmlDoc.querySelector('#build-status').textContent;

//       setConsoleOutput(consoleText);
//       setBuildFinished(buildStatus === 'true'); // Check the build status

//       if (buildStatus === 'true') {
//         setLoading(false);
//         clearInterval(intervalId);
//       }
//     } catch (error) {
//       console.error('Error fetching console output:', error);
//       setLoading(false);
//       clearInterval(intervalId);
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setLoading(true);
//     setConsoleOutput(''); // Clear previous output
//     setBuildFinished(false); // Reset build finished status
//     const newIntervalId = setInterval(fetchConsoleOutput, 1000);
//     setIntervalId(newIntervalId);
//   };

//   useImperativeHandle(ref, () => ({
//     handleSubmit
//   }));

//   const handleToggleOutput = () => {
//     setShowOutput(!showOutput); // Toggle the display of the console output
//   };

//   return (
//     <header>
//       <form onSubmit={handleSubmit}>
//         <button type="submit" disabled={loading || buildFinished}>
//           {loading ? 'Loading...' : buildFinished ? 'Build Finished' : 'Get Console Output'}
//         </button>
//       </form>
//       <br></br>
//       <button onClick={handleToggleOutput}>
//         {showOutput ? 'Hide Console Output' : 'Show Console Output'}
//       </button>
//       {showOutput && <pre>{consoleOutput}</pre>}
//       {loading && <p>Loading console output...</p>}
//       {buildFinished && <p>Build has finished.</p>}
//     </header>
//   );
// });

// export default ConsoleOutputForm;
