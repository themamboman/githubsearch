// import base
import React, { useState } from 'react';

// Import Material-UI
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// import logo and custom code
import logo from './GitHub_Logo_sm.png';
import SearchForm from './SearchForm';

// import stylesheet
import './App.css';
 
// Main app entry
function App() {
  const [runningDemo, setRunningDemo] = useState(false);

  return (
    <div className="App">
      {runningDemo === false?     
      <header className="App-header">
      <img src={logo} alt="githublogo" /><Typography>Autocomplete Search Demo</Typography>
        <p>
          Demo created for NuOrder by David Gentry
        </p>
        <br />
        <Typography>(Thanks for taking the time to look)</Typography>
        
        <Button
          id="start-button" 
          color="primary" 
          onClick={() => setRunningDemo(true)}
          variant="contained">
            Start Demo
        </Button>
      </header>
      :
      <div>
        <Button 
          id="return-button"
          onClick={() => setRunningDemo(false)}
          variant="contained" >
            Return to Home Page
        </Button>
        <br /><br />
        <SearchForm />
      </div>
      }
    </div>
  );
}

export default App;