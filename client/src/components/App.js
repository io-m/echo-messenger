import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./Header";
import Landing from "./Landing";

const Dashboard = () => <h1>Surveys</h1>;

function App() {
  return (
    <div className="container">
      <Router>
        <div>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={Dashboard} />
        </div>
      </Router>
    </div>
  );
}

export default App;
