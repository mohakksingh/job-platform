import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import signUpPage from './pages/signUpPage';
import signInPage from './pages/signInPage';

const App = () => {
  return (
    <Router>
      <div>
       
          <Route exact path="/signup" component={signUpPage} />
          <Route exact path="/signin" component={signInPage} />

      </div>
    </Router>



  );
}
