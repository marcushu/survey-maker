import React, { useEffect, useState } from 'react';
import countBy from 'lodash/countBy';
import { useHistory } from 'react-router-dom';
import * as firebase from "firebase/app";
import './css/Admin.css';
import QuestionaireserviceMGO from '../js/QuestionaireServiceMGO';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Head from './Head';
import SurveyList from './SurveyList';
import AddParticipants from './AddParticipants';


export default function Admin() {
  const history = useHistory();
  const [surveyTypes, setsurveyTypes] = useState();
  const [showAddParticipants, setshowAddParticipants] = useState(false);
  const [surveyToAddTakers, setsurveyToAddTakers] = useState("");


  useEffect(() => {
    let unmounted = false;

    firebase.auth().onAuthStateChanged(user => {
      if (!user)
        history.push('/login');
      else
        if(!unmounted)
          findTypes();
    });

    return () => { unmounted = true };
  }, [history]);


  const findTypes = () => {
    QuestionaireserviceMGO.getSurveys()
      .then(res => {
        const typesObj = countBy(res, surveyItem => surveyItem.questionaireTypeName);
        let typeObjectArr = [];

        for (let k in typesObj) {
          typeObjectArr = [...typeObjectArr, { _key: k, _val: typesObj[k] }];
        }

        setsurveyTypes(typeObjectArr);
      })
      .catch(err => console.error(err));
  }


  const deleteSurvey = surveyName => {
    QuestionaireserviceMGO.delete(surveyName)
      .then(res => findTypes())
      .catch(err => console.error(err));
  }


  const logout = () => {
    firebase.auth().signOut()
      .then(() => history.push('/login'))
      .catch(err => console.log(err));
  }


  const addParticipants = surveyName => {
    setsurveyToAddTakers(surveyName);
    setshowAddParticipants(true);
  }


  return (
    <div style={{width: "100%"}}>
      <Head goto={() => logout()} buttonLabel="Log out" />
      {showAddParticipants
        ?
        <Row className="rows">
          <Col lg={6} className="cols">
            <div>
              <AddParticipants
                surveyName={surveyToAddTakers}
                hideMe={() => setshowAddParticipants(false)} />
            </div>
          </Col>
        </Row>
        :
        <Row className="rows">
          <Col lg={6} className="cols">
            <br/>
            <div>
              <button id="newSurveyBtn"
                onClick={() => history.push('/surveyMaker?survey=blank')}>
                Create New Survey
            </button>
              <br />
              <SurveyList
                surveyTypes={surveyTypes}
                goToStats={name => history.push("/SurveyStats?name=" + name)}
                addParticipants={name => addParticipants(name)}
                createUrls={name => history.push('/ContactUrls?id=' + encodeURI(name))}
                deleteSurvey={name => deleteSurvey(name)} />
            </div>
          </Col>
        </Row>
      }
    </div>
  )
}