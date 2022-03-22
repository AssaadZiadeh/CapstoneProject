import Authentication from "./Components/Authentication";
import LandingPage from "./Components/LandingPage";
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./Components/Dashboard";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/authentication/:type" element={<Authentication className="login-page" />}>
          </Route>
          <Route path="/dashboard/:section" element = {<Dashboard className="dashboard-page" />} >
          </Route>
          <Route path="/" element = {<LandingPage className="landing-page" />} >
          </Route>
        </Routes>
      </div>
    </Router>

    
  );
}

export default App;
