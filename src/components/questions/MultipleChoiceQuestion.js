import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import './questionStyles.css'


export default function MultipleChoiceQuestion({ question, updateQuestion }) {
  const [selected, setselected] = useState("");

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
        {question.choices.map(choice =>
          <React.Fragment key={choice}>
            <Form.Check
              inline
              type='radio'
              label={choice.replace('_', ' ')}
              value={choice}
              checked={selected === choice}
              onChange={e => handleChange(e)}
            />
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

MultipleChoiceQuestion.propTypes = {
  question: PropTypes.object,
  updateQuestion: PropTypes.func
}