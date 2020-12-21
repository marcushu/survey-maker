import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Binary from './surveyMakerQuestions/Binary';
import Text from './surveyMakerQuestions/Text';
import MultipleChoice from './surveyMakerQuestions/MultipleChoice';
import PropTypes from 'prop-types';


export default function EditQuestionModal({ questionEntry, show, hideModal, updateValues }) {
  const [currentComponent, setcurrentComponent] = useState(null);

  useEffect(() => {
    if (questionEntry) {
      switch (questionEntry.questionType) {
        case "BINARY":
          setcurrentComponent(<Binary addQuestion={updateValues} />);
          break;
        case "TEXT":
          setcurrentComponent(<Text addQuestion={updateValues} />);
          break;
        case "MULTCHOICE":
          setcurrentComponent(<MultipleChoice addQuestion={updateValues} />);
          break;
        default:
          break;
      }
    }

  }, [questionEntry, updateValues]);
  

  return (
    <Modal show={show} onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Question</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center" style={{backgroundColor: "rgb(218, 218, 218)"}}>
        {currentComponent}
      </Modal.Body>
    </Modal>
  )
}

EditQuestionModal.propTypes = {
  questionEntry: PropTypes.string,
  show: PropTypes.bool,
  hideModal: PropTypes.func,
  updateValues: PropTypes.func
}