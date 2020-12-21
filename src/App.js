import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Admin from "./components/Admin";
import SurveyMaker from "./components/SurveyMaker";
import SurveyTaker from "./components/SurveyTaker";
import Login from "./components/Login..js";
import SurveySaved from "./components/SurveySaved.js";
import SurveyStats from "./components/SurveyStats.js";
import ContactUrls from "./components/ContactUrls.js";


export default function App() {

  return (
    <Router>
      <div className="container-fluid d-flex justify-content-center h-100">
          <Switch>
            <Route path="/surveyMaker">
              <SurveyMaker />
            </Route>
            <Route path="/surveyTaker">
              <SurveyTaker />
            </Route>
            <Route path="/ContactUrls">
              <ContactUrls />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/SurveySaved">
              <SurveySaved />
            </Route>
            <Route path="/SurveyStats">
              <SurveyStats />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
      </div>
    </Router>
  );
}
