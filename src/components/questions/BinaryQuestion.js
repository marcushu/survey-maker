import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import './questionStyles.css'


export default function BinaryQuestion({ question, updateQuestion }) {
  const [selected, setselected] = useState();

  const handleChange = e => {
    setselected(e.target.value);
    question.result = e.target.value;
    updateQuestion(question);
  }

  return (
    <div className="listItem d-flex justify-content-between" style={{border: "none"}}>
      <div className="question">
        {question.question}
      </div>
      <div>
        <Form.Check
          inline
          type='radio'
          label={question.positiveIdentity.replace('_', ' ')}
          value={question.positiveIdentity}
          checked={selected === question.positiveIdentity}
          onChange={e => handleChange(e)}
        />
        <Form.Check
          inline
          type='radio'
          label={question.negativeIdentity.replace('_', ' ')}
          value={question.negativeIdentity}
          checked={selected === question.negativeIdentity}
          onChange={e => handleChange(e)}
        />
      </div>
    </div>
  )
}

BinaryQuestion.propTypes = {
  question: PropTypes.object,
  updateQuestion: PropTypes.func
}