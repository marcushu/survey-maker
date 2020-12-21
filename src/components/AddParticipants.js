import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import QuestionaireserviceMGO from '../js/QuestionaireServiceMGO';
import './css/AddParticipants.css';
import PropTypes from 'prop-types';


export default function AddParticipants({ surveyName, hideMe }) {
  const [participants, setparticipants] = useState("");


  const addParticipants = () => {
    if (!participants)
      alert("Please add a name/names.");
    else {
      const cleanNames = participants
        .split('\n')
        .join()
        .split(',')
        .filter(name => name.trim());

      QuestionaireserviceMGO.addMultSurveyTakers(surveyName, cleanNames)
        .then(() => {
          setparticipants("");
          alert("New Participants Added");
        })
        .catch(err => console.error(err));
    }
  }


  return (
    <>
      <Row>
        <Col className="d-flex justify-content-center">
          <div id="surveyTitle">{surveyName}</div>
        </Col>
      </Row>
      <Row >
        <Col className="d-flex justify-content-center">
          <div id="instructions">
            Add a <span style={{ fontWeight: "bold" }}>comma separated</span> list of new survey participants
            </div>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <textarea rows={10}
            value={participants}
            onChange={e => setparticipants(e.target.value)} />
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <button id="addButton" onClick={hideMe}>&lt;&lt;</button>
          <button id="addButton" onClick={addParticipants}>Add Participants</button>
        </Col>
      </Row>
    </>
  )
}

AddParticipants.propTypes = {
  surveyname: PropTypes.string,
  hideMe: PropTypes.func
}