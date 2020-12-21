import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './questionInsert.css';

export default function Text({ addQuestion }) {
  const [question, setquestion] = useState("");

  const handleAddQuestion = () => {
    if (!!question) {
      addQuestion({
        questionType: "TEXT",
        question: question,
      });

      setquestion("");
    } else {
      alert("Please enter question");
    }

  }

  return (
    <span>
      <input type="text"
        className="inputText"
        value={question}
        placeholder="Your question here..."
        onChange={e => setquestion(e.target.value)}>
      </input>
      &nbsp;
      <button className="add" onClick={handleAddQuestion}>+</button>
    </span>
  )
}

Text.propTypes = {
  addQuestion: PropTypes.func
};