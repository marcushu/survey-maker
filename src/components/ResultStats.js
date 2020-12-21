import React from 'react';
import { useRef } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './css/ResultStats.css'
import PropTypes from 'prop-types';


export default function ResultStats({ surveyData }) {
  const numberOfAnswers = useRef();

  const countAnswers = answerObj => {
    let answerCount = [];

    for (let k in answerObj) {
      // we're only interested in mult. choice results (who's 
      // keys are not known untill run-time)
      if ( k !== "question"
        && k !== "questionType"
        && k !== ""
        && answerObj.questionType !== "TEXT")
          answerCount.push({ answer: k, count: answerObj[k] })
    }

    // use this as the denomiator to calculate percentages
    numberOfAnswers.current = answerCount
      .map(({ count }) => count)
      .reduce((acc, curr) => acc + curr);

    return answerCount;
  }


  const percent = numerator => Math.round((numerator / numberOfAnswers.current) * 100);


  return (
    <>
      {surveyData.filter(res => res.questionType !== "TEXT").map((res, index) =>
        <Row className="dataRow" key={index}>
          <Col>
            {res.question}
          </Col>
          {countAnswers(res).map(countObj =>
            <>
              <Col md={1}>
                <span className="question">
                  {countObj.answer.replace('_', " ")}
                </span>
              </Col>
              <Col md={1}>
                <span
                  className={percent(countObj.count) >= 50 ? "percentagesGreen" : "percentages"}
                  data-testid="percentResult">
                  {percent(countObj.count)}%
                </span>
              </Col>
            </>)}
        </Row>)}
    </>
  )
}

ResultStats.propTypes = {
  surveyData: PropTypes.array
}