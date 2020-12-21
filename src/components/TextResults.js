import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';


export default function TextResults({ surveyData }) {

  const textResponses = answerObj => {
    let textResponses = [];

    for (let k in answerObj) {
      if (k !== "question" && k !== "questionType" && answerObj.questionType === "TEXT")
        textResponses.push({ textAnswer: k, textQuestion: answerObj.question })
    }

    return textResponses;
  }


  return (
    <>
      {surveyData.map((res, index) =>
        <div key={index}>
          {res.questionType === "TEXT" &&
            <Row style={{ margin: "0px", padding: "5px" }}>
              <Col>
                <br/>
                <h5 style={{backgroundColor: "rgb(218, 218, 218)", padding: "5px"}}>
                  {res.question}
                </h5>
              </Col>
            </Row>
          }
          {textResponses(res).map(textObject =>
            <Row style={{ margin: "0px", padding: "5px" }}
              key={textObject.textAnswer}>
              <Col>
                <span style={{ fontStyle: "italic" }}>
                  "{textObject.textAnswer}"
                </span>
              </Col>
            </Row>
          )}
        </div>
      )}
    </>
  )
}

TextResults.propTypes = {
  surveyData: PropTypes.array
}