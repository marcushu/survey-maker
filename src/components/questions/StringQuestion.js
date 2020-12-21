import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import './questionStyles.css';

export default function StringQuestion({ question, updateQuestion }) {
    const [answerText, setanswerText] = useState();

    return (
        <div className="listItem" style={{ border: "none" }}>
            <div className="question">
                {question.question}
            </div>
            <br />
            <Form.Control
                as="textarea"
                rows="3"
                value={answerText}
                onChange={e => {
                    setanswerText(e.target.value);
                    question.result = e.target.value;
                    updateQuestion(question);
                }} />
        </div>
    )
}

StringQuestion.propTypes = {
    question: PropTypes.object,
    updateQuestion: PropTypes.func
}