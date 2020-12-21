import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import countBy from 'lodash/countBy';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import QuestionaireServiceMGO from '../js/QuestionaireServiceMGO';
import './css/SurveyStats.css';
import ResultStats from './ResultStats.js';
import TextResults from './TextResults.js';
import Head from './Head.js';

export default function SurveyStats() {
  const history = useHistory();
  const [surveys, setsurveys] = useState(null);


  useEffect(() => {
    const url = window.location.href;
    const surveyName = url.slice(url.indexOf('=') + 1);

    QuestionaireServiceMGO.getCompletedByName(surveyName)
      .then(res => {
        if (res.length)
          setsurveys(res)
        else
          history.push('/surveyMaker?survey=' + surveyName);
      })
      .catch(err => console.error(err));

  }, [history]);


  const collectStats = () => {
    // questions only
    let surveyQuestions = new Set();
    let questionAndResults = [];
    let _questions = surveys.flatMap(({ questions }) => questions);

    _questions.map(({ question }) => surveyQuestions.add(question));

    surveyQuestions.forEach(surveyQuestion => {
      let thisQuestionAr = _questions.filter(el => el.question === surveyQuestion)

      let answerObj = countBy(thisQuestionAr, el => el.result);
      answerObj.question = surveyQuestion;
      answerObj.questionType = thisQuestionAr[0].questionType;

      questionAndResults.push(answerObj);
    })

    return questionAndResults;
  }


  return (
    <div style={{width: "100%"}}>
      <Head goto={() => history.push('/admin')} buttonLabel="Admin" />
      <Row>
        <Col className="text-center">
          {surveys &&
            <div id="surveyName">
              {surveys[0].questionaireTypeName}  ({surveys.length})
            </div>}
        </Col>
      </Row>
      <Row>
        <Col>
          {surveys &&
            <div id="results">
              <ResultStats surveyData={collectStats()} />
              <TextResults surveyData={collectStats()} />
            </div>}
        </Col>
      </Row>
    </div>

  )
}