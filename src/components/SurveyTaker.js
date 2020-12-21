import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import QuestionaireServiceMGO from '../js/QuestionaireServiceMGO';
import QuestionList from './QuestionList';
import './css/SurveyTaker.css';

export default function SurveyTaker() {
  const history = useHistory();
  const [survey, setsurvey] = useState(null);
  const [loadingMessage, setloadingMessage] = useState("Loading");


  useEffect(() => {
    const url = window.location.href;

    const userId = url.slice(url.indexOf('=') + 1);

    QuestionaireServiceMGO.getBlankSurveyByOwnerId(userId).then(res => {
      if ('exists' in res)
        setloadingMessage("Survey Aleady Taken");

      else
        setsurvey(res);
      })
      .catch(err => {
        alert(err); //usually expired link
      });
  }, [])


  const saveSurvey = () => {
    QuestionaireServiceMGO.persist(survey).then(() => {
      history.push('/SurveySaved')
    })
      .catch(err => {
        console.error(err);
      })
  }


  return (
    <div id="darkWide">
      <Row>
        <Col>
          {survey
            ?
            <>
              <div id="surveyName"> {survey.questionaireTypeName} </div>
              <QuestionList
                questions={survey ? survey.questions : []} />
              <div className="text-center">
                <button className="bigOrange" onClick={saveSurvey}>Save</button>
              </div>              
              <br /><br />
            </>
            : <h4 style={{ textAlign: "center", paddingTop: "30px" }}>{loadingMessage}</h4>
          }
        </Col>
      </Row>
    </div>
  )
}